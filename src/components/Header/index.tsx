import Head from 'next/head'

const defaultTitle = 'POOPS'

interface HeaderProps {
  pageTitle?: string
}

const Header = ({ pageTitle = defaultTitle }: HeaderProps) => {
  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  )
}

export default Header
