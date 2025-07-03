import React from 'react'   

export default function Footer() {
  return (
    <div className='bg-zinc-800 text-white px-8 py-4 text-center'>
      <p className='text-sm'>© 2023 Bookclub. All rights reserved.</p>
      <div className='flex justify-center gap-4 mt-2'>
        <a href="/privacy" className='hover:text-blue-500'>Privacy Policy</a>
        <a href="/terms" className='hover:text-blue-500'>Terms of Service</a>
        <a href="/contact" className='hover:text-blue-500'>Contact Us</a>
      </div>
    </div>
  )
}
