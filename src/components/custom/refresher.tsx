'use client';

import { useCallback, useEffect, useRef } from 'react';
import * as jose from 'jose';

const Refresher = ({ children }: { children: React.ReactNode }) => {
    const timeoutId = useRef<NodeJS.Timeout>();
    const getAccessToken = async () => {
        const res = await fetch('/api/auth/accessToken');
        if (!res.ok) {
            return;
        }
        const accessToken = await res.json();
        return accessToken.token;
    };

    const startRefresh = useCallback(async () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        try {
            const accessToken = await getAccessToken();

            if (!accessToken) {
                return null;
            }
            const token = await jose.decodeJwt(accessToken);
            const exp = token.exp! * 1000; //conver epoch time to milisecond
            const currentTime = Date.now();
            // const refreshTime = exp - currentTime;
            const refreshTime = exp - currentTime - 5000;

            console.log(`current time: ${new Date(currentTime).toISOString()}`);
            console.log(`Token expiry time: ${new Date(exp).toISOString()}`);
            console.log(`Scheduled refresh time: ${new Date(currentTime + refreshTime).toISOString()}`);
            timeoutId.current = setTimeout(() => {
                refreshAccessToken();
                console.log('Access Token is refreshed');
            }, refreshTime);
        } catch (error: unknown) {
            console.log(error as Error);
        }
    }, []);

    const refreshAccessToken = async () => {
        try {
            const res = await fetch('/api/auth/refresh', {
                method: 'POST',
            });
            if (!res.ok) {
                console.log('Faid to refresh access token');
            }
            const refreshData = await res.json();
            if (refreshData.success === false) return false;
        } catch (error: unknown) {
            console.log(error as Error);
        }
        startRefresh();
    };

    useEffect(() => {
        startRefresh();
        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [startRefresh, timeoutId]);
    return <>{children}</>;
};
export default Refresher;
