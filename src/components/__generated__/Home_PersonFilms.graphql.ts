/**
 * @generated SignedSource<<418e6bbae7ad8bb4e182245bf87b239b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Home_PersonFilms$data = {
  readonly filmConnection: {
    readonly films: ReadonlyArray<{
      readonly id: string;
      readonly title: string | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "Home_PersonFilms";
};
export type Home_PersonFilms$key = {
  readonly " $data"?: Home_PersonFilms$data;
  readonly " $fragmentSpreads": FragmentRefs<"Home_PersonFilms">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Home_PersonFilms",
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
  "type": "Person",
  "abstractKey": null
};

(node as any).hash = "0d6bb398bb789aed67be6680fb806009";

export default node;
