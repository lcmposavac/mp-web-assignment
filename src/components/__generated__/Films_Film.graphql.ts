/**
 * @generated SignedSource<<38897c0108e5c1cfe03a7f1e6e0df3dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Films_Film$data = {
  readonly id: string;
  readonly releaseDate: string | null;
  readonly title: string | null;
  readonly " $fragmentType": "Films_Film";
};
export type Films_Film$key = {
  readonly " $data"?: Films_Film$data;
  readonly " $fragmentSpreads": FragmentRefs<"Films_Film">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Films_Film",
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
      "name": "releaseDate",
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
  "type": "Film",
  "abstractKey": null
};

(node as any).hash = "520f191b7d9b6bb9d22d30c213cdb0b4";

export default node;
