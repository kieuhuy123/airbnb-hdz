'use client'

import { signIn } from 'next-auth/react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/userRegisterModal'
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
    email: '',
    password: ''
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
        title='Welcome to Airbnb'
        subtitle='Login to your account'
      ></Heading>
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        errors={errors}
        register={register}
        required
      />

      <Input
        id='password'
        label='Password'
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
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => {
          signIn('google')
        }}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {
          signIn('github')
        }}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <span className='mr-3'>{'First time using Airbnb?'}</span>
        <span
          onClick={toggle}
          className='text-neutral-800 cursor-pointer hover:underline'
        >
          {'Create account'}
        </span>
      </div>
    </div>
  )
  return (
    <Modal
      actionLabel='Continue'
      secondaryActionLabel='test'
      title='Login'
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
