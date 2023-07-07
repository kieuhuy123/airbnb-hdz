import prisma from '@/app/libs/prismadb'

export async function getListings () {
  try {
    const listing = await prisma.listing.findMany({
      orderBy: {
        createAt: 'desc'
      }
    })

    return listing
  } catch (error: any) {
    return null
  }
}
