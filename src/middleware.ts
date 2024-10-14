import { TUser } from '@/types/allTypes';
import { verifyToken } from '@/utils/verifyToken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
    const token = cookies().get('token')?.value;
    const user = verifyToken(token!) as TUser;

    if (!token || user.userRole !== 'admin') {
        const url = req.url.replace(req.nextUrl.pathname, '/signin');
        return Response.redirect(url);
    }
};

export const config = { matcher: ['/admin-dashboard/:path*'] };