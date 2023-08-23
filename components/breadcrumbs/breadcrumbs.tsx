import Link from 'next/link';
import { useRouter } from 'next/router';

import { Text } from '@nextui-org/react';
import React from 'react';

import { menu } from '../../data/menu';
import { Menu, MenuItem } from '../../types/menu';
import { Breadcrumb, Crumb, CrumbLink } from './breadcrumbs.styles';

export const Breadcrumbs = () => {
	const router = useRouter();

	const getMenuItems = (menu: Menu): Array<MenuItem> => {
		return menu.reduce((acc, item) => {
			switch (item.type) {
				case 'item': {
					return acc.concat([item as MenuItem]);
				}
				case 'group': {
					return acc.concat(getMenuItems(item.items));
				}
				case 'collapse': {
					return acc.concat(getMenuItems(item.items));
				}
				default:
					return acc;
			}
		}, [] as Array<MenuItem>);
	};

	const flatMenuItems = getMenuItems(menu);

	const breadcrumbs = React.useMemo(
		function generateBreadcrumbs() {
			// Remove any query parameters, as those aren't included in breadcrumbs
			const asPathWithoutQuery = router.asPath.split('?')[0];

			// Break down the path between "/"s, removing empty entities
			// Ex:"/my/nested/path" --> ["my", "nested", "path"]
			const asPathNestedRoutes = asPathWithoutQuery.split('/').filter(v => v.length > 0);

			// Iterate over the list of nested route parts and builda "crumb" object for each one.
			const crumblist = asPathNestedRoutes.map((subpath, idx) => {
				const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');

				return flatMenuItems.find(item => item.href === href)!;
			});

			return crumblist;
		},
		[router.asPath]
	);

	return (
		<Breadcrumb
			css={{
				svg: {
					color: '$accents6',
					height: '1.2em',
					width: 'auto',
				},
			}}
		>
			{breadcrumbs.map((crumb, idx) => (
				<Crumb key={idx}>
					{crumb.icon!({})}
					<Link href={crumb.href}>
						<CrumbLink href="#">{crumb.title}</CrumbLink>
					</Link>
					{idx < breadcrumbs.length - 1 && <Text>/</Text>}
				</Crumb>
			))}
		</Breadcrumb>
	);
};
