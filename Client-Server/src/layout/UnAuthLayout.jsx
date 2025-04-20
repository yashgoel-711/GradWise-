import React from 'react'
import { Outlet } from 'react-router'
import {Header, Footer} from '../components/unauth/index.js'

const UnAuthLayout = () => {
  return (
    <>
      <Header />
      <div className='min-h-[80vh]'>

      <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default UnAuthLayout
