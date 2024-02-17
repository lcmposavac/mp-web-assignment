import * as React from "react";
import { SVGProps } from "react";

export const CrossLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4724 1.69507L2 16.1675M2 1.69507L16.4724 16.1675"
      stroke="currentColor"
      strokeWidth="2.01941"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
