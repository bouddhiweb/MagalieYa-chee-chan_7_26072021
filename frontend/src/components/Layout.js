import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Banner from "./Banner";
import LateralBar from "./LateralBar";
import '../style/main.scss'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ROUTES} from "../constants/routes";
import {HomePage, LoginPage, ProfilPage, RegisterPage} from "../pages";

const useStyles = makeStyles(() => ({
    root: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        height: "100%"
    },
    container: {
        display: "flex",
        flex: 1,
        margin: 0,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "1200px",
        marginBottom: "40px",
        marginTop: "40px",
        height: "100%"
    },
    main: {
        flex: 1,
        minHeight: "100%",
        height: "100%"
    },
}));

const Layout = () => {
    const classes = useStyles();

    return (
        <>
            <div className='header'><Banner /></div>
            <div className={classes.root}>
                <main className='darkTheme darkTheme--mainContainer' >
                    <LateralBar />
                    <BrowserRouter>
                        <Switch>
                            <Route exact title="Vibes" path="/" render={() => <Redirect to={ROUTES.index} />} />
                            <Route exact title="Vibes" path={ROUTES.index} component={HomePage} />
                            <Route exact title="Se connecter - Vibes" path={ROUTES.login} component={LoginPage} />
                            <Route exact title="Mon profil - Vibes" path={ROUTES.profil} component={ProfilPage} />
                            <Route exact title="Créer un compte - Vibes" path={ROUTES.signup} component={RegisterPage} />
                        </Switch>
                    </BrowserRouter>
                </main>
            </div>
        </>
    );
};

export default Layout;

// Process : Pour ajouter une page
// -> Ajouter dans /constants/routes
// -> Ajouter dans /pages/index.ts
// -> Ajouter ci-dessus
