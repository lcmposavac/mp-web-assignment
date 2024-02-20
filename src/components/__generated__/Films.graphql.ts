/**
 * @generated SignedSource<<cef387a99e89ad1ca39c31feb872e317>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Films$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Films_Films">;
  readonly " $fragmentType": "Films";
};
export type Films$key = {
  readonly " $data"?: Films$data;
  readonly " $fragmentSpreads": FragmentRefs<"Films">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Films",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Films_Films"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "309e3b77049de688f8768be39d80b86f";

export default node;
