import gql from 'graphql-tag'
import { comments } from '~/graphql/fragments'
export const PUSHCOMMENTS = gql`
    mutation($data:PushCommentsInput!){
        PushComments(data: $data) {
            ...fragment
        }
    }
    ${comments.fragment}
`
