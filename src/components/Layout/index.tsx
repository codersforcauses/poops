import { ReactNode } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import TopNav from '@/components/TopNav'

export interface LayoutInterface {
  title: string
  children?: ReactNode
}

const Layout = ({ children, title }: LayoutInterface) => {
  return (
    <>
      <Header pageTitle={title} />
      <TopNav />
      <main>{children}</main>
      <NavBar />
    </>
  )
}

export default Layout
