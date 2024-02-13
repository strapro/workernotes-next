import React from 'react';
import { PiUsersThreeBold } from 'react-icons/pi';

import { Card, Text } from '@nextui-org/react';

import { Box } from 'components/styles/box';
import { Flex } from 'components/styles/flex';

export const CardBalance2 = () => {
	return (
		<Card
			css={{
				mw: '375px',
				bg: '$accents0',
				borderRadius: '$xl',
				px: '$6',
			}}
		>
			<Card.Body css={{ py: '$10' }}>
				<Flex
					css={{
						gap: '$5',
						svg: {
							height: '1.7em',
							width: 'auto',
						},
					}}
				>
					<PiUsersThreeBold />
					<Flex direction={'column'}>
						<Text span css={{ color: '' }}>
							Healt Insurance
						</Text>
						<Text span size={'$xs'}>
							+2400 People
						</Text>
					</Flex>
				</Flex>
				<Flex css={{ gap: '$6', py: '$4' }} align={'center'}>
					<Text span size={'$xl'} weight={'semibold'}>
						$12,138
					</Text>
					<Text span css={{ color: '$red600' }} size={'$xs'}>
						+ 4.5%
					</Text>
				</Flex>
				<Flex css={{ gap: '$12' }} align={'center'}>
					<Box>
						<Text span size={'$xs'} css={{ color: '$green600' }} weight={'semibold'}>
							{'↓'}
						</Text>
						<Text span size={'$xs'}>
							11,930 USD
						</Text>
					</Box>
					<Box>
						<Text span size={'$xs'} css={{ color: '$red600' }} weight={'semibold'}>
							{'↑'}
						</Text>
						<Text span size={'$xs'}>
							54,120 USD
						</Text>
					</Box>
					<Box>
						<Text span size={'$xs'} css={{ color: '$green600' }} weight={'semibold'}>
							{'⭐'}
						</Text>
						<Text span size={'$xs'}>
							150 VIP
						</Text>
					</Box>
				</Flex>
			</Card.Body>
		</Card>
	);
};
