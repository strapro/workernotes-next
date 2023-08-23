import { IconType } from 'react-icons';

export interface MenuItem {
	type: 'item';
	title: string;
	href: string;
	icon?: IconType;
}

export interface MenuCollapsible {
	type: 'collapse';
	title: string;
	icon?: IconType;
	items: Array<MenuItem>;
}

export interface MenuGroup {
	type: 'group';
	title: string;
	items: Array<MenuItem | MenuCollapsible>;
}

export type Menu = Array<MenuItem | MenuCollapsible | MenuGroup>;
