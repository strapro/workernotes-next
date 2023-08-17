import { useUser } from '@supabase/auth-helpers-react';
import type { ReactElement } from 'react';

import { Accounts as AccountsCompoment } from '../../components/accounts';
import { Layout } from '../../components/layout/layout';
import type { NextPageWithLayout } from '../_app';

const Accounts: NextPageWithLayout = () => {
	const user = useUser();

	return <AccountsCompoment user={user!} />;
};

Accounts.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default Accounts;
