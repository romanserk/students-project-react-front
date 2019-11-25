import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const MySpinner = () => {
    return (
        <div style={{ position: 'relative', width: "200px", height: "30px", marginTop: "calc(20% - 55px)", marginLeft: 'calc(50% - 100px)' }}>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
        </div>
    )
}

export default MySpinner