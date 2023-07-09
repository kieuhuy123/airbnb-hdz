import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import { getCurrentUser } from '@/app/actions/getCurrentUser'

export async function POST (request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { listingId, startDate, endDate, totalPrice } = body

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error()
  }

  const reservation = await prisma.reservation.create({
    data: {
      userId: currentUser.id,
      startDate,
      endDate,
      totalPrice,
      listingId: listingId
    }
  })

  return NextResponse.json(reservation)
}
