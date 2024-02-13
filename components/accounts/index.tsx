import React, { useCallback, useEffect, useState } from 'react';
import { PiTableBold } from 'react-icons/pi';

import { Button, Input, Text } from '@nextui-org/react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

import { columns } from 'components/accounts/_data';
import { ModalAddUser } from 'components/accounts/modal-add-user';
import { Table } from 'components/accounts/table';
import { Breadcrumbs } from 'components/breadcrumbs/breadcrumbs';
import { Flex } from 'components/styles/flex';

import { Database, Worker } from 'types/database';

export const Accounts = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Array<Worker>>([]);

	const supabase = createClientComponentClient<Database>();

	const user = useUser();

	const getAccounts = useCallback(async () => {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from('workers')
				.select('*, departments (*), levels (*)')
				.eq('manager_id', user?.id);

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setData(data);
			}
		} catch (error) {
			alert('Error loading accounts');
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getAccounts();
	}, [getAccounts]);

	return (
		<Flex
			css={{
				mt: '$5',
				px: '$6',
				'@sm': {
					mt: '$10',
					px: '$16',
				},
			}}
			justify={'center'}
			direction={'column'}
		>
			<Breadcrumbs />

			<Text h3>All Accounts</Text>
			<Flex css={{ gap: '$8' }} align={'center'} justify={'between'} wrap={'wrap'}>
				<Flex
					css={{
						gap: '$6',
						flexWrap: 'wrap',
						'@sm': { flexWrap: 'nowrap' },
					}}
					align={'center'}
				>
					<Input css={{ width: '100%', maxW: '410px' }} placeholder="Search users" />
				</Flex>
				<Flex
					direction={'row'}
					css={{
						gap: '$6',
						svg: {
							color: '$primarySolidContrast',
							height: '1.7em',
							width: 'auto',
						},
					}}
					wrap={'wrap'}
				>
					<ModalAddUser />
					<Button auto iconRight={<PiTableBold />}>
						Export to CSV
					</Button>
				</Flex>
			</Flex>

			{!loading && <Table users={data} columns={columns} />}
		</Flex>
	);
};
