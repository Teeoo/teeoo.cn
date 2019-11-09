import gql from 'graphql-tag'
import { article, links, pages } from '~/graphql/fragments'

export const ARTICLE = gql`
  query {
    article {
      ...fragment
    }
  }
  ${article.fragment}
`

export const LINKS = gql`
  query {
    links {
      ...fragment
    }
  }
  ${links.fragment}
`

export const ARTICLEBYID = gql`
  query($id: String!) {
    ArticleById(id: $id) {
      ...fragment
    }
  }
  ${article.fragment}
`

export const PAGESBYID = gql`
  query($id: String!) {
    PagesById(id: $id) {
      ...fragment
    }
  }
  ${pages.fragment}
`
