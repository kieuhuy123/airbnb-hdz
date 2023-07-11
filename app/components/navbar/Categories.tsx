'use client'
import Container from '../Container'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill
} from 'react-icons/gi'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
export const categories = [
  {
    label: 'Bãi biển',
    icon: TbBeach,
    description: 'Khách sạn này gần bãi biển!'
  },
  {
    label: 'Cối xay gió',
    icon: GiWindmill,
    description: 'Chỗ ở này có cối xay gió'
  },
  {
    label: 'Hiện đại',
    icon: MdOutlineVilla,
    description: 'Khách sạn này rất hiện đại!'
  },
  {
    label: 'Nông thôn',
    icon: TbMountain,
    description: 'Nơi ở này gần nông thôn!'
  },
  {
    label: 'Hồ bơi',
    icon: TbPool,
    description: 'Nởi ở này có một hồ bơi rất đẹp!'
  },
  {
    label: 'Quần đảo',
    icon: GiIsland,
    description: 'Nơi ở này là một hòn đảo!'
  },
  {
    label: 'Hồ',
    icon: GiBoatFishing,
    description: 'Nơi ở này gần một con hồ!'
  },
  {
    label: 'Trượt tuyết',
    icon: FaSkiing,
    description: 'Nơi ở này có các hoạt động trượt tuyết!'
  },
  {
    label: 'Lâu đài',
    icon: GiCastle,
    description: 'Khách sạn này là một lâu đài cổ!'
  },
  {
    label: 'Hang động',
    icon: GiCaveEntrance,
    description: 'Khách sạn này nằm trong một hang động ma quái!'
  },
  {
    label: 'Cắm trại',
    icon: GiForestCamp,
    description: 'Nơi lưu trú này cung cấp các hoạt động cắm trại!'
  },
  {
    label: 'Sa mạc',
    icon: GiCactus,
    description: 'Nơi lưu trú này nằm trong môi trường sa mạc!'
  },
  {
    label: 'Bắc cực',
    icon: BsSnow,
    description: 'Nơi lưu trú này nằm trong môi trường Bắc cực!'
  },
  {
    label: 'Chuồng trại',
    icon: GiBarn,
    description: 'Nơi ở này có chuồng trại!'
  },
  {
    label: 'Sang trọng',
    icon: IoDiamond,
    description: 'Khách sạn này là thương hiệu mới và sang trọng!'
  }
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null
  }
  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map(item => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
