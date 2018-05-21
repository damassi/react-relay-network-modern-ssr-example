# Relay Modern + relay-network-modern-ssr Example app

Example app showing how perform simple server-side rendering (SSR) using [react-relay-network-modern](https://github.com/nodkz/react-relay-network-modern) and associated middleware, [react-relay-network-modern-ssr](https://github.com/nodkz/react-relay-network-modern-ssr).

**NOTE:** This is meant for Relay 1.5, since it relies on an experimental undocumented `QueryRenderer` prop `dataFor='STORE_THEN_NETWORK'`, which will read from [store data before network](https://github.com/facebook/relay/releases/tag/v1.5.0) if available.

#### Setup:

```bash
git clone git@github.com:damassi/react-relay-network-modern-ssr-example.git
cd react-relay-network-modern-ssr-example
yarn install
yarn start
```
