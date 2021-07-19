import React, { useEffect } from 'react';

const RedirectComponent = (props) => {

    useEffect(() => {
        if (props.data.admin != null) {
            document.location.href = '/admin';
        } else {
            document.location.href = '/dashboard';
        }
    }, []);

    return (<div></div>);

}
export default RedirectComponent;