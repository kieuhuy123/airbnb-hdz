'use client'

import { useState, useMemo } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRentModal from '@/app/hooks/useRentModal'
import Modal from './Modal'
import Heading from '../Heading'
import CategoryInput from '../inputs/CategoryInput'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { categories } from '../navbar/Categories'
import CountrySelect from '../inputs/CountrySelect'

import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import axios from 'axios'

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
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false
      }),
    []
  )

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }
  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    setStep(value => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setIsLoading(true)

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Tạo phòng cho thuê!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch(() => {
        toast.error('Đã xảy ra sự cố')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Xong'
    }

    return 'Tiếp theo'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Quay lại'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Điều nào sau đây mô tả đúng nhất vị trí của bạn?'
        subtitle='Chọn một danh mục'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map(item => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={category => {
                setCustomValue('category', category)
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Nơi của bạn nằm ở đâu?'
          subtitle='Giúp khách tìm thấy bạn'
        />
        <CountrySelect
          value={location}
          onChange={value => {
            setCustomValue('location', value)
          }}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Chia sẻ một số thông tin cơ bản về địa điểm của bạn'
          subtitle='Bạn có những tiện ích gì?'
        />
        <Counter
          title='Khách'
          subtitle='Bạn cho phép bao nhiêu khách?'
          value={guestCount}
          onChange={value => setCustomValue('guestCount', value)}
        />
        <Counter
          title='Phòng ngủ'
          subtitle='Bạn có bao nhiêu phòng ngủ?'
          value={roomCount}
          onChange={value => setCustomValue('roomCount', value)}
        />
        <Counter
          title='Phòng tắm'
          subtitle='Bạn có bao nhiêu phòng tắm?'
          value={bathroomCount}
          onChange={value => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Thêm ảnh về địa điểm của bạn'
          subtitle='Cho khách thấy địa điểm của bạn trông như thế nào!'
        />

        <ImageUpload
          value={imageSrc}
          onChange={value => {
            setCustomValue('imageSrc', value)
          }}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Mô tả vị chỗ ở của bạn'
          subtitle='Ngắn gọn và súc tích!'
        />
        <Input
          id='title'
          label='Tiêu đề'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Mô tả'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Bây giờ, hãy đặt giá của bạn'
          subtitle='Bạn tính phí bao nhiêu một đêm'
        />
        <Input
          id='price'
          label='Giá phòng'
          formatPrice
          type='number'
          disabled={isLoading}
          errors={errors}
          register={register}
        />
      </div>
    )
  }

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Cho thuê chỗ ở'
      body={bodyContent}
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RentModal
