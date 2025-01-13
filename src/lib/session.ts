import { cookies } from "next/headers";

// Define the User interface
interface User {
    id: number; // Unique identifier for the user
    firstname: string; // User's first name
    lastname: string; // User's last name
    email: string; // User's email address
    role: 'admin' | 'customer' | 'manager'; // User's role (admin, customer, or manager)
    tenant: number | null; // Tenant ID associated with the user (if any)
}

// Define the Session interface
interface Session {
    user: User; // Session contains a User object
}

// Function to get the current session
export const getSession = async (): Promise<Session | null> => {
    return await getSelf(); // Calls the getSelf function to fetch session data
};

// Function to fetch the current user's session data from the backend
const getSelf = async (): Promise<Session | null> => {
    // Fetch the user's session data from the backend API
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/self`, {
        headers: {
            // Include the access token from cookies in the request headers
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
        },
    });

    // If the response is not OK (e.g., unauthorized or server error), return null
    if (!response.ok) {
        return null;
    }

    // Parse the response JSON and return it as a Session object
    return {
        user: (await response.json()) as User,
    };
};