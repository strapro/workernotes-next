import { Text } from '@nextui-org/react';
import React from 'react';

import { useSidebarContext } from '../../layout/layout-context';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { CompaniesDropdown } from './companies-dropdown';
import { SidebarBody } from './sidebar-body';
import { Sidebar } from './sidebar.styles';

export const SidebarWrapper = () => {
	const { collapsed, setCollapsed } = useSidebarContext();

	return (
		<Box
			as="aside"
			css={{
				height: '100vh',
				zIndex: 202,
				position: 'sticky',
				top: '0',
			}}
		>
			{collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

			<Sidebar collapsed={collapsed}>
				<Sidebar.Header>
					<CompaniesDropdown />
				</Sidebar.Header>
				<Flex
					direction={'column'}
					justify={'between'}
					css={{
						height: '100%',
						svg: { height: '1.7em', width: 'auto', color: '$accents6' },
					}}
				>
					<Sidebar.Body className="body sidebar">
						<SidebarBody />
					</Sidebar.Body>
					<Sidebar.Footer>
						<Text small>Copyright 2023</Text>
					</Sidebar.Footer>
				</Flex>
			</Sidebar>
		</Box>
	);
};
