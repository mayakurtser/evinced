import React from 'react';
import PropTypes from 'prop-types';
import { TopBar } from "components/TopBar";
import classes from "./MainLayout.module.scss"
import classNames from "classnames";

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

const MainLayout = ({ children, className }) => {
    return (
        <div className={classNames(classes.app, className)}>
            <TopBar className={classes.header}/>
            <div className={classes.main}>
                {children}
            </div>

        </div>
    );
};

MainLayout.propTypes = propTypes;

export default MainLayout;