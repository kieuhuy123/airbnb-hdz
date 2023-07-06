'use client'

import axios from 'axios'
import { useCallback, useState, useMemo } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRentModal from '@/app/hook/useRentModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal()

  const [step, setStep] = useState(STEPS.CATEGORY)

  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    setStep(value => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  const bodyContent = <div>body</div>

  const footerContent = <h1>Hello</h1>
  return (
    <Modal
      actionLabel='Continue'
      secondaryActionLabel='test'
      title='Airbnb your home!'
      body={bodyContent}
      footer={footerContent}
      //   disabled={isLoading}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      //   onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RentModal
