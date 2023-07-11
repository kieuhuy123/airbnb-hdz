'use client'
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useSearchParams, useRouter } from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import Heading from '../Heading'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

const SearchModal = () => {
  const isOpen = useSearchModal(state => state.isOpen)
  const modalClose = useSearchModal(state => state.onClose)

  const params = useSearchParams()
  const router = useRouter()

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [])

  const onBack = useCallback(() => {
    setStep(value => value - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep(value => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }

    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate)
    }
    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updateQuery
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    modalClose()
    router.push(url)
  }, [
    step,
    modalClose,
    roomCount,
    location,
    router,
    guestCount,
    bathroomCount,
    dateRange,
    onNext,
    params
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Tìm kiếm'
    }

    return 'Tiếp theo'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Quay lại'
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='Bạn muốn đi đâu?' subtitle='Tìm vị trí hoàn hảo!' />
      <CountrySelect
        value={location}
        onChange={value => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Khi nào bạn định đi?'
          subtitle='Đảm bảo mọi người đều rảnh!'
        />
        <Calendar
          onChange={value => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Thêm thông tin'
          subtitle='Tìm địa điểm phù hợp với bạn!'
        />
        <Counter
          onChange={value => setGuestCount(value)}
          value={guestCount}
          title='Khách'
          subtitle='Có bao nhiêu khách sẽ đến?'
        />
        <hr />
        <Counter
          onChange={value => setRoomCount(value)}
          value={roomCount}
          title='Phòng ngủ'
          subtitle='Bạn cần bao nhiêu phòng ngủ?'
        />
        <hr />
        <Counter
          onChange={value => {
            setBathroomCount(value)
          }}
          value={bathroomCount}
          title='Phòng tắm'
          subtitle='Bạn cần bao nhiêu phòng tắm?'
        />
      </div>
    )
  }

  return (
    <Modal
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      title='Bắt đầu tìm kiếm'
      body={bodyContent}
      //   footer={footerContent}
      //   disabled={isLoading}
      isOpen={isOpen}
      onClose={modalClose}
    />
  )
}

export default SearchModal
