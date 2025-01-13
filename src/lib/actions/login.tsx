'use server'; // Indicates that this is a server-side function (Next.js)

import { parse } from 'cookie'; // Utility to parse cookie strings
import { cookies } from 'next/headers'; // Utility to manage cookies in Next.js

// Login function to handle user authentication
export default async function login(prevState: any, formData: FormData) {
    // Extract email and password from the form data
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Request validation: Ensure email and password are provided
    if (!email || !password) {
        throw new Error('Email and password are required.');
    }

    // Call the authentication service
    try {
        // Send a POST request to the backend login endpoint
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({ email, password }), // Send email and password in the request body
        });

        // Handle non-successful responses
        if (!response.ok) {
            const error = await response.json(); // Parse the error response
            console.log('error', error);
            return {
                type: 'error',
                message: error.errors[0].message, // Return the first error message
            };
        }

        // Extract cookies from the response headers
        const c = response.headers.getSetCookie();

        // Find the accessToken and refreshToken cookies
        const accessToken = c.find((cookie) => cookie.includes('accessToken'));
        const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));

        // Handle missing cookies
        if (!accessToken || !refreshToken) {
            return {
                type: 'error',
                message: 'No cookies were found!',
            };
        }

        // Parse the accessToken and refreshToken cookies
        const parsedAccessToken = parse(accessToken);
        const parsedRefreshToken = parse(refreshToken);

        // Set the accessToken cookie in the browser
        cookies().set({
            name: 'accessToken',
            value: parsedAccessToken.accessToken as string, // Cookie value
            expires: parsedAccessToken.Expires ? new Date(parsedAccessToken.Expires) : new Date(), // Expiration date
            httpOnly: parsedAccessToken.httpOnly === 'true' || true, // HTTP-only flag
            path: parsedAccessToken.Path, // Cookie path
            domain: parsedAccessToken.Domain, // Cookie domain
            sameSite: parsedAccessToken.SameSite?.toLowerCase() as 'strict' | 'lax' | 'none' | undefined, // SameSite attribute
        });

        // Set the refreshToken cookie in the browser
        cookies().set({
            name: 'refreshToken',
            value: parsedRefreshToken.refreshToken as string, // Cookie value
            expires: parsedRefreshToken.Expires ? new Date(parsedRefreshToken.Expires) : new Date(), // Expiration date
            httpOnly: parsedRefreshToken.httpOnly === 'true' || true, // HTTP-only flag
            path: parsedRefreshToken.Path, // Cookie path
            domain: parsedRefreshToken.Domain, // Cookie domain
            sameSite: parsedRefreshToken.SameSite?.toLowerCase() as 'strict' | 'lax' | 'none' | undefined, // SameSite attribute
        });

        // Return success message
        return {
            type: 'success',
            message: 'Login successful',
        };
    } catch (error: unknown) {
        // Handle unexpected errors
        console.log(error);
        return {
            type: 'error',
            message: (error as Error).message, // Return the error message
        };
    }
}
