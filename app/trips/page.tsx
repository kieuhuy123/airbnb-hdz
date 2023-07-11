import React from 'react'
import EmptyState from '../components/EmptyState'
import { getReservations } from '../actions/getReservations'
import { getCurrentUser } from '../actions/getCurrentUser'
import TripsClient from './TripsClient'
const TripsPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return <EmptyState title='Không được phép' subtitle='Hãy đăng nhập' />
  }

  const reservations = await getReservations({
    userId: currentUser.id
  })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='Không tìm thấy chuyến đi nào'
        subtitle='Có vẻ như bạn chưa đặt trước bất kỳ chuyến đi nào'
      />
    )
  }
  return <TripsClient reservations={reservations} currentUser={currentUser} />
}

export default TripsPage
