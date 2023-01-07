import { ReactNode } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import TopNav from '@/components/TopNav'

interface props {
  title?: string
  heading?: string
  content?: ReactNode
}

const AdminPage = ({ title, heading, content }: props) => {
  return (
    <>
      <Header pageTitle={title} />
      <TopNav />
      <main className='absolute h-[calc(100%-7rem)] overflow-y-scroll bg-contain bg-fixed bg-[left_50%_top_calc(100%-4rem)] bg-no-repeat'>
        <div className='h-[calc(max-content +4rem)] m-auto flex w-screen flex-col'>
          <div className='flex flex-col px-4 '>
            <h1 className='flex-1 py-3 text-center text-3xl'>{heading}</h1>
            {content}
          </div>
        </div>
      </main>
      <NavBar />
    </>
  )
}

export default AdminPage
