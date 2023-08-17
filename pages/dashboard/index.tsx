import { GetServerSidePropsContext } from 'next';

import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import type { ReactElement } from 'react';

import { Content } from '../../components/home/content';
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

const Home: NextPageWithLayout = ({ initialSession }) => {
	return <Content user={initialSession?.user} />;
};

Home.getLayout = (page: ReactElement) => {
	return <Layout {...page.props}>{page}</Layout>;
};

export default Home;
