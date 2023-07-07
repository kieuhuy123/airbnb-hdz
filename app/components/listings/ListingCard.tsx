import React from 'react'

interface ListingCardProps {
  data: object
}
const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  return <div>{data.title}</div>
}

export default ListingCard
