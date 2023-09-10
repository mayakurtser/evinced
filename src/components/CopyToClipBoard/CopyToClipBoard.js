import React from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from "utils";
import classnames from "classnames";
import { ReactComponent as Copy } from "assets/icons/copy-06.svg";
import classes from "./CopyToClipBoard.module.scss";

const propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
};
const CopyToClipBoard = ({ className, text }) => (
    <Copy className={classnames(classes.copy, className)} onClick={() => copyToClipboard(text)}/>
);


CopyToClipBoard.propTypes = propTypes;

export default CopyToClipBoard;