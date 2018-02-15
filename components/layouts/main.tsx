import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'
import '../../styles/theme.scss'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.SFC<{}> = (props: MainLayoutProps) => {
  const { children } = props
  const color = '#EE2560'
  const production = process.env.NODE_ENV === 'production'
  return (
    <div>
      <Head>
        <title>Next.js 5.0 w/ TypeScript</title>
        {production ? <link rel="stylesheet" href="/_next/static/style.css" /> : null}
      </Head>
      <h1>Next.js 5.0 w/ TypeScript</h1>
      <nav>
        <dl>
          <dt>
            <Link href={'/'}>
              <a>Index</a>
            </Link>
          </dt>
          <dd>React Component Page</dd>
          <dt>
            <Link href={'/redux'}>
              <a>Redux</a>
            </Link>
          </dt>
          <dd>Redux Container Page</dd>
          <dt>
            <Link as={'/stories/16311462'} href={'/story?id=16311462'}>
              <a>Next.js 5.0 @ HN</a>
            </Link>
          </dt>
          <dd>Dynamic Routing Page w/ Redux</dd>
        </dl>
      </nav>
      <hr />
      {children}
      <style jsx>{`
        h1 {
          color: ${color};
        }
        nav {
          dd {
            font-size: 12px;
            margin-left: 0;
            margin-bottom: 0.5em;
          }
          padding-bottom: 0.25em;
        }
      `}</style>
    </div>
  )
}

export default MainLayout
