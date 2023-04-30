import React, { Component } from 'react';
import { Form, Message, Input, Button } from 'semantic-ui-react';
import LayoutBlank from '../components/LayoutBlank';


class Register extends Component {
  state = {
      inviter: '',
      subscription: null,
      loading: false,
      errorMessage: ''
  };

  componentDidMount(){
      this.setState({
          subscription: '0xdf5022460D6C9aa6d94450c14F42E264AcE10D5C',
      })
  }
  
  onSubmit= async (event) => {
      event.preventDefault()

      this.setState({ loading: true, errorMessage: '' });
      try {
      
          let Amount = window.web3.utils.toWei('0.001610', 'Ether')
          this.props.registerAccount(this.state.inviter, this.state.subscription, Amount)
          
      } catch (err) {
          this.setState({ errorMessage: err.message });
      }
  }
  render() {
      return (
          <LayoutBlank account={this.props.account}>
              <div className="flex flex-col items-center justify-center mx-auto">
                  <div className="w-full">
                  <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                  <Message error header="Oops!"  content='Please enter address of the person who referred you. And make sure you are logged in before registering.'/>
                      <Form.Field>
                          <Input
                              value={this.state.inviter}
                              onChange={event => this.setState({ inviter: event.target.value })}  
                              placeholder='Enter public address of the person who referred you!'
                          />
                      </Form.Field>
                      <Form.Field>
                          <Input
                              size='huge'
                              value={this.state.subscription}
                              onChange={event => this.setState({ subscription: event.target.value })}  
                              type="hidden"
                          />
                      </Form.Field>
                      <div className="text-center">
                        <div className="mx-auto">
                          <Button loading={this.state.loading}  color='yellow' content='Yellow'>
                          Join The Community
                          </Button>
                        </div>
                      </div>
                  </Form>
                  </div>
              </div>
          </LayoutBlank>
      )
  }
}
export default Register;



