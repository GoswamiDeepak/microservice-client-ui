import { cookies } from "next/headers"

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: 'admin'|'customer'|'manager';
    tenant: number | null;
}

interface Session {
    user: User
}

export const getSession = async (): Promise<Session | null> => {
    return await getSelf()
}
const getSelf = async (): Promise<Session | null> => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/self`,{
        headers : {
            // 'Content-Type' : 'application/json',
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`
        }
    })
    // console.log('accessToken',cookies().get('accessToken')?.value)
    if(!response.ok) {
        return null
    }
    return {
        user : await response.json() as User
    }
}