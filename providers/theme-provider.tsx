import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

import { NextUIProvider, createTheme } from '@nextui-org/react';

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

const ThemeProvider = ({ children }: PropsWithChildren) => {
	return (
		<NextThemesProvider
			defaultTheme="system"
			attribute="class"
			value={{
				light: lightTheme.className,
				dark: darkTheme.className,
			}}
		>
			<NextUIProvider>{children}</NextUIProvider>
		</NextThemesProvider>
	);
};

export default ThemeProvider;
