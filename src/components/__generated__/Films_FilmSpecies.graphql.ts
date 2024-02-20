/**
 * @generated SignedSource<<b8b3818c268fb45377961a26a4dcba45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Films_FilmSpecies$data = {
  readonly speciesConnection: {
    readonly species: ReadonlyArray<{
      readonly id: string;
      readonly name: string | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "Films_FilmSpecies";
};
export type Films_FilmSpecies$key = {
  readonly " $data"?: Films_FilmSpecies$data;
  readonly " $fragmentSpreads": FragmentRefs<"Films_FilmSpecies">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Films_FilmSpecies",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Film",
  "abstractKey": null
};

(node as any).hash = "a5290f65db4f83b9820c08e0c23ac4fb";

export default node;
