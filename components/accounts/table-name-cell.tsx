import { User } from '@nextui-org/react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database, Worker } from 'types/database';

interface Props {
	worker: Worker;
}

export const TableNameCell = ({ worker }: Props) => {
	const supabase = createClientComponentClient<Database>();
	const profilePic = supabase.storage
		.from('worker-profile-pics')
		.getPublicUrl(worker.profile_pic!).data.publicUrl;

	return (
		<User
			bordered
			color="gradient"
			src={profilePic}
			name={`${worker.first_name}  ${worker.last_name}`}
			css={{ p: 0 }}
		>
			{worker.email}
		</User>
	);
};
