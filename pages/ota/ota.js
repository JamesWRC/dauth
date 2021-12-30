import Head from 'next/head'

export default function Ota(ota) {
    return (
      <main>
        <Head>
          <title>Home page</title>
        </Head>
  
        <h1>List of posts</h1>
  
        <section>
        <h2>Your OTA is: {ota}</h2>
        </section>
      </main>
    )
  }