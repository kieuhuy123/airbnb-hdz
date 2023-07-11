import EmptyState from '@/app/components/EmptyState'

import { getCurrentUser } from '@/app/actions/getCurrentUser'
import { getFavoriteListings } from '@/app/actions/getFavoriteListings'

import FavoritesClient from './FavoritesClient'

const FavoritePage = async () => {
  const listings = await getFavoriteListings()
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <EmptyState
        title='Không tìm thấy địa điểm yêu thích nào'
        subtitle='Có vẻ như bạn không có danh sách yêu thích.'
      />
    )
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default FavoritePage
