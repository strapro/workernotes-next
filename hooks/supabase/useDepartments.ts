import { useCallback, useEffect, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

import { Database, Department } from 'types/database';

export const useDepartments = () => {
	const supabase = createClientComponentClient<Database>();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [departments, setDepartments] = useState<Array<Department>>([]);

	const getDepartments = useCallback(async () => {
		try {
			setLoading(true);

			let { data, error, status } = await supabase.from('departments').select('*');

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setDepartments(data);
			}
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
			setError(false);
		}
	}, [supabase]);

	useEffect(() => {
		getDepartments();
	}, [getDepartments]);

	return { error, loading, setLoading, departments, setDepartments };
};
