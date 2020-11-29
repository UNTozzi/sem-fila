import Image from 'next/image'
import Head from 'next/head'
import { Box, Header, Heading } from 'grommet'
import { Login, UserAdd } from 'grommet-icons'

import { BoxIndex, Card } from '../../styles/pages'

export default function Home() {
  function handleGoToLogin () {
    window.location.href= './login'
  }

  function handleGoToRegister () {
    window.location.href= './register'
  }

  return (
    <Box width="100vw" height="100vh">
      <Head>
        <title>SemFila</title>
        <link rel="icon" href="/sf_icon_zoom.png" />
      </Head>
      <Header background="#202024" width="100%" height="12vh" margin="none" justify="center">
        <Image src="/semfila7.png" layout="intrinsic" width="150%" height="50%"/>      
      </Header>
      <BoxIndex  direction="row" fill>
          <Card onClick={handleGoToLogin}>
            <Login size="xlarge"/>
            <Heading level="4" color="gray">Já ta acostumado com o tempo livre né?</Heading>
          </Card>
          <Card onClick={handleGoToRegister}>
            <UserAdd size="xlarge"/>
            <Heading level="4" color="gray">Ta querendo ganhar tempo? Cadastre-se</Heading>
          </Card>
      </BoxIndex>
    </Box>
  )
}
