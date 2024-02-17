/**
 * @generated SignedSource<<45c8a867349ceb05c52b8a293301f109>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Home_PersonFilmsQuery$variables = {
  personId: string;
};
export type Home_PersonFilmsQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"Home_PersonFilms">;
  } | null;
};
export type Home_PersonFilmsQuery = {
  response: Home_PersonFilmsQuery$data;
  variables: Home_PersonFilmsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "personId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "personId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Home_PersonFilmsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Home_PersonFilms"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Home_PersonFilmsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PersonFilmsConnection",
                "kind": "LinkedField",
                "name": "filmConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Film",
                    "kind": "LinkedField",
                    "name": "films",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "Person",
            "abstractKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b3d254202bdbbd28467e4f4d8ec6de19",
    "id": null,
    "metadata": {},
    "name": "Home_PersonFilmsQuery",
    "operationKind": "query",
    "text": "query Home_PersonFilmsQuery(\n  $personId: ID!\n) {\n  node(id: $personId) {\n    __typename\n    ...Home_PersonFilms\n    id\n  }\n}\n\nfragment Home_PersonFilms on Person {\n  filmConnection {\n    films {\n      title\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "250448dd29a5df42e976a515ec11c560";

export default node;
