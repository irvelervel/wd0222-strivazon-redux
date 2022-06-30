import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../reducers'
// @reduxjs/toolkit is the CORE redux library!

const store = configureStore({
  // this configuration objects sets up the redux store
  reducer: mainReducer,
})

export default store

// now the redux store is up and running! ...but just in memory!
// we have to attach our React App to it!
