import EmptyState from '@/app/components/EmptyState'

import { getCurrentUser } from '@/app/actions/getCurrentUser'
import { getListings } from '@/app/actions/getListings'

import PropertiesClient from './PropertiesClient'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title='Không được phép' subtitle='Hãy đăng nhập' />
  }

  const listings = await getListings({ userId: currentUser.id })

  if (listings?.length === 0) {
    return (
      <EmptyState
        title='Không có phòng nào bạn cho thuê'
        subtitle='Có vẻ bạn chưa đăng ký cho thuê phòng.'
      />
    )
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />
}

export default PropertiesPage
