import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}
export async function getListings (params: IListingsParams) {
  try {
    const { userId } = params
    let query: any = {}
    if (userId) {
      query.userId = userId
    }
    const listing = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return listing
  } catch (error: any) {
    return null
  }
}
