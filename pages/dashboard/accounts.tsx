import type { ReactElement } from 'react';

import { Accounts as AccountsCompoment } from '../../components/accounts';
import { Layout } from '../../components/layout/layout';
import type { NextPageWithLayout } from '../_app';

const Accounts: NextPageWithLayout = () => {
	return <AccountsCompoment />;
};

Accounts.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default Accounts;
