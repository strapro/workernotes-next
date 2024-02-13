import React from 'react';

import { Text } from '@nextui-org/react';

import { Flex } from 'components/styles/flex';

interface Props {
	title: string;
	children?: React.ReactNode;
}

export const SidebarMenu = ({ title, children }: Props) => {
	return (
		<Flex css={{ gap: '$4' }} direction={'column'}>
			<Text
				span
				size={'$xs'}
				weight={'normal'}
				css={{
					letterSpacing: '0.04em',
					lineHeight: '$xs',
				}}
			>
				{title}
			</Text>
			{children}
		</Flex>
	);
};
