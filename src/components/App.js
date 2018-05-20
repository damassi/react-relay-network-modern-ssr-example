import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { environment } from '../relayEnvironment'
import { Artist } from './Artist'

export default function App() {
  return (
    <QueryRenderer
      dataFrom="STORE_THEN_NETWORK"
      environment={environment}
      query={graphql`
        query AppQuery($id: String!) {
          artist(id: $id) {
            ...Artist_artist
          }
        }
      `}
      variables={{
        id: 'pablo-picasso',
      }}
      render={response => {
        const { error, props } = response

        if (error) {
          return <div>{error.message}</div>
        } else if (props) {
          return <Artist {...props} />
        } else {
          return <div>Loading</div>
        }
      }}
    />
  )
}
