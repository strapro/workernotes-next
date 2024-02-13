import React from 'react';

import dynamic from 'next/dynamic';
import NextLink from 'next/link';

import { Link, Text } from '@nextui-org/react';

import { columns, users } from 'components/accounts/_data';
import { Table } from 'components/accounts/table';
import { CardAgents } from 'components/home/card-agents';
import { CardBalance1 } from 'components/home/card-balance1';
import { CardBalance2 } from 'components/home/card-balance2';
import { CardBalance3 } from 'components/home/card-balance3';
import { CardTransactions } from 'components/home/card-transactions';
import { Box } from 'components/styles/box';
import { Flex } from 'components/styles/flex';

const Chart = dynamic(() => import('components/charts/steam').then(mod => mod.Steam), {
	ssr: false,
});

export const Content = () => {
	return (
		<Box css={{ overflow: 'hidden', height: '100%' }}>
			<Flex
				css={{
					gap: '$8',
					pt: '$5',
					height: 'fit-content',
					flexWrap: 'wrap',
					'@lg': {
						flexWrap: 'nowrap',
					},
					'@sm': {
						pt: '$10',
					},
				}}
				justify={'center'}
			>
				<Flex
					css={{
						px: '$12',
						mt: '$8',
						'@xsMax': { px: '$10' },
						gap: '$12',
					}}
					direction={'column'}
				>
					{/* Card Section Top */}
					<Box>
						<Text
							h3
							css={{
								textAlign: 'center',
								'@sm': {
									textAlign: 'inherit',
								},
							}}
						>
							Available Balance
						</Text>
						<Flex
							css={{
								gap: '$10',
								flexWrap: 'wrap',
								justifyContent: 'center',
								'@sm': {
									flexWrap: 'nowrap',
								},
							}}
							direction={'row'}
						>
							<CardBalance1 />
							<CardBalance2 />
							<CardBalance3 />
						</Flex>
					</Box>

					{/* Chart */}
					<Box>
						<Text
							h3
							css={{
								textAlign: 'center',
								'@lg': {
									textAlign: 'inherit',
								},
							}}
						>
							Statistics
						</Text>
						<Box
							css={{
								width: '100%',
								backgroundColor: '$accents0',
								boxShadow: '$lg',
								borderRadius: '$2xl',
								px: '$10',
								py: '$10',
							}}
						>
							<Chart />
						</Box>
					</Box>
				</Flex>

				{/* Left Section */}
				<Box
					css={{
						px: '$12',
						mt: '$8',
						height: 'fit-content',
						'@xsMax': { px: '$10' },
						gap: '$6',
						overflow: 'hidden',
					}}
				>
					<Text
						h3
						css={{
							textAlign: 'center',
							'@lg': {
								textAlign: 'inherit',
							},
						}}
					>
						Section
					</Text>
					<Flex
						direction={'column'}
						justify={'center'}
						css={{
							gap: '$8',
							flexDirection: 'row',
							flexWrap: 'wrap',
							'@sm': {
								flexWrap: 'nowrap',
							},
							'@lg': {
								flexWrap: 'nowrap',
								flexDirection: 'column',
							},
						}}
					>
						<CardAgents />
						<CardTransactions />
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
};
