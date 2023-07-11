'use client'

import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import Heading from '@/app/components/Heading'
import Container from '@/app/components/Container'
import ListingCard from '@/app/components/listings/ListingCard'
import { Reservation, User } from '@prisma/client'

interface ReservationsClientProps {
  reservations: Reservation[]
  currentUser?: User | null
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Đã hủy đặt phòng')
          router.refresh()
        })
        .catch(() => {
          toast.error('Đã xảy ra sự cố.')
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading title='Đặt phòng' subtitle='Đặt phòng trên tài sản của bạn' />
      <div
        className='
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Hủy đặt phòng'
            currentUser={currentUser}
            author={reservation.user}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
