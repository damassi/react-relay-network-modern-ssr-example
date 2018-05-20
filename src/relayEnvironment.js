import 'isomorphic-fetch'
import 'regenerator-runtime/runtime'
import RelayServerSSR from 'react-relay-network-modern-ssr/lib/server'
import RelayClientSSR from 'react-relay-network-modern-ssr/lib/client'
import { Environment, RecordSource, Store } from 'relay-runtime'

import {
  RelayNetworkLayer,
  urlMiddleware,
  loggerMiddleware,
} from 'react-relay-network-modern'

const isServer = typeof window === 'undefined'

export function getRelayEnvironment() {
  const relaySSRMiddleware = isServer
    ? new RelayServerSSR()
    : new RelayClientSSR(window.relayData)

  const network = new RelayNetworkLayer([
    relaySSRMiddleware.getMiddleware(),
    loggerMiddleware(),
    urlMiddleware({
      url: process.env.GRAPHQL_ENDPOINT,
    }),
  ])

  const source = new RecordSource()
  const store = new Store(source)
  const environment = new Environment({
    network,
    store,
  })

  return {
    environment,
    relaySSRMiddleware,
  }
}
