import type { ReactElement } from 'react';

import { Accounts as AccountsComponent } from 'components/accounts';

import { Layout } from 'layout/layout';

import type { NextPageWithLayout } from 'pages/_app';

const Accounts: NextPageWithLayout = () => {
	return <AccountsComponent />;
};

Accounts.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default Accounts;
