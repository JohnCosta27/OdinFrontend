import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const ViewWrapper = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
            overflowX: 'hidden',
            overflowY: 'hidden',
            maxWidth: 2000
        }
    }));
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.children}
        </div>
    )
}
export default ViewWrapper;