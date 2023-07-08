'use client'
import { Reservation, Listing, User } from '@prisma/client'
import Container from '@/app/components/Container'
import React, { useMemo } from 'react'
import { categories } from '@/app/components/navbar/Categories'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'

interface ListingClientProps {
  reservation?: Reservation[]
  listing: Listing & { user: User }
  currentUser?: User | null
}
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservation,
  currentUser
}) => {
  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className='order-first mb-10  md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                // totalPrice={totalPrice}
                // onChangeDate={value => setDateRange(value)}
                // dateRange={dateRange}
                // onSubmit={onCreateReservation}
                // disabled={isLoading}
                // disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
