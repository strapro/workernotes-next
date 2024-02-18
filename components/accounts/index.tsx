import React, { useEffect, useState } from 'react';
import { PiTableBold } from 'react-icons/pi';

import { useRouter } from 'next/router';

import { Button, Input, Text } from '@nextui-org/react';

import { columns } from 'components/accounts/_data';
import { ModalForm } from 'components/accounts/modal-form';
import { Table } from 'components/accounts/table';
import { Breadcrumbs } from 'components/breadcrumbs/breadcrumbs';
import { Flex } from 'components/styles/flex';

import { useWorker } from 'hooks/supabase/useWorker';
import { useWorkers } from 'hooks/supabase/useWorkers';

import { Database, Worker } from 'types/database';

const BASE_PATH = '/dashboard/accounts';

export const Accounts = () => {
	const [selectedWorkerID, setSelectedWorkerId] = useState<string>();
	const [selectedAction, setSelectedAction] = useState<string>();

	const router = useRouter();

	const { loading: workerLoading, workers } = useWorkers();
	const { worker, updateWorker, saveWorker } = useWorker(selectedWorkerID);

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
					<ModalForm
						worker={worker}
						open={['new', 'edit'].includes(selectedAction!)}
						onClose={closeHandler}
						onSave={saveHandler}
					/>
					<Button auto iconRight={<PiTableBold />}>
						Export to CSV
					</Button>
				</Flex>
			</Flex>

			{!workerLoading && (
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
