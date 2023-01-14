import { ReactNode } from 'react'
import TopNav from '@/components/TopNav'
import NavBar from '@/components/NavBar'
import Header from '@/components/Header'

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
