import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
    const token = cookies().get('accessToken')?.value;
    const user = cookies().get('user')?.value;

    if (!token || !user) {
        const url = req.url.replace(req.nextUrl.pathname, '/signin');
        return Response.redirect(url);
    }
};

export const config = { matcher: ['/dashboard/:path*'] };