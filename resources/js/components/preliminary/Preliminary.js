import React, {useContext, useState} from "react";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Header from "../header/Header";
import {withPermission} from "../../utils/with-premission/withPermission";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import PreliminaryMap from "./PreliminaryMap";
import FormTextField from "../form-textfield/FormTextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        margin: "auto",
        paddingTop: 64,
        marginTop: 10,
        overflow: 'hidden',
    },
}));

const Preliminary = () => {
    const classes = useStyles();
    const vocabs = getTranslator(useContext(LanguageContext).language);

    return (
        <>
            <Header/>
            <div className={classes.container}>
                <PreliminaryMap/>
            </div>
        </>
    );
};

export default withPermission(Preliminary)
