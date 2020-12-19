import React, {useState, useEffect, useContext, createContext} from 'react';
import {createUser} from './db';
import firebase from './firebase';
const authContext = createContext();

export function AuthProvider({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);
            createUser(user.uid, user);
            setUser(user);
            return user;
        } else {
            setUser(false);
            return false;
        }
    };

    // console.log(`user: ${JSON.stringify(user)}`);
    const signinWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => {
                handleUser(response.user);
                return response.user;
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                handleUser(false);
            });
    };
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signout,
    };
}

const formatUser = (user) => {
    console.log(`user: ${JSON.stringify(user, null, 2)}`);
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    };
};
