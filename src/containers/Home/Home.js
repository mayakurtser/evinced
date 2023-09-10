import React from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Heart } from "assets/icons/heart.svg"
import { Container } from "common/Container";
import { Display, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS } from "common/Typography";
import classes from "./Home.module.scss";

const Home = () => {
    return (
        <div className={classes.page}>
            <Display value={`Welcome!`}
                     size={TYPOGRAPHY_SIZES.SM} weight={TYPOGRAPHY_WEIGHTS.MEDIUM}/>
            <Display value={`I hope you enjoy the review as much as I enjoyed developing it.`}
                     size={TYPOGRAPHY_SIZES.SM} weight={TYPOGRAPHY_WEIGHTS.MEDIUM}/>
            <Container className={classes.container}>
                <Link to="/report/scan-01">Scan 01</Link>
                <Link to="/report/scan-02">Scan 02</Link>
                <Link to="/report/scan-03">Scan 03 - Should not pass validation </Link>
            </Container>
            <Heart className={classes.heart}/>
        </div>

    );
};

export default Home;