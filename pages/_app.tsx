// import App from 'next/app'
import { AppProps } from 'next/app'
// CONTEXT
import { CartWrapper } from '../context/cart'

import 'antd/dist/antd.css'
import '../stylesheets/ant.css'
import '../stylesheets/antoverride.css'
import '../stylesheets/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartWrapper>
      <Component {...pageProps} />
    </CartWrapper>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
