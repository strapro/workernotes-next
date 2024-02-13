import type { ReactElement } from 'react';

import { Content } from 'components/home/content';

import { Layout } from 'layout/layout';

import type { NextPageWithLayout } from 'pages/_app';

const Home: NextPageWithLayout = () => {
	return <Content />;
};

Home.getLayout = (page: ReactElement) => {
	return <Layout>{page}</Layout>;
};

export default Home;
