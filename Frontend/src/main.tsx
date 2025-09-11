import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userreducer from './redux/Slices/userSlice.ts'


const store = configureStore({
  reducer:{
    User:userreducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
  </BrowserRouter>,
)
