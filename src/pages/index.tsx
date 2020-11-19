import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>SemFila</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          SEM<a>FILA</a>
        </h1>

        <p className="description">
          Precisamos que você esteja logado
        </p>

        <div className="grid">
          <a href="/login" className="card">
            <h3>Logar &rarr;</h3>
            <p>Já ta acostumado com o tempo livre né?</p>
          </a>
          <a href="/register" className="card">
            <h3>Registrar &rarr;</h3>
            <p>Ta cansado de perder tempo né? Chega ae!</p>
          </a>
        </div>
      </main>

      <footer className="footer">
        <a
          rel="noopener noreferrer"
        >
          Powered by Fawkes
        </a>
      </footer>
    </div>
  )
}
