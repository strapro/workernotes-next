import React, { Fragment } from 'react';

import { useRouter } from 'next/router';

import { CollapseItems } from 'components/sidebar/collapse-items';
import { SidebarItem } from 'components/sidebar/sidebar-item';
import { SidebarMenu } from 'components/sidebar/sidebar-menu';

import { menu } from 'data/menu';

import { Menu } from 'types/menu';

export const SidebarBody = () => {
	const router = useRouter();
	const renderMenu = (items: Menu) => {
		return items.map(item => {
			switch (item.type) {
				case 'item':
					return (
						<SidebarItem
							title={item.title}
							icon={item.icon!({})}
							isActive={router.pathname === item.href}
							href={item.href}
						/>
					);
				case 'group':
					return <SidebarMenu title="Main Menu">{renderMenu(item.items)}</SidebarMenu>;
				case 'collapse':
					return (
						<CollapseItems icon={item.icon!({})} items={item.items} title={item.title} />
					);
				default:
					return null;
			}
		});
	};

	return <Fragment>{renderMenu(menu)}</Fragment>;
};
