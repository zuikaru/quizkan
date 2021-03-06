import React, { useState, useEffect, useContext, createContext } from 'react';
import nookies from 'nookies';
import axios from 'axios';

import {
    firebase as firebaseClient,
    syncDeviceToken,
} from '../services/firebase/client';
import { useRootStore } from 'stores/stores';

const AuthContext = createContext<{
    user: firebaseClient.User | null;
    loading: boolean;
    claims: any;
}>({
    user: null,
    loading: true,
    claims: {},
});

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<firebaseClient.User | null>(null);
    const [loading, setLoading] = useState(true);
    const [claims, setClaims] = useState({});
    const rootStore = useRootStore();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).nookies = nookies;
        }
        return firebaseClient.auth().onIdTokenChanged(async (user) => {
            console.log(`token changed!`);
            if (!user) {
                console.log(`no token found...`);
                setUser(null);
                nookies.destroy(null, 'token');
                nookies.set(null, 'token', '', {
                    path: '/',
                    domain: window.location.hostname,
                });
                if (loading) {
                    setLoading(false);
                }
                return;
            }

            console.log(`updating token...`);
            const token = await user.getIdToken();
            const claims = await user.getIdTokenResult();
            setUser(user);
            setClaims(claims.claims);
            // Update token
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            rootStore.webSocketStore.setToken(token);
            console.log('Updated token for web socket');
            // Sync data
            axios
                .patch(`/users/${user.uid}`, {
                    displayName: user.displayName,
                    email: user.email,
                })
                .catch((error) => {
                    console.warn(
                        'Failed to sync user profile with the server.',
                    );
                });
            // Update device token
            if (localStorage.getItem('deviceToken')) {
                syncDeviceToken(localStorage.getItem('deviceToken'));
            }
            nookies.destroy(null, 'token');
            nookies.set(null, 'token', token, {
                path: '/',
                domain: window.location.hostname,
            });
            if (loading) {
                setLoading(false);
            }
        });
    }, []);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            console.log(`refreshing token...`);
            const user = firebaseClient.auth().currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);
        return () => clearInterval(handle);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, claims }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};
