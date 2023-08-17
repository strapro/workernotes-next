import Link from 'next/link';

import { Button, Input, Text } from '@nextui-org/react';
import React from 'react';
import { PiHouseFill, PiTableBold, PiUsersFill } from 'react-icons/pi';

import { Breadcrumbs, Crumb, CrumbLink } from '../breadcrumb/breadcrumb.styled';
import { Flex } from '../styles/flex';
import { TableWrapper } from '../table/table';
import { AddUser } from './add-user';

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
			<Breadcrumbs
				css={{
					svg: {
						color: '$accents6',
						height: '1.2em',
						width: 'auto',
					},
				}}
			>
				<Crumb>
					<PiHouseFill />
					<Link href={'/'}>
						<CrumbLink href="#">Home</CrumbLink>
					</Link>
					<Text>/</Text>
				</Crumb>

				<Crumb>
					<PiUsersFill />
					<CrumbLink href="#">Users</CrumbLink>
					<Text>/</Text>
				</Crumb>
				<Crumb>
					<CrumbLink href="#">List</CrumbLink>
				</Crumb>
			</Breadcrumbs>

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
							color: '$text',
							height: '1.7em',
							width: 'auto',
						},
					}}
					wrap={'wrap'}
				>
					<AddUser />
					<Button auto iconRight={<PiTableBold />}>
						Export to CSV
					</Button>
				</Flex>
			</Flex>

			<TableWrapper />
		</Flex>
	);
};
