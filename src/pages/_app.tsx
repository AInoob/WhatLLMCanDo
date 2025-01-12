import type { AppProps } from 'next/app'
import { configure } from 'mobx'
import { GoogleAnalytics } from '@next/third-parties/google'
import '../styles/globals.css'

// Configure MobX
configure({
  enforceActions: 'never',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-HK6EYBTQMC" />
    </>
  )
}
