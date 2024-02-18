import { useCallback, useEffect, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

import { Database, Worker } from 'types/database';

export const useWorkers = () => {
	const user = useUser();
	const supabase = createClientComponentClient<Database>();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [workers, setWorkers] = useState<Array<Worker>>([]);

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
			setError(true);
		} finally {
			setLoading(false);
			setError(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getWorkers();
	}, [getWorkers]);

	return { error, loading, setLoading, workers, setWorkers };
};
