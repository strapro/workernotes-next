import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { NextUIProvider, createTheme } from '@nextui-org/react';
import { Session, createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

import '../styles/globals.css';
import { Database } from '../types/database';

export type NextPageWithLayout<P = { initialSession: Session }, IP = P> = NextPage<
	P,
	IP
> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ initialSession: Session }> & {
	Component: NextPageWithLayout;
};

const lightTheme = createTheme({
	type: 'light',
	theme: {
		colors: {},
	},
});

const darkTheme = createTheme({
	type: 'dark',
	theme: {
		colors: {},
	},
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

	const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

	return (
		<SessionContextProvider supabaseClient={supabaseClient}>
			<NextThemesProvider
				defaultTheme="system"
				attribute="class"
				value={{
					light: lightTheme.className,
					dark: darkTheme.className,
				}}
			>
				<NextUIProvider>{getLayout(<Component {...pageProps} />)}</NextUIProvider>
			</NextThemesProvider>
		</SessionContextProvider>
	);
}

export default MyApp;
