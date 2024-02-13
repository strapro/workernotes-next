import React from 'react';

import { StyledBurgerButton } from 'components/navbar/_styles';

import { useSidebarContext } from 'layout/layout-context';

export const BurguerButton = () => {
	const { collapsed, setCollapsed } = useSidebarContext();

	return (
		<StyledBurgerButton open={collapsed} onClick={setCollapsed}>
			<div />
			<div />
		</StyledBurgerButton>
	);
};
