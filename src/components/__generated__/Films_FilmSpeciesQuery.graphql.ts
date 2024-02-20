/**
 * @generated SignedSource<<f071e3e59818668ca638cfed1165a701>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Films_FilmSpeciesQuery$variables = {
  filmId: string;
};
export type Films_FilmSpeciesQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"Films_FilmSpecies">;
  } | null;
};
export type Films_FilmSpeciesQuery = {
  response: Films_FilmSpeciesQuery$data;
  variables: Films_FilmSpeciesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filmId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "filmId"
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
    "name": "Films_FilmSpeciesQuery",
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
            "name": "Films_FilmSpecies"
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
    "name": "Films_FilmSpeciesQuery",
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
                "concreteType": "FilmSpeciesConnection",
                "kind": "LinkedField",
                "name": "speciesConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Species",
                    "kind": "LinkedField",
                    "name": "species",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
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
            "type": "Film",
            "abstractKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "866a2fabfd08a470252efdb191960e9e",
    "id": null,
    "metadata": {},
    "name": "Films_FilmSpeciesQuery",
    "operationKind": "query",
    "text": "query Films_FilmSpeciesQuery(\n  $filmId: ID!\n) {\n  node(id: $filmId) {\n    __typename\n    ...Films_FilmSpecies\n    id\n  }\n}\n\nfragment Films_FilmSpecies on Film {\n  speciesConnection {\n    species {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "164e8dd5c9f528d44fe2b8fff3aac9ef";

export default node;
