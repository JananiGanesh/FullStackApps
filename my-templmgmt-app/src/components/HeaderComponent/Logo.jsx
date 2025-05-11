import React from 'react'

function Logo() {
  return (
    <div className='w-26 h-26 '>
      <img 
      className='h-12 w-12 rounded-full mr-2' src="https://plus.unsplash.com/premium_photo-1697729536647-4e23a32dd324?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="Temple Management Logo" style={{  width: '62px', height: '62px', borderRadius: '50%' }} />
      <span className='text-3xl font-bold text-white'>Temple Management</span>
    </div>
  )
}

export default Logo
