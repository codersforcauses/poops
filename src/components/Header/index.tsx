import Head from 'next/head'

const defaultTitle = 'POOPS'

interface SeoProps {
  pageTitle?: string
}

const Seo = ({ pageTitle = defaultTitle }: SeoProps) => {
  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  )
}

export default Seo
