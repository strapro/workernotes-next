import { Button, Input, Text } from '@nextui-org/react';
import React from 'react';
import { PiTableBold } from 'react-icons/pi';

import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { Flex } from '../styles/flex';
import { columns, users } from './data';
import { ModalAddUser } from './modal-add-user';
import { Table } from './table';

export const Accounts = () => {
	return (
		<Flex
			css={{
				mt: '$5',
				px: '$6',
				'@sm': {
					mt: '$10',
					px: '$16',
				},
			}}
			justify={'center'}
			direction={'column'}
		>
			<Breadcrumbs />

			<Text h3>All Accounts</Text>
			<Flex css={{ gap: '$8' }} align={'center'} justify={'between'} wrap={'wrap'}>
				<Flex
					css={{
						gap: '$6',
						flexWrap: 'wrap',
						'@sm': { flexWrap: 'nowrap' },
					}}
					align={'center'}
				>
					<Input css={{ width: '100%', maxW: '410px' }} placeholder="Search users" />
				</Flex>
				<Flex
					direction={'row'}
					css={{
						gap: '$6',
						svg: {
							color: '$primarySolidContrast',
							height: '1.7em',
							width: 'auto',
						},
					}}
					wrap={'wrap'}
				>
					<ModalAddUser />
					<Button auto iconRight={<PiTableBold />}>
						Export to CSV
					</Button>
				</Flex>
			</Flex>

			<Table users={users} columns={columns} />
		</Flex>
	);
};
