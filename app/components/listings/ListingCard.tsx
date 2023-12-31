'use client'
import useCountries from '@/app/hooks/useCountries'
import { Listing, Reservation, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import Image from 'next/image'
import HeartButton from '../HeartButton'
import Button from '../Button'
import { format } from 'date-fns'
import vi from 'date-fns/locale/vi'
import Avatar from '../Avatar'

interface ListingCardProps {
  data: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: User | null
  author?: User
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  author
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [onAction, actionId, disabled]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'dd MMM,yyyy', { locale: vi })} - ${format(
      end,
      'dd MMM,yyyy',
      { locale: vi }
    )}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className='col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
          <Image
            alt='Listing'
            src={data.imageSrc}
            fill
            className='object-cover h-full w-full group-hover:scale-110 transition  duration-300 ease-in-out'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        {author ? (
          <div className='flex flex-row items-center'>
            <div className='pr-3'>
              <Avatar src={author?.image} />
            </div>
            <div> {author?.name}</div>
          </div>
        ) : (
          ''
        )}

        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>$ {price}</div>
          {!reservation && <div className='font-light'>{'/ đêm'}</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard
