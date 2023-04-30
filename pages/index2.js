import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import Image from 'next/image'
import { Web3Button } from '@web3modal/react'
import Tree from './abis/Tree.json'
import Register from './components/Register'

function Home(props) {
  const [account, setAccount] = useState("");
  const [createdMembers, setCreatedMembers] = useState([]);
  const [pastPayments, setPastPayments] = useState([]);
  const [invitedBy, setInvitedBy] = useState("");
  const [levelOne, setLevelOne] = useState("");
  const [levelTwo, setLevelTwo] = useState("");
  const [levelThree, setLevelThree] = useState("");
  const [levelFour, setLevelFour] = useState("");
  const [tickets, setTickets] = useState([]);
  const [ticketNetwork, setTicketNetwork] = useState(null);

  useEffect(() => {
    const load = async () => {
      await loadBlockchainData();
    };
    load();
  }, []);

  

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    if (account) {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);


    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Tree.networks[networkId];
    if (networkData) {
      const ticketNetwork = new web3.eth.Contract(Tree.abi, networkData.address);
      setTicketNetwork(ticketNetwork);

      const createdMembers = await ticketNetwork.getPastEvents("Summary", {
        fromBlock: 0,
        toBlock: "latest",
        filter: { inviter: account },
      });
      setCreatedMembers(createdMembers);

      const pastPayments = await ticketNetwork.getPastEvents("Payments", {
        fromBlock: 0,
        toBlock: "latest",
        filter: { from: account },
      });
      setPastPayments(pastPayments);

    }
    const createdMembers = await ticketNetwork.getPastEvents("Summary", {
      fromBlock: 0,
      toBlock: "latest",
      filter: { inviter: account },
    });
    setCreatedMembers(createdMembers);

    const pastPayments = await ticketNetwork.getPastEvents("Payments", {
      fromBlock: 0,
      toBlock: "latest",
      filter: { from: account },
    });
    console.log(pastPayments)
    setPastPayments(pastPayments);

    const invitedBy = await ticketNetwork.methods.tree(account).call();
      setInvitedBy(invitedBy);
    
      const levelOne = await ticketNetwork.methods.tree(invitedBy.inviter).call();
      setLevelOne(levelOne);

      const levelTwo = await ticketNetwork.methods.tree(levelOne.inviter).call();
      setLevelTwo(levelTwo);

      const levelThree = await ticketNetwork.methods.tree(levelTwo.inviter).call();
      setLevelThree(levelThree);

  } else {
    
    
  }


}

const registerAccount = (inviter, subscription, Amount) => {
  ticketNetwork.methods.enter(inviter, subscription)
    .send({ from: account, value: Amount })
    .once("receipt", (receipt) => {
      setShow(false);
      window.location = "/policy-1"; 
  })
};

const payAccount = (member, amount) =>{
  this.setState({ loading: true })
  this.state.ticketNetwork.methods.pay(member).send({ from: this.state.account, value: amount})
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
    window.location="/"
  })
}  
  return (
    <div className="flex items-center flex-col justify-center h-screen max-w-2xl mx-auto">
      <div className='p-2'>
        <Image src="/3.jpeg" width={600} height={100} alt="img" />
      </div>
      <div className="w-full">
        <Register account={account} registerAccount={registerAccount} />
      </div>
      <div className="p-2"> 
        <Web3Button />
      </div>
    </div>
  )
}
export default Home;