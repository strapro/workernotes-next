import React, { useState } from 'react';
import { PiCaretUpBold } from 'react-icons/pi';

import Link from 'next/link';

import { Collapse, Text } from '@nextui-org/react';

import { Flex } from 'components/styles/flex';

import { MenuItem } from 'types/menu';

interface Props {
	icon: React.ReactNode;
	title: string;
	items: Array<MenuItem>;
}

export const CollapseItems = ({ icon, items, title }: Props) => {
	const [open, setOpen] = useState(false);

	const handleToggle = () => setOpen(!open);
	return (
		<Flex
			css={{
				gap: '$6',
				height: '100%',
				alignItems: 'center',
				cursor: 'pointer',
			}}
			align={'center'}
		>
			<Collapse
				title={
					<Flex
						css={{
							gap: '$6',
							width: '100%',
							py: '$5',
							px: '$7',
							borderRadius: '8px',
							transition: 'all 0.15s ease',
							'&:active': {
								transform: 'scale(0.98)',
							},
							'&:hover': {
								bg: '$accents2',
							},
							svg: {
								'&.collapse-trigger': {
									height: '1.2em',
									width: 'auto',
									marginTop: '4px',
									transition: 'transform 0.3s ease',
									transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
								},
							},
							svg: {
								'&.collapse-trigger': {
									height: '1.2em',
									width: 'auto',
									marginTop: '4px',
									transition: 'transform 0.3s ease',
									transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
								},
							},
						}}
						justify={'between'}
						onClick={handleToggle}
					>
						<Flex css={{ gap: '$6' }}>
							{icon}
							<Text
								span
								weight={'normal'}
								size={'$base'}
								css={{
									color: '$accents9',
								}}
							>
								{title}
							</Text>
						</Flex>

						<PiCaretUpBold className="collapse-trigger" />
					</Flex>
				}
				css={{
					width: '100%',
					'& .nextui-collapse-view': {
						p: '0',
					},
					'& .nextui-collapse-content': {
						marginTop: '$1',
						padding: '0px',
					},
				}}
				divider={false}
				showArrow={false}
			>
				{items.map((item, index) => (
					<Flex
						key={index}
						direction={'column'}
						css={{
							paddingLeft: '$16',
						}}
					>
						<Text
							span
							weight={'normal'}
							size={'$md'}
							css={{
								color: '$accents8',
								cursor: 'pointer',
								'&:hover': {
									color: '$accents9',
								},
							}}
						>
							<Link href={item.href}>{item.title}</Link>
						</Text>
					</Flex>
				))}
			</Collapse>
		</Flex>
	);
};
