import { useRouter } from 'next/router';

import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import { User } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import React, { Key } from 'react';

import { DarkModeSwitch } from './darkmodeswitch';

export const UserDropdown = () => {
	const supabaseClient = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

	const logout = async () => {
		const { error } = await supabaseClient.auth.signOut();

		if (!error) {
			router.push('/login');
		}
	};

	const menuItemClicked = (actionKey: Key) => {
		console.log({ actionKey });

		if (actionKey === 'logout') {
			logout();
		}
	};

	return (
		<Dropdown placement="bottom-right">
			<Navbar.Item>
				<Dropdown.Trigger>
					<Avatar
						bordered
						as="button"
						color="secondary"
						size="md"
						src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
					/>
				</Dropdown.Trigger>
			</Navbar.Item>
			<Dropdown.Menu aria-label="User menu actions" onAction={menuItemClicked}>
				<Dropdown.Item key="profile" css={{ height: '$18' }}>
					<Text b color="inherit" css={{ d: 'flex' }}>
						Signed in as
					</Text>
					<Text b color="inherit" css={{ d: 'flex' }}>
						{user?.email}
					</Text>
				</Dropdown.Item>
				<Dropdown.Item key="settings" withDivider>
					My Settings
				</Dropdown.Item>
				<Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
				<Dropdown.Item key="analytics" withDivider>
					Analytics
				</Dropdown.Item>
				<Dropdown.Item key="system">System</Dropdown.Item>
				<Dropdown.Item key="configurations">Configurations</Dropdown.Item>
				<Dropdown.Item key="help_and_feedback" withDivider>
					Help & Feedback
				</Dropdown.Item>
				<Dropdown.Item key="logout" withDivider color="error">
					Log Out
				</Dropdown.Item>
				<Dropdown.Item key="switch" withDivider>
					<DarkModeSwitch />
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};
