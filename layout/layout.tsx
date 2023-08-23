import { Session } from '@supabase/auth-helpers-nextjs';
import { useSessionContext } from '@supabase/auth-helpers-react';
import React from 'react';

import { NavbarWrapper } from '../components/navbar/navbar';
import { SidebarWrapper } from '../components/sidebar/sidebar';
import { Box } from '../components/styles/box';
import { useLockedBody } from '../hooks/useBodyLock';
import { SidebarContext } from './layout-context';
import { WrapperLayout } from './layout.styles';

interface Props {
	children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
	const sessionContext = useSessionContext();
	const [sidebarOpen, setSidebarOpen] = React.useState(false);
	const [_, setLocked] = useLockedBody(false);
	const handleToggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
		setLocked(!sidebarOpen);
	};

	if (sessionContext.isLoading) {
		return null;
	}

	return (
		<SidebarContext.Provider
			value={{
				collapsed: sidebarOpen,
				setCollapsed: handleToggleSidebar,
			}}
		>
			<WrapperLayout>
				<SidebarWrapper />
				<Box
					css={{
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						flex: '1 1 auto',
						overflowY: 'auto',
						overflowX: 'hidden',
					}}
				>
					<NavbarWrapper></NavbarWrapper>
					{children}
				</Box>
			</WrapperLayout>
		</SidebarContext.Provider>
	);
};
