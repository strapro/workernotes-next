import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const requireLogin = async (req: NextRequest): Promise<NextResponse> => {
	// We need to create a response and hand it to the supabase client to be able to modify the response headers.
	const res = NextResponse.next();
	// Create authenticated Supabase Client.
	const supabase = createMiddlewareClient({ req, res });
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// Check auth condition
	if (session?.user !== undefined) {
		// Authentication successful, forward request to protected route.
		return res;
	}

	// Auth condition not met, redirect to home page.
	const redirectUrl = req.nextUrl.clone();

	redirectUrl.pathname = '/login';

	return NextResponse.redirect(redirectUrl);
};

const requireGuest = async (req: NextRequest): Promise<NextResponse> => {
	// We need to create a response and hand it to the supabase client to be able to modify the response headers.
	const res = NextResponse.next();
	// Create authenticated Supabase Client.
	const supabase = createMiddlewareClient({ req, res });
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// Check auth condition
	if (session === null) {
		// Authentication successful, forward request to protected route.
		return res;
	}

	// Auth condition not met, redirect to home page.
	const redirectUrl = req.nextUrl.clone();

	redirectUrl.pathname = '/dashboard';

	return NextResponse.redirect(redirectUrl);
};

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname.startsWith('/dashboard')) {
		return await requireLogin(req);
	}

	if (req.nextUrl.pathname.startsWith('/login')) {
		return await requireGuest(req);
	}
}

export const config = {
	matcher: ['/dashboard/:path*', '/login'],
};
