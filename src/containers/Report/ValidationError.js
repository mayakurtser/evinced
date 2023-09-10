import React from 'react';
import PropTypes from 'prop-types';
import { Display, Text, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS } from "common/Typography";
import colors from "styles/colors.module.scss";
import { Link } from "react-router-dom";

const propTypes = { message: PropTypes.string };
const ValidationError = ({ message }) => {
    return (
        <div>

            <Display value="Error while validating scan..."
                     size={TYPOGRAPHY_SIZES.SM} weight={TYPOGRAPHY_WEIGHTS.MEDIUM}/>
            <Text
                size={TYPOGRAPHY_SIZES.XL}
                weight={TYPOGRAPHY_WEIGHTS.REGULAR}
                color={colors.gray600}
                value={message}/>
            <Link to="/">
                Go Home
            </Link>
        </div>
    );
};

ValidationError.propTypes = propTypes;

export { ValidationError };