import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import { getCurrentUser } from '@/app/actions/getCurrentUser'

interface IPrams {
  listingId?: string
}
export async function DELETE (request: Request, { params }: { params: IPrams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid Id')
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  })

  return NextResponse.json(listing)
}
