'use client'
import React, { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import { AiOutlineMenu } from 'react-icons/ai'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  currentUser?: User | null
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    return rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <>
      <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
          <div
            className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
            onClick={onRent}
          >
            {'Cho thuê chỗ ở'}
          </div>
          <div
            className='p-4 lg:py-1 lg:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
            onClick={toggleOpen}
          >
            <AiOutlineMenu />
            <div className='hidden lg:block'>
              <Avatar src={currentUser?.image} />
            </div>
          </div>
        </div>

        {isOpen && (
          <div className='absolute rounded-xl shadow-md w-[40vw] md:w-full bg-white overflow-hidden right-0 top-12 text-sm'>
            <div className='flex flex-col cursor-pointer'>
              {currentUser ? (
                <>
                  <MenuItem
                    onClick={() => {
                      router.push('/trips')
                    }}
                    label='Chuyến đi của tôi'
                  ></MenuItem>
                  <MenuItem
                    onClick={() => {
                      router.push('/favorites')
                    }}
                    label='Danh sách yêu thích'
                  ></MenuItem>
                  <MenuItem
                    onClick={() => {
                      router.push('/reservations')
                    }}
                    label='Quản lý đặt phòng'
                  ></MenuItem>
                  <MenuItem
                    onClick={() => {
                      router.push('/properties')
                    }}
                    label='Phòng của tôi'
                  ></MenuItem>
                  <MenuItem
                    onClick={rentModal.onOpen}
                    label='Cho thuê chỗ ở'
                  ></MenuItem>
                  <hr />
                  <MenuItem
                    onClick={() => {
                      signOut()
                    }}
                    label='Đăng xuất'
                  ></MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={loginModal.onOpen}
                    label='Đăng nhập'
                  ></MenuItem>
                  <MenuItem
                    onClick={registerModal.onOpen}
                    label='Đăng ký'
                  ></MenuItem>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UserMenu
