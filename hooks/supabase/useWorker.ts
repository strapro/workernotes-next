import { Ulid, Uuid4 } from 'id128';
import { useCallback, useEffect, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

import { Database, Worker } from 'types/database';

export const useWorker = (workerId?: string) => {
	const user = useUser();
	const supabase = createClientComponentClient<Database>();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [worker, setWorker] = useState<Worker>({} as Worker);

	const getWorker = useCallback(async () => {
		if (workerId) {
			try {
				setLoading(true);

				let { data, error, status } = await supabase
					.from('workers')
					.select('*, departments (*), levels (*)')
					.eq('manager_id', user?.id)
					.eq('id', workerId)
					.single();

				if (error && status !== 406) {
					throw error;
				}

				if (data) {
					setWorker(data);
				}
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
				setError(false);
			}
		} else {
			setWorker({
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
	}, [user, supabase, workerId]);

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
					.eq('id', workerId));

				if (error && status !== 406) {
					throw error;
				}
			} catch (error) {
				alert('Error saving worker');
			}
		},
		[user, supabase, workerId]
	);

	useEffect(() => {
		getWorker();
	}, [getWorker]);

	return { error, loading, setLoading, worker, setWorker, saveWorker, updateWorker };
};
