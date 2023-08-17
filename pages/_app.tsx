import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

import ThemeProvider from '../providers/theme-provider';
import '../styles/globals.css';
import { Database } from '../types/database';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
	const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

	const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

	return (
		<SessionContextProvider supabaseClient={supabaseClient}>
			<ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
		</SessionContextProvider>
	);
};

export default MyApp;
