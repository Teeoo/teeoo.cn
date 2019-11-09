import gql, { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

export const article = {
  fragment: gql`
    fragment fragment on Article {
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
      toc
      template
      type
      status
      publish
      password
      allowComment
      isTop
      exinfo
      author {
        id
        order
        desc
        createdAt
        updatedAt
        nickname
        avatarUrl
        email
        url
        screenName
        exinfo
        lastIp
        lastTime
      }
      category {
        id
        order
        desc
        createdAt
        updatedAt
        label
        slug
        cateNum
        archNum
        children
        parent
      }
      fields {
        id
        order
        desc
        createdAt
        updatedAt
        name
        type
        value
      }
      tags {
        id
        order
        desc
        createdAt
        updatedAt
        label
        slug
        color
        hot
      }
      comments {
        id
        order
        desc
        createdAt
        updatedAt
        ip
        url
        email
        avatar
        username
        agent
        text
        children
        parent
      }
    }
  `
}

export const pages = {
  fragment: gql`
    fragment fragment on Pages {
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
      toc
      template
      type
      status
      publish
      password
      allowComment
      isTop
      exinfo
      author {
        id
        order
        desc
        createdAt
        updatedAt
        nickname
        avatarUrl
        email
        url
        screenName
        exinfo
        lastIp
        lastTime
      }
      category {
        id
        order
        desc
        createdAt
        updatedAt
        label
        slug
        cateNum
        archNum
        children
        parent
      }
      fields {
        id
        order
        desc
        createdAt
        updatedAt
        name
        type
        value
      }
      tags {
        id
        order
        desc
        createdAt
        updatedAt
        label
        slug
        color
        hot
      }
      comments {
        id
        order
        desc
        createdAt
        updatedAt
        ip
        url
        email
        avatar
        username
        agent
        text
        children
        parent
      }
    }
  `
}

export const comments = {
  fragment: gql`
    fragment fragment on Comments {
      id
      order
      desc
      createdAt
      updatedAt
      ip
      url
      avatar
      email
      username
      agent
      text
      children
      parent
    }
  `
}

export const links = {
  fragment: gql`
    fragment fragment on Links {
      id
      order
      desc
      createdAt
      updatedAt
      url
      name
      email
      logo
      target
      status
    }
  `
}
