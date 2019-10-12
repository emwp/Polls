import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};


export type LoginResponse = {
   __typename?: 'LoginResponse',
  accessToken: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  register: Scalars['Boolean'],
  login: LoginResponse,
  registerPoll: Poll,
  closePoll: Poll,
  removePoll: Scalars['Boolean'],
  addPollOption: Option,
  vote: Option,
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterPollArgs = {
  registerPollInput: RegisterPollInput
};


export type MutationClosePollArgs = {
  id: Scalars['String']
};


export type MutationRemovePollArgs = {
  id: Scalars['String']
};


export type MutationAddPollOptionArgs = {
  description: Scalars['String'],
  pollId: Scalars['String']
};


export type MutationVoteArgs = {
  optionId: Scalars['Float'],
  pollId: Scalars['String']
};

export type Option = {
   __typename?: 'Option',
  id: Scalars['Float'],
  description: Scalars['String'],
  votes: Scalars['Float'],
  poll: Poll,
};

export type Poll = {
   __typename?: 'Poll',
  id: Scalars['String'],
  name: Scalars['String'],
  createdAt: Scalars['DateTime'],
  ClosedAt: Scalars['DateTime'],
  open: Scalars['Boolean'],
  moderated: Scalars['Boolean'],
  user: User,
  options: Array<Option>,
};

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  getUserPolls: Array<Poll>,
};

export type RegisterInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type RegisterPollInput = {
  name: Scalars['String'],
  moderated: Scalars['Boolean'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  polls: Array<Poll>,
};

export type HelloQueryVariables = {};


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;