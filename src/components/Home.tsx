import InfiniteScroll from "react-infinite-scroller";
import { graphql, useFragment, useLazyLoadQuery, usePaginationFragment } from "react-relay"
import { Home_Person$key } from "./__generated__/Home_Person.graphql"
import { Home_People$key } from "./__generated__/Home_People.graphql"
import { Loader } from "./Loader";
import { Suspense, useState } from "react";
import { Home$key } from "./__generated__/Home.graphql";
import { Home_PersonFilms$key } from "./__generated__/Home_PersonFilms.graphql";
import { Home_PersonFilmsQuery } from "./__generated__/Home_PersonFilmsQuery.graphql";

const PersonFilmsDisplay = (props: {
  person: Home_PersonFilms$key
}) => {
  const person = useFragment(
    graphql`
      fragment Home_PersonFilms on Person {
        filmConnection {
          films {
            title
            id
          }
        }
      }
    `, props.person
  )
  return <ul className="text-sm text-slate-700">{person.filmConnection?.films?.map(f => f?.id ? <li key={f?.id}>{f?.title}</li> : null)}</ul>
}

const PersonFilms = (props: {
  id: string
}) => {
  const data = useLazyLoadQuery<Home_PersonFilmsQuery>(
    graphql`
      query Home_PersonFilmsQuery($personId: ID!) {
        node(id: $personId) {
          ...Home_PersonFilms
        }
      }
    `, {
    personId: props.id
  }
  )
  if (!data.node) {
    return <p className="text-red-700">Films not found</p>
  }
  return <PersonFilmsDisplay person={data.node} />
}

const Person = (props: {
  person: Home_Person$key
}) => {
  const [displayFilms, setDisplayFilms] = useState(false)
  const person = useFragment(
    graphql`
      fragment Home_Person on Person {
        name
        birthYear
        id
      }
    `, props.person
  )
  return (
    <div className="mb-4">
      <div className="text-lg">{person.name}</div>
      <div className="mt-1">Birth Year: {person.birthYear}</div>
      <button onClick={() => setDisplayFilms(!displayFilms)} className="text-sm font-medium">
        {displayFilms ? "Hide" : "Show"} Films
      </button>
      {displayFilms ? <Suspense fallback={<Loader />}>
        <PersonFilms id={person.id} />
      </Suspense> : null}
    </div>
  )
}

const People = (props: {
  query: Home_People$key
}) => {
  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment(
    graphql`
      fragment Home_People on Query
      @refetchable(queryName: "Home_PersonListRefetchQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 20 }
        cursor: { type: "String", defaultValue: null }
      ) {
        allPeople(first: $count, after: $cursor) @connection(key: "Query_allPeople") {
          edges {
            node {
              id
              ...Home_Person
            }
          }
        }
      }
    `,
    props.query
  );
  return (
    <InfiniteScroll
      useWindow
      className="mb-8"
      hasMore={hasNext}
      loadMore={() => {
        if (hasNext && !isLoadingNext) {
          loadNext(20);
        }
      }}
      element="ul"
      loader={
        <li
          key="loader"
          className="block py-16 flex items-center justify-center"
        >
          <Loader />
        </li>
      }
    >
      {data.allPeople?.edges?.map((g) =>
        g?.node?.id ? (
          <li key={g.node.id}>
            <Person person={g.node} />
          </li>
        ) : null
      )}
    </InfiniteScroll>
  )
}

export const Home = (props: {
  query: Home$key
}) => {
  const query = useFragment(
    graphql`
      fragment Home on Query {
        ...Home_People
      }
    `, props.query
  )
  return (
    <div className="mx-8">
      <h1 className="text-3xl font-bold mb-6 mt-12">People</h1>
      <Suspense fallback={<Loader />}>
        <People query={query} />
      </Suspense>
    </div>
  );
}