import { graphql } from "relay-runtime";
import { createPageContainer } from "../relay/createPageContainer";
import { HomePageQuery } from "./__generated__/HomePageQuery.graphql";
import { useLazyLoadQuery } from "react-relay";
import { Home } from "../components/Home";

const query = graphql`
  query HomePageQuery {
    ...Home
  }
`;

export const HomePage = createPageContainer<HomePageQuery>(
  (props) => {
    const result = useLazyLoadQuery<HomePageQuery>(query, props.queryVariables)
    return (
      <Home query={result} />
    );
  },
  {
    getVariables: () => {
      return {};
    },
    query,
  }
);
