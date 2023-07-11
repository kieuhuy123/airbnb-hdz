'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' }
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Đăng ký thành công!')
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch(error => {
        toast.error('Đã xảy ra sự cố.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggle = () => {
    registerModal.onClose()
    loginModal.onOpen()
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Chào mừng đến với Home-hdz'
        subtitle='Tạo tài khoản'
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
        id='name'
        label='Tên'
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
        <span className='mr-3'>{'Bạn đã có tài khoản'}</span>
        <span
          onClick={toggle}
          className='text-neutral-800 cursor-pointer hover:underline'
        >
          {'Đăng nhập'}
        </span>
      </div>
    </div>
  )
  return (
    <Modal
      actionLabel='Tiếp tục'
      secondaryActionLabel='test'
      title='Đăng ký'
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModal
