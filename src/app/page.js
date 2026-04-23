import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

export default function page() {
  return (
    <div>
      <div className=' ml-[250px]'>
        <Header/>
        <Dashboard/>
      </div>
        <Sidebar/>
    </div>
    
    
  )
}
