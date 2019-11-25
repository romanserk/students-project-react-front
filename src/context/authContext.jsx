import React from 'react';

const authContext = React.createContext({
    userLoggedIn: false,
    userData: {},
    setUserLoggedIn: () => { }
})

export default authContext