import gql from 'graphql-tag'
import { ARTICLE } from './fragments'

// 页面
export const PAGE = gql`
  query {
    page {
      ...ARTICLE
    }
  }
  ${ARTICLE.ARTICLE}
`
// 文章列表
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

// 文章详情
export const ARTICLEDETAILS = gql`
  query($id: String!) {
    articleDetails(id: $id) {
      id
      order
      desc
      createdAt
      updatedAt
      title
      slug
      cover
      summary
      text
      html
      template
      type
      status
      publish
      password
      allowComment
      isTop
    }
  }
`
