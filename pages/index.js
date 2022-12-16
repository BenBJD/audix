import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Audix</title>
        <meta name="description" content="Make music with friends" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <App />
      </main>
    </>
  )
}
