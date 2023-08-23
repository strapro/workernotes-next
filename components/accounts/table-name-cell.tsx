import { User } from '@nextui-org/react';

import { users } from './data';

interface Props {
	user: (typeof users)[number];
}

export const TableNameCell = ({ user }: Props) => {
	return (
		<User squared src={user.avatar} name={user.name} css={{ p: 0 }}>
			{user.email}
		</User>
	);
};
