import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import Modal from './components/modals/Modal'
export const metadata = {
  title: 'Airbnb xin nhe',
  description: 'Airbnb made by hdz'
}

const font = Nunito({
  subsets: ['latin']
})

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <Navbar />
        <Modal
          actionLabel='Submit'
          secondaryActionLabel='test'
          title='Hello word'
          isOpen
        />
        {children}
      </body>
    </html>
  )
}
