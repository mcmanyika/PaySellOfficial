import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  
  connectedAccount: '',
  contract: null,
  balance: 0,
  mybalance: 0,
})

export {
  setGlobalState,
  useGlobalState,
  getGlobalState,
}
