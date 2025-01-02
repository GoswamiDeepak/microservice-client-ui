import { cookies } from "next/headers";
import {parse} from 'cookie';

export async function POST() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/refresh`,{
        method : 'POST',
        headers : {
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
            cookie: `refreshToken=${cookies().get('refreshToken')?.value}`
        }
    })

    if(!response.ok) {
        console.log('Refresh failed.')
        return Response.json({success: false})
    }

    const headerCookie = response.headers.getSetCookie()

    const accessToken = headerCookie.find((cookie)=>cookie.includes('accessToken'));
    const refreshToken = headerCookie.find((cookie)=> cookie.includes('refreshToken'));

    if(!accessToken || !refreshToken) {
        return Response.json({
            success: false,
        })
    }

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

    return Response.json({
        success: true,
    })

}