import InfiniteScroll from "react-infinite-scroller";
import {
  graphql,
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from "react-relay";
import { Loader } from "./Loader";
import { Suspense, useState } from "react";
import { Films_FilmSpecies$key } from "./__generated__/Films_FilmSpecies.graphql";
import { Films_FilmSpeciesQuery } from "./__generated__/Films_FilmSpeciesQuery.graphql";
import { Films_Film$key } from "./__generated__/Films_Film.graphql";
import { Films_Films$key } from "./__generated__/Films_Films.graphql";
import { Films$key } from "./__generated__/Films.graphql";

const FilmsSpeciesDisplay = (props: { film: Films_FilmSpecies$key }) => {
  const film = useFragment(
    graphql`
      fragment Films_FilmSpecies on Film {
        speciesConnection {
          species {
            name
            id
          }
        }
      }
    `,
    props.film
  );
  return (
    <ul className="text-sm text-slate-700">
      {film.speciesConnection?.species?.map((species) =>
        species?.id ? <li key={species?.id}>{species?.name}</li> : null
      )}
    </ul>
  );
};

const FilmSpecies = (props: { id: string }) => {
  const data = useLazyLoadQuery<Films_FilmSpeciesQuery>(
    graphql`
      query Films_FilmSpeciesQuery($filmId: ID!) {
        node(id: $filmId) {
          ...Films_FilmSpecies
        }
      }
    `,
    {
      filmId: props.id,
    }
  );
  if (!data.node) {
    return <p className="text-red-700">Species not found</p>;
  }
  return <FilmsSpeciesDisplay film={data.node} />;
};

const Film = (props: { film: Films_Film$key }) => {
  const [displaySpecies, setDisplaySpecies] = useState(false);
  const film = useFragment(
    graphql`
      fragment Films_Film on Film {
        title
        releaseDate
        id
      }
    `,
    props.film
  );
  return (
    <div className="mb-4">
      <div className="text-lg">{film.title}</div>
      <div className="mt-1">Relase date: {film.releaseDate}</div>
      <button
        onClick={() => setDisplaySpecies(!displaySpecies)}
        className="text-sm font-medium"
      >
        {displaySpecies ? "Hide" : "Show"} Species
      </button>
      {displaySpecies ? (
        <Suspense fallback={<Loader />}>
          <FilmSpecies id={film.id} />
        </Suspense>
      ) : null}
    </div>
  );
};

const FilmsList = (props: { query: Films_Films$key }) => {
  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment(
    graphql`
      fragment Films_Films on Query
      @refetchable(queryName: "Films_FilmsListRefetchQuery")
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 20 }
        cursor: { type: "String", defaultValue: null }
      ) {
        allFilms(first: $count, after: $cursor)
          @connection(key: "Query_allFilms") {
          edges {
            node {
              id
              ...Films_Film
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
      {data.allFilms?.edges?.map((g) =>
        g?.node?.id ? (
          <li key={g.node.id}>
            <Film film={g.node} />
          </li>
        ) : null
      )}
    </InfiniteScroll>
  );
};

export const Films = (props: { query: Films$key }) => {
  const query = useFragment(
    graphql`
      fragment Films on Query {
        ...Films_Films
      }
    `,
    props.query
  );
  return (
    <div className="mx-8">
      <h1 className="text-3xl font-bold mb-6 mt-12">Films</h1>
      <Suspense fallback={<Loader />}>
        <FilmsList query={query} />
      </Suspense>
    </div>
  );
};
