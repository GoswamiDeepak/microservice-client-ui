'use server';
import { parse } from 'cookie';
import { cookies } from 'next/headers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    //todo: do request validation
    // Request validation
    if (!email || !password) {
        throw new Error('Email and password are required.');
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //     throw new Error('Invalid email format.');
    // }

    // if (password.length < 6) {
    //     throw new Error('Password must be at least 6 characters long.');
    // }
    //call auth service
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            console.log('error', error);
            return {
                type: 'error',
                message: error.errors[0].message,
            };
        }

        const c = response.headers.getSetCookie();

        const accessToken = c.find((cookie) => cookie.includes('accessToken'));
        const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));

        if (!accessToken || !refreshToken) {
            return {
                type: 'error',
                message: 'No  cookies were found!',
            };
        }

        // const parsedAccessToken = accessToken.split(';')[0].split('=')[1]
        const parsedAccessToken = parse(accessToken);
        const parsedRefreshToken = parse(refreshToken);

        cookies().set({
            name: 'accessToken',
            value: parsedAccessToken.accessToken as string,
            expires: parsedAccessToken.Expires ? new Date(parsedAccessToken.Expires) : new Date(),
            httpOnly: parsedAccessToken.httpOnly === 'true' || true,
            path: parsedAccessToken.Path,
            domain: parsedAccessToken.Domain,
            sameSite: parsedAccessToken.SameSite?.toLowerCase() as 'strict' | 'lax' | 'none' | undefined,
        });

        cookies().set({
            name: 'refreshToken',
            value: parsedRefreshToken.refreshToken as string,
            expires: parsedRefreshToken.Expires ? new Date(parsedRefreshToken.Expires) : new Date(),
            httpOnly: parsedRefreshToken.httpOnly === 'true' || true,
            path: parsedRefreshToken.Path,
            domain: parsedRefreshToken.Domain,
            sameSite: parsedRefreshToken.SameSite?.toLowerCase() as 'strict' | 'lax' | 'none' | undefined,
        });
        return {
            type: 'success',
            message: 'Login successfull',
        };
    } catch (error: unknown) {
        console.log(error);
        return {
            type: 'error',
            message: (error as Error).message,
        };
    }
}
