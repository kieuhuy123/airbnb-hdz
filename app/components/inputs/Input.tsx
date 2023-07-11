'use client'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  required,
  errors,
  register
}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='text-neutral-700 absolute top-5 left-2'
        />
      )}
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, {
          required,
          validate:
            id == 'email'
              ? {
                  maxLength: v =>
                    v.length <= 50 ||
                    'The email should have at most 50 characters',
                  matchPattern: v =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'Địa chỉ email không hợp lệ'
                }
              : {}
        })}
        placeholder=' '
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? 'pl-9' : 'pl-4'
        } 
        ${
          errors[id]
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-neutral-300 focus:border-black'
        }
        `}
      />
      {errors[id]?.type === 'required' && (
        <small className='text-red-600'>{`${label} không được để trống`}</small>
      )}
      {errors[id]?.message && (
        <small className='text-red-600'>{`${errors[id].message}`}</small>
      )}

      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
        ${formatPrice ? 'left-9' : 'left-4'}
        ${errors[id ? 'text-rose-500' : 'text-zinc-400']}
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
