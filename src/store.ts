import { configureStore } from '@reduxjs/toolkit'

import listReducer from './components/List/listSlice';


export default configureStore({
  reducer: {
    list: listReducer,
  },
})
