import { GetServerSidePropsContext } from 'next';

import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import type { ReactElement } from 'react';

import { Accounts as AccountsCompoment } from '../../components/accounts';
import { Layout } from '../../components/layout/layout';
import type { NextPageWithLayout } from '../_app';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createPagesServerClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return {
		props: {
			initialSession: session,
		},
	};
};

const Accounts: NextPageWithLayout = ({ initialSession }) => {
	return <AccountsCompoment user={initialSession.user} />;
};

Accounts.getLayout = (page: ReactElement) => {
	return <Layout {...page.props}>{page}</Layout>;
};

export default Accounts;
