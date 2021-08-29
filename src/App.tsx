import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import ComponentRouter from './Routing'

import 'antd/dist/antd.css'
import './App.scss'

const App:FC = () => {
  return (
    <BrowserRouter>
      <ComponentRouter />
    </BrowserRouter>
  )
}

export default App
