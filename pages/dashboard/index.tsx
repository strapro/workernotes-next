import { useUser } from '@supabase/auth-helpers-react';
import type { ReactElement } from 'react';

import { Content } from '../../components/home/content';
import { Layout } from '../../components/layout/layout';
import type { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => {
	const user = useUser();

	return <Content user={user!} />;
};

Home.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default Home;
