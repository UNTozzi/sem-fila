import GlobalStyle from '../../styles/GlobalStyle'
import { Grommet } from 'grommet';

export default function MyApp({ Component, pageProps }) {
  return  (
    <>
      <Grommet plain themeMode="dark">
        <GlobalStyle />
        <Component {...pageProps} />
      </Grommet>
    </>
  )
}
