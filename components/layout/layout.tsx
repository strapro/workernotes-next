import { Session } from '@supabase/auth-helpers-nextjs';
import React from 'react';

import { useLockedBody } from '../hooks/useBodyLock';
import { NavbarWrapper } from '../navbar/navbar';
import { SidebarWrapper } from '../sidebar/sidebar';
import { Box } from '../styles/box';
import { SidebarContext } from './layout-context';
import { WrapperLayout } from './layout.styles';

interface Props {
	initialSession: Session;
	children: React.ReactNode;
}

export const Layout = ({ initialSession, children }: Props) => {
	const [sidebarOpen, setSidebarOpen] = React.useState(false);
	const [_, setLocked] = useLockedBody(false);
	const handleToggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
		setLocked(!sidebarOpen);
	};

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
					<NavbarWrapper user={initialSession?.user}></NavbarWrapper>
					{children}
				</Box>
			</WrapperLayout>
		</SidebarContext.Provider>
	);
};
