import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export const Artist = createFragmentContainer(
  ({ artist }) => {
    return (
      <div>
        <h1>{artist.name}</h1>
        <p>{artist.bio}</p>
      </div>
    )
  },
  graphql`
    fragment Artist_artist on Artist {
      name
      bio
    }
  `
)
