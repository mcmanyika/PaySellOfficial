import React, { Component } from 'react';
import Web3 from 'web3';
import Image from 'next/image'
import { Web3Button } from '@web3modal/react'
import Tree from './abis/Tree.json'
import Register from './components/Register'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      createdMembers: [],
      pastPayments: [],
      invitedBy: '',
      levelOne: '',
      levelTwo: '',
      levelThree: '',
      levelFour: '',
      tickets: [],
      ticketNetwork: null,
      show:true,
    };
    this.registerAccount = this.registerAccount.bind(this)
    this.payAccount = this.payAccount.bind(this)
    this.payLevelOne = this.payLevelOne.bind(this)
    this.payLevelTwo = this.payLevelTwo.bind(this)
    this.payLevelThree = this.payLevelThree.bind(this)
  }
  
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Please install MetaMask')
      window.location.assign("https://metamask.io/")
    }
  }

  
  async loadBlockchainData() {
    const web3 = window.web3
    
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Tree.networks[networkId]
     
    if(networkData) {
      const ticketNetwork = new web3.eth.Contract(Tree.abi, networkData.address)
      this.setState({ ticketNetwork })

      const createdMembers = await ticketNetwork.getPastEvents('Summary', { fromBlock: 0, toBlock: 'latest', filter: {inviter: this.state.account}})
      this.setState({ createdMembers })

      const pastPayments = await ticketNetwork.getPastEvents('Payments', { fromBlock: 0, toBlock: 'latest', filter: {from: this.state.account}})
      this.setState({ pastPayments })

      
      // const invitedBy = await ticketNetwork.methods.tree(this.state.account).call()
      // this.setState({ invitedBy })

      // const levelOne = await ticketNetwork.methods.tree(this.state.invitedBy.inviter).call()
      // this.setState({ levelOne })

      // const levelTwo = await ticketNetwork.methods.tree(this.state.levelOne.inviter).call()
      // this.setState({ levelTwo })

      // const levelThree = await ticketNetwork.methods.tree(this.state.levelTwo.inviter).call()
      // this.setState({ levelThree })
       
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
  }

  

  registerAccount(inviter, subscription, Amount) {
    this.state.ticketNetwork.methods.enter(inviter, subscription).send({ from: this.state.account, value: Amount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location="/policy-1"
    })
  }

  payLevelOne(member, amount) {
    this.setState({ loading: true })
    this.state.ticketNetwork.methods.pay(member).send({ from: this.state.account, value: amount})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location="/policy-2"
    })
  }

  payAccount(member, amount) {
    this.setState({ loading: true })
    this.state.ticketNetwork.methods.pay(member).send({ from: this.state.account, value: amount})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location="/"
    })
  }

  payLevelTwo(member, amount) {
    this.setState({ loading: true })
    this.state.ticketNetwork.methods.pay(member).send({ from: this.state.account, value: amount})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location="/policy-3"
    })
  }

  payLevelThree(member, amount) {
    this.setState({ loading: true })
    this.state.ticketNetwork.methods.pay(member).send({ from: this.state.account, value: amount})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location="/"
    })
  }
  render() {
    const { account,  pastPayments, show } = this.state;
    return (
      <>
        <div className="flex items-center flex-col justify-center h-screen max-w-2xl mx-auto">
          <div className='p-2'>
            <Image src="/3.jpeg" width={600} height={100} alt="img" />
          </div>
          <div className="w-full">
            <Register account={account} registerAccount={this.registerAccount} />
          </div>
          <div className="p-2"> 
            <Web3Button />
          </div>
        </div>
      </>
    )
  }
}
export default Home;