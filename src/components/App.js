import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { Artist } from './Artist'

export default function App(props) {
  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      <QueryRenderer
        dataFrom="STORE_THEN_NETWORK"
        environment={props.environment}
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
    </div>
  )
}
