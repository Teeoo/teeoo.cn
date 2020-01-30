import gql from 'graphql-tag'
import { ARTICLE } from './fragments'

export const PAGE = gql`
  query {
    page {
      ...ARTICLE
    }
  }
  ${ARTICLE.ARTICLE}
`

export const ARTICLELIST = gql`
  query {
    article {
      total
      per_page
      current_page
      last_page
      data {
        id
        title
        summary
        category {
          label
        }
        author {
          name
        }
        isTop
        createdAt
      }
    }
  }
`
