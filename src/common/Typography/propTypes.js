import PropTypes from "prop-types";
import { TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS } from "./constants";

export const typographySizeType = PropTypes.oneOf(
  Object.values(TYPOGRAPHY_SIZES)
);
export const typographyWeightType = PropTypes.oneOf(
  Object.values(TYPOGRAPHY_WEIGHTS)
);
