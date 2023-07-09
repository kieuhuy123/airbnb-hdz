import prisma from '@/app/libs/prismadb'

interface IPrams {
  listingId?: string
  userId?: string
  authorId?: string
}

export async function getReservations (params: IPrams) {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId
    }
    if (userId) {
      query.userId = userId
    }

    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return reservations
  } catch (error: any) {
    throw new Error()
  }
}
