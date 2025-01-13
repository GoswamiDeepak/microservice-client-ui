'use server'; // Indicates that this is a server-side function (Next.js feature)

import { cookies } from 'next/headers'; // Utility to manage cookies in Next.js

// Logout function to handle user logout
export const logout = async () => {
    // Send a POST request to the backend logout endpoint
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/logout`, {
        method: 'POST',
        headers: {
            // Include the access token in the Authorization header
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
            // Include the refresh token in the cookie header
            cookie: `refreshToken=${cookies().get('refreshToken')?.value}`,
        },
    });

    // Handle non-successful responses
    if (!response.ok) {
        console.log(`Logout failed ${response.status}`); // Log the error status
        return false; // Return false to indicate logout failure
    }

    // Delete the accessToken and refreshToken cookies
    cookies().delete('accessToken');
    cookies().delete('refreshToken');

    return true; // Return true to indicate successful logout
};