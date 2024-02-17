/**
 * @generated SignedSource<<437ad1a3d24cf999b764d856b4c6ebee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RestaurantOfferBottomPopup$data = {
  readonly id: string;
  readonly " $fragmentType": "RestaurantOfferBottomPopup";
};
export type RestaurantOfferBottomPopup$key = {
  readonly " $data"?: RestaurantOfferBottomPopup$data;
  readonly " $fragmentSpreads": FragmentRefs<"RestaurantOfferBottomPopup">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RestaurantOfferBottomPopup",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Restaurant",
  "abstractKey": null
};

(node as any).hash = "9794dca0ed26c8a42cc0a948844a4c72";

export default node;
