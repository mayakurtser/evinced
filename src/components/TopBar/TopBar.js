import React from 'react';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { ReactComponent as Logo } from "assets/logos/evinced_logo.svg"
import { ReactComponent as Logout } from "assets/icons/log-out-01.svg"
import colors from "styles/colors.module.scss";
import { Text, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS } from "common/Typography"
import classes from "./TopBar.module.scss";

const propTypes = {
    className: PropTypes.string
};
const TopBar = ({ className }) => {
    const navigate = useNavigate();
    return (
        <div className={classnames(classes.topBar, className)}>
            <Logo className={classes.logo}/>
            <Text className={classes.title} color={colors.gray700} inline value="Production Monitoring DEV"
                  size={TYPOGRAPHY_SIZES.MD}
                  weight={TYPOGRAPHY_WEIGHTS.SEMI_BOLD}/>
            <Logout className={classes.logout} onClick={() => navigate("/")}/>
        </div>
    );
};

TopBar.propTypes = propTypes;

export default TopBar;