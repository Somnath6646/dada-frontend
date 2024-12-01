import { gql } from '@apollo/client';

export const SEARCH_CONTENT = gql`
  query SearchContent($query: String = "", $contentType: String = "") {
    searchContent(query: $query, contentType: $contentType) {
      id
      title
      url
      type
      tags
    }
  }
`;

export const ADD_CONTENT = gql`
  mutation AddContent($content: ContentInput!) {
    addContent(content: $content) {
      key
      value
    }
  }
`;

export const GET_ALL_CONTENT = gql`
  query AllContent {
    allContent {
      id
      title
      url
      type
      tags
    }
  }
`;

export const GET_CONTENT_BY_TAG = gql`
  query ContentByTag($tag: String!) {
    contentByTag(tag: $tag) {
      id
      title
      url
      type
      tags
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query AllTags {
    allTags
  }
`; 