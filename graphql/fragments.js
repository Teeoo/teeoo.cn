import gql from 'graphql-tag'

export const ARTICLE = {
  ARTICLE: gql`
    fragment ARTICLE on Article {
      id
      title
      template
      fields {
        id
        name
        value
      }
    }
  `
}
