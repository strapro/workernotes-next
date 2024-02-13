import React from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

import { Input, Link, Navbar } from '@nextui-org/react';

import { BurguerButton } from 'components/navbar/burguer-button';
import { NotificationsDropdown } from 'components/navbar/notifications-dropdown';
import { UserDropdown } from 'components/navbar/user-dropdown';

export const NavbarWrapper = () => {
	const collapseItems = [
		'Profile',
		'Dashboard',
		'Activity',
		'Analytics',
		'System',
		'Deployments',
		'My Settings',
		'Team Settings',
		'Help & Feedback',
		'Log Out',
	];
	return (
		<Navbar
			isBordered
			css={{
				borderBottom: '1px solid $border',
				justifyContent: 'space-between',
				width: '100%',
				'@md': {
					justifyContent: 'space-between',
				},

				'& .nextui-navbar-container': {
					border: 'none',
					maxWidth: '100%',

					gap: '$6',
					'@md': {
						justifyContent: 'space-between',
					},
				},
			}}
		>
			<Navbar.Content showIn="md">
				<BurguerButton />
			</Navbar.Content>
			<Navbar.Content
				hideIn={'md'}
				css={{
					width: '70%',
					svg: {
						color: '$accents6',
					},
				}}
			>
				<Input
					clearable
					contentLeft={<PiMagnifyingGlassBold />}
					contentLeftStyling={false}
					css={{
						w: '100%',
						transition: 'all 0.2s ease',
						'@xsMax': {
							w: '100%',
							// mw: '300px',
						},
						'& .nextui-input-content--left': {
							h: '100%',
							ml: '$4',
							dflex: 'center',
						},
					}}
					placeholder="Search..."
				/>
			</Navbar.Content>
			<Navbar.Content>
				<Navbar.Content>
					<NotificationsDropdown />
				</Navbar.Content>
				<Navbar.Content>
					<UserDropdown />
				</Navbar.Content>
			</Navbar.Content>

			<Navbar.Collapse>
				{collapseItems.map((item, index) => (
					<Navbar.CollapseItem
						key={item}
						activeColor="secondary"
						css={{
							color: index === collapseItems.length - 1 ? '$error' : '',
						}}
						isActive={index === 2}
					>
						<Link
							color="inherit"
							css={{
								minWidth: '100%',
							}}
							href="#"
						>
							{item}
						</Link>
					</Navbar.CollapseItem>
				))}
			</Navbar.Collapse>
		</Navbar>
	);
};
