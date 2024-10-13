import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
    const token = cookies().get('token')?.value;
    console.log("token from middleware: ", token)
    // const user = cookies().get('user')?.value;

    if (!token) {
        const url = req.url.replace(req.nextUrl.pathname, '/signin');
        return Response.redirect(url);
    }
};

export const config = { matcher: ['/admin-dashboard/:path*'] };