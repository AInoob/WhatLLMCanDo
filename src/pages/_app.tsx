import type { AppProps } from 'next/app'
import { configure } from 'mobx'
import '../styles/globals.css'

// Configure MobX
configure({
  enforceActions: 'never',
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
