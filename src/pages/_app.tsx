import GlobalStyle from '../../styles/GlobalStyle'
import { Grommet } from 'grommet';

export default function MyApp({ Component, pageProps }) {
  return  (
    <>
      <Grommet plain>
        <GlobalStyle />
        <Component {...pageProps} />
      </Grommet>
    </>
  )
}
