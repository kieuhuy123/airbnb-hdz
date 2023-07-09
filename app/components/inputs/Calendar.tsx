'use client'
import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import vi from 'date-fns/locale/vi'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

interface CalendarProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
  disabledDates?: Date[]
}
const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates
}) => {
  return (
    <DateRange
      ranges={[value]}
      onChange={onChange}
      disabledDates={disabledDates}
      date={new Date()}
      rangeColors={['#262626']}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      locale={vi}
    />
  )
}

export default Calendar
