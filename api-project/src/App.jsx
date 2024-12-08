import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route} from 'react-router-dom';
import Form from './component/Form/Form'
import Dashboard from './component/Dashboard/Dashboard'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Form/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </>
  )
}

export default App
