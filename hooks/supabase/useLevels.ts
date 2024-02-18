import { useCallback, useEffect, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

import { Database, Level } from 'types/database';

export const useLevels = () => {
	const supabase = createClientComponentClient<Database>();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [levels, setLevels] = useState<Array<Level>>([]);

	const getLevels = useCallback(async () => {
		try {
			setLoading(true);

			let { data, error, status } = await supabase.from('levels').select('*');

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setLevels(data);
			}
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
			setError(false);
		}
	}, [supabase]);

	useEffect(() => {
		getLevels();
	}, [getLevels]);

	return { error, loading, setLoading, levels, setLevels };
};
