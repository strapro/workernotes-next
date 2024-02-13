import type { ReactElement } from 'react';

import { Home as HomeComponent } from 'components/home';

import { Layout } from 'layout/layout';

import type { NextPageWithLayout } from 'pages/_app';

const Home: NextPageWithLayout = () => {
	return <HomeComponent />;
};

Home.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default Home;
