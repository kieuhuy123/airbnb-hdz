import EmptyState from '@/app/components/EmptyState'

import { getCurrentUser } from '@/app/actions/getCurrentUser'
import { getReservations } from '@/app/actions/getReservations'

import ReservationsClient from './ReservationsClient'

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title='Không được phép' subtitle='Hãy đăng nhập' />
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='Không có đặt phòng nào'
        subtitle='Có vẻ như bạn không có đặt phòng trên tài sản của bạn.'
      />
    )
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  )
}

export default ReservationsPage
