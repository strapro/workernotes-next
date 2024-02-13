import React from 'react';

import { Text } from '@nextui-org/react';

import { Sidebar } from 'components/sidebar/_styles';
import { CompaniesDropdown } from 'components/sidebar/companies-dropdown';
import { SidebarBody } from 'components/sidebar/sidebar-body';
import { Box } from 'components/styles/box';
import { Flex } from 'components/styles/flex';

import { useSidebarContext } from 'layout/layout-context';

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
