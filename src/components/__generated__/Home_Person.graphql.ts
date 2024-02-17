/**
 * @generated SignedSource<<4747e736ab5e465d237bd71cf03284ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Home_Person$data = {
  readonly birthYear: string | null;
  readonly id: string;
  readonly name: string | null;
  readonly " $fragmentType": "Home_Person";
};
export type Home_Person$key = {
  readonly " $data"?: Home_Person$data;
  readonly " $fragmentSpreads": FragmentRefs<"Home_Person">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Home_Person",
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
      "name": "birthYear",
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
  "type": "Person",
  "abstractKey": null
};

(node as any).hash = "2bc7d6756e67207f81d5aa346ad495b6";

export default node;
