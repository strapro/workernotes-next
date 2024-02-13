import { User } from '@nextui-org/react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database, Worker } from 'types/database';

interface Props {
	user: Worker;
}

export const TableNameCell = ({ user }: Props) => {
	const supabase = createClientComponentClient<Database>();
	const profilePic = supabase.storage
		.from('worker-profile-pics')
		.getPublicUrl(user.profile_pic!).data.publicUrl;

	return (
		<User
			bordered
			color="gradient"
			src={profilePic}
			name={`${user.first_name}  ${user.last_name}`}
			css={{ p: 0 }}
		>
			{user.email}
		</User>
	);
};
