import { gql } from 'graphql-tag';

export const QUERY_THOUGHTS = gql`
query thoguhts($username: String) {
    thoughts(username: $username) {
        _id
        thoughtText
        createAt
        username
        reactionCount
        reactions {
            _id
            createdAt
            username
            reactionBody
        }
    }
}
`;