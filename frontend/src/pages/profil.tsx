import React from 'react';
import '../index.css';
import userIcon from '../assets/user.png';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    // /!\ CLASSES OBLIGATOIRES /!\
    container : {
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "1200px",
        marginBottom: "40px",
        marginTop: "40px",
        backgroundColor: "rgba(255, 255, 255, 0.9)"
    },
    main: {
        backgroundAttachment: "scroll",
        height: "100vh"
    },
    filterBox: {
        marginBottom: "50px"
    },
    pageTitle: {
        lineHeight: 1.2,
        textTransform: 'uppercase',
        font: 'large inherit',
        fontWeight: 400,
        fontSize: '3em',
        color: '#242e73',
        paddingLeft: 10,
        paddingRight: 10,
    },
    // >> FIN DES CLASSES OBLIGATOIRES
    squareBox : {
        width : "150px",
        height: "150px",
        overflow: "hidden",
        borderRadius: "30px 50px",
        marginRight: "50px",
        marginBottom: "30px"
    },
    avatar : {
        objectFit: "cover",
        width : "150px",
        height: "150px",
    },
    boxContent : {
        backgroundColor:"white",
        opacity: 0.8,
        margin: "20px",
        padding: "30px",
        border: "1px solid gainsboro"
    },
    link: {
        color:"#242e73",
        fontWeight: "bolder"
    }
}));

export default function ProfilPage() {
    const classes = useStyles();
    return(
        <div className={classes.main}>
            <div className={classes.container}>
                <ul className="MuiList-root py-0 MuiList-padding">
                    <li className="MuiListItem-root d-flex justify-content-between align-items-center MuiListItem-gutters">
                        <div className="avatar-icon-wrapper avatar-icon-lg">
                            <div className={classes.squareBox}>
                                <img className={classes.avatar} alt="..." src= {userIcon} />
                            </div>
                        </div>
                        <div className="flex-grow-1 pl-2">
                            <h2 className="mt-0 mb-1">Jean-Michel</h2>
                            <p>
                                <a href="/login" className={classes.link}>Déconnexion</a>
                            </p>
                        </div>
                        <span className="pl-3">
                            <button  className="MuiButtonBase-root MuiButton-root MuiButton-text pl-2 pr-2 MuiButton-textSecondary MuiButton-textSizeSmall MuiButton-sizeSmall" type="button">
                                <span className="MuiButton-label">
                                    <span className="btn-wrapper--icon">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" className="svg-inline--fa fa-cog fa-w-16 font-size-lg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/>
                                        </svg>
                                    </span>
                                </span>
                            </button>
                        </span>
                    </li>
                </ul>
                <ul className={classes.boxContent}>

                    <li className="MuiListItem-root d-flex justify-content-between align-items-center MuiListItem-gutters">
                        Fortifications in Europe
                        <span className="MuiBadge-root">21</span>
                    </li>
                    <hr className="MuiDivider-root"/>
                    <li className="MuiListItem-root d-flex justify-content-between align-items-center MuiListItem-gutters">
                        Popular castles
                        <span className="MuiBadge-root">76
                            </span>
                    </li>
                    <hr className="MuiDivider-root"/>
                    <li className="MuiListItem-root d-flex justify-content-between align-items-center MuiListItem-gutters">
                        Famous forts
                        <span className="MuiBadge-root">34</span>
                    </li>
                    <hr className="MuiDivider-root"/>
                    <li className="MuiListItem-root d-flex justify-content-between align-items-center MuiListItem-gutters">
                        <div className="w-100">
                            <div className="d-flex flex-wrap justify-content-between mb-2">
                                <small className="line-height-xs text-uppercase text-muted">Nov 12, 11:25am</small>
                                <small className="line-height-xs text-uppercase text-success">Due in 12 days</small>
                            </div>
                            <h6 className="pt-1 pb-1">
                                <span className="MuiBadge-root text-warning">New report</span>
                            </h6>
                            <p className="mb-3">This is a dummy text acting like a small description for the above title...</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}