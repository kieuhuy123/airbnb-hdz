'use client'

import { signIn } from 'next-auth/react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'
const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    signIn('credentials', { ...data, redirect: false }).then(callback => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error('error')
      }
    })
  }

  const toggle = () => {
    loginModal.onClose()
    registerModal.onOpen()
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Chào mừng đến với Airbnb'
        subtitle='Đăng nhập vào tài khoản của bạn'
      ></Heading>
      <Input
        id='email'
        label='Email'
        type='email'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />

      <Input
        id='password'
        label='Mật khẩu'
        type='password'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Tiếp tục với Google'
        icon={FcGoogle}
        onClick={() => {
          signIn('google')
        }}
      />
      {/* <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {
          signIn('github')
        }}
      /> */}
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <span className='mr-3'>{'Lần đầu đến với Home-hdz?'}</span>
        <span
          onClick={toggle}
          className='text-neutral-800 cursor-pointer hover:underline'
        >
          {'Đăng ký'}
        </span>
      </div>
    </div>
  )
  return (
    <Modal
      actionLabel='Tiếp tục'
      secondaryActionLabel='test'
      title='Đăng nhập'
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default LoginModal
