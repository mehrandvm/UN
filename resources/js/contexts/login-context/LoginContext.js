import React from 'react';

// interface LoginContextValue {
//     token: string | null;
//     setToken: Function;
//     login: Function;
// }

export const LoginContext = React.createContext({
    token: null,
    setToken: () => {},
    login: () => {},
});
