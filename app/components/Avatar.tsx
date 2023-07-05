import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src?: string | null | undefined
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      alt='/'
      src={src ? src : '/images/placeholder.jpg'}
      height={30}
      width={30}
      className='rounded-full'
    ></Image>
  )
}

export default Avatar
