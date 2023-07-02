import React from 'react'
import Image from 'next/image'
const Avatar = () => {
  return (
    <Image
      alt='/'
      src='/images/placeholder.jpg'
      height={30}
      width={30}
      className='rounded-full'
    ></Image>
  )
}

export default Avatar
