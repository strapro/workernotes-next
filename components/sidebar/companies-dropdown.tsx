import React from 'react';
import { PiGooglePodcastsLogoBold } from 'react-icons/pi';

import { Text } from '@nextui-org/react';

import { Box } from 'components/styles/box';
import { Flex } from 'components/styles/flex';

interface Company {
	name: string;
	location: string;
	logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
	return (
		<Box>
			<Flex align={'center'} css={{ gap: '$7', svg: { height: '1.7em', width: 'auto' } }}>
				<PiGooglePodcastsLogoBold />
				<Box>
					<Text
						h3
						size={'$xl'}
						weight={'medium'}
						css={{
							m: 0,
							color: '$accents9',
							lineHeight: '$lg',
							mb: '-$5',
						}}
					>
						Acme Co.
					</Text>
					<Text span weight={'medium'} size={'$xs'} css={{ color: '$accents8' }}>
						Palo Alto, CA
					</Text>
				</Box>
			</Flex>
		</Box>
	);
};
