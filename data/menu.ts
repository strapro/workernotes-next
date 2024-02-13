import { PiCode, PiKanbanFill, PiUserSquareFill, PiWalletFill } from 'react-icons/pi';

import { Menu } from 'types/menu';

export const menu: Menu = [
	{
		type: 'item',
		title: 'Home',
		href: '/dashboard',
		icon: PiKanbanFill,
	},
	{
		type: 'group',
		title: 'Main Menu',
		items: [
			{
				type: 'item',
				title: 'Accounts',
				href: '/dashboard/accounts',
				icon: PiUserSquareFill,
			},
			{
				type: 'collapse',
				title: 'Balances',
				icon: PiWalletFill,
				items: [
					{
						type: 'item',
						title: 'Banks Accounts',
						href: 'dashboard/balances/bank_accounts',
					},
					{
						type: 'item',
						title: 'Credit Cards',
						href: 'dashboard/balances/credit_cards',
					},
					{
						type: 'item',
						title: 'Loans',
						href: 'dashboard/balances/loans',
					},
				],
			},
		],
	},
	{
		type: 'group',
		title: 'General',
		items: [
			{
				type: 'item',
				title: 'Developers',
				href: '/dashboard/developers',
				icon: PiCode,
			},
		],
	},
];
