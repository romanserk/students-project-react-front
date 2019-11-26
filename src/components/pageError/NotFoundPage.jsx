import React from 'react'
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


const NotFoundPage = () => {

    return (
        <>
            <Alert variant="danger" ><h1 style={{ marginLeft: "calc(50% - 100px)" }}>page not found</h1></Alert>
            <Link
                to={{
                    pathname: '/'
                }}
                className="h5"
                style={{ marginLeft: "calc(50% - 20px)" }}
            >
                Back Home
            </Link>
        </>
    )

}

export default NotFoundPage