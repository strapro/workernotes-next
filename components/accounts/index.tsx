import { Ulid, Uuid4 } from 'id128';
import React, { useCallback, useEffect, useState } from 'react';
import { PiTableBold } from 'react-icons/pi';

import { useRouter } from 'next/router';

import { Button, Input, Text } from '@nextui-org/react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

import { columns } from 'components/accounts/_data';
import { ModalAddUser } from 'components/accounts/modal-add-user';
import { Table } from 'components/accounts/table';
import { Breadcrumbs } from 'components/breadcrumbs/breadcrumbs';
import { Flex } from 'components/styles/flex';

import { Database, Worker } from 'types/database';

const BASE_PATH = '/dashboard/accounts';

export const Accounts = () => {
	const supabase = createClientComponentClient<Database>();

	const [loading, setLoading] = useState(true);
	const [workers, setWorkers] = useState<Array<Worker>>([]);
	const [selectedWorker, setSelectedWorker] = useState<Worker>({} as Worker);
	const [selectedWorkerID, setSelectedWorkerId] = useState<string>();
	const [selectedAction, setSelectedAction] = useState<string>();

	const user = useUser();
	const router = useRouter();

	const getWorkers = useCallback(async () => {
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
				setWorkers(data);
			}
		} catch (error) {
			alert('Error loading workers');
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	const getWorker = useCallback(async () => {
		if (selectedWorkerID) {
			try {
				let { data, error, status } = await supabase
					.from('workers')
					.select('*, departments (*), levels (*)')
					.eq('manager_id', user?.id)
					.eq('id', selectedWorkerID)
					.single();

				if (error && status !== 406) {
					throw error;
				}

				if (data) {
					setSelectedWorker(data);
				}
			} catch (error) {
				alert('Error loading workers');
			}
		} else {
			setSelectedWorker({
				id: Uuid4.fromRaw(Ulid.generate().toRaw()).toCanonical(),
				first_name: null,
				last_name: null,
				email: null,
				status: null,
				department_id: null,
				level_id: null,
				manager_id: null,
				profile_pic: null,
				created_at: null,
				updated_at: null,
			});
		}
	}, [user, supabase, selectedWorkerID]);

	const saveWorker = useCallback(
		async (worker: Worker) => {
			let data, error, status;

			try {
				({ data, error, status } = await supabase.from('workers').insert({
					id: worker.id,
					first_name: worker.first_name,
					last_name: worker.last_name,
					email: worker.email,
					status: worker.status,
					department_id: worker.department_id,
					level_id: worker.level_id,
					manager_id: user?.id,
					profile_pic: null,
				}));

				if (error && status !== 406) {
					throw error;
				}
			} catch (error) {
				alert('Error saving worker');
			}
		},
		[user, supabase]
	);

	const updateWorker = useCallback(
		async (worker: Worker) => {
			let data, error, status;

			try {
				({ data, error, status } = await supabase
					.from('workers')
					.update({
						id: worker.id,
						first_name: worker.first_name,
						last_name: worker.last_name,
						email: worker.email,
						status: worker.status,
						department_id: worker.department_id,
						level_id: worker.level_id,
						manager_id: user?.id,
						profile_pic: null,
					})
					.eq('id', selectedWorkerID));

				if (error && status !== 406) {
					throw error;
				}
			} catch (error) {
				alert('Error saving worker');
			}
		},
		[user, supabase, selectedWorkerID]
	);

	useEffect(() => {
		getWorkers();
	}, [getWorkers]);

	useEffect(() => {
		getWorker();
	}, [getWorker]);

	useEffect(() => {
		if (!router.isReady) return;

		const [id, action] = (router.query.idAndAction as Array<string>) || [];

		setSelectedWorkerId(id);
		setSelectedAction(action);
	}, [router.isReady, router.query]);

	const closeHandler = () => {
		router.push(`${BASE_PATH}`, undefined, { shallow: true });
	};

	const saveHandler = (worker: Worker) => {
		selectedWorkerID ? updateWorker(worker) : saveWorker(worker);

		router.push(`${BASE_PATH}`, undefined, { shallow: true });
	};

	const viewHandler = (selectedId: string) => {
		router.push(`${BASE_PATH}/${selectedId}/view`, undefined, { shallow: true });

		return false;
	};

	const editHandler = (selectedId: string) => {
		router.push(`${BASE_PATH}/${selectedId}/edit`, undefined, { shallow: true });

		return false;
	};

	const deleteHandler = (selectedId: string) => {
		router.push(`${BASE_PATH}/${selectedId}/delete`);

		return false;
	};

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
					<Input
						aria-label="Search"
						css={{ width: '100%', maxW: '410px' }}
						placeholder="Search users"
					/>
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
					<ModalAddUser
						worker={selectedWorker}
						open={['new', 'edit'].includes(selectedAction!)}
						onClose={closeHandler}
						onSave={saveHandler}
					/>
					<Button auto iconRight={<PiTableBold />}>
						Export to CSV
					</Button>
				</Flex>
			</Flex>

			{!loading && (
				<Table
					workers={workers}
					columns={columns}
					onView={viewHandler}
					onEdit={editHandler}
					onDelete={deleteHandler}
				/>
			)}
		</Flex>
	);
};
