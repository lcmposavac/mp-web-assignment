import { graphql } from "relay-runtime";
import { createPageContainer } from "../relay/createPageContainer";
import { useLazyLoadQuery } from "react-relay";
import { FilmsPageQuery } from "./__generated__/FilmsPageQuery.graphql";
import { Films } from "../components/Films";

const query = graphql`
  query FilmsPageQuery {
    ...Films
  }
`;

export const FilmsPage = createPageContainer<FilmsPageQuery>(
  (props) => {
    const result = useLazyLoadQuery<FilmsPageQuery>(
      query,
      props.queryVariables
    );
    return <Films query={result} />;
  },
  {
    getVariables: () => {
      return {};
    },
    query,
  }
);
