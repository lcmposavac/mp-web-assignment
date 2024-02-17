/**
 * @generated SignedSource<<bcee4a1bf9ad209f6b5b03a26ec79d05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Home$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Home_People">;
  readonly " $fragmentType": "Home";
};
export type Home$key = {
  readonly " $data"?: Home$data;
  readonly " $fragmentSpreads": FragmentRefs<"Home">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Home",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Home_People"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "fb3bb76bb44b454368eba6c8622c50e0";

export default node;
