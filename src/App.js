import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Web3 from 'web3';
import { CONTACT_ABI, CONTACT_ADDRESS } from './contracts/simpleStorage';

function App() {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [num, setNum] = useState(0);

  const setValueToStorage = async () => {
    await storage.methods.set(num).send({from: account});
  }

  const getValueFromStorage = async () => {
    var val = await storage.methods.get().call();
    setValue(val);
  }

  const [account, setAccount] = useState();
  const [storage, setStorage] = useState();

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/v3/e5f6b05589544b1bb8526dc3c034c63e');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      // Instantiate smart contract using ABI and address.
      setStorage(new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS));
    }

    load();
  }, []);

  return (
    <div>
      <h4> Your account is: {account} </h4>
      <input type='number' placeholder='number' onChange={(e) => setNum(e.target.value)} />
      <br/><br/>
      <button className={classes.button} onClick={setValueToStorage}>SET</button>
      <h4> {value} </h4>
      <button className={classes.button} onClick={getValueFromStorage}>GET</button>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'white',
    color: 'blue'
  }
}))

export default App;
