import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import { getCurrentUser } from '@/app/actions/getCurrentUser'

interface IPrams {
  reservationId?: string
}
export async function DELETE (request: Request, { params }: { params: IPrams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { reservationId } = params

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid Id')
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }]
    }
  })

  return NextResponse.json(reservation)
}
