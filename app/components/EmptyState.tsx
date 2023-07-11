'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './Heading'
import Button from './Button'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Không tìm thấy kết quả phù hợp',
  subtitle = 'Hãy thử thay đổi hoặc xóa một số bộ lọc của bạn',
  showReset
}) => {
  const router = useRouter()
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading title={title} subtitle={subtitle} center />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='Xóa tất cả các bộ lọc'
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState
