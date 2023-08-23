import type { NextPage } from 'next';

import { Card, Container } from '@nextui-org/react';

import Form from '../components/login/form';

const Login: NextPage = () => {
	return (
		<div>
			<Container
				display="flex"
				alignItems="center"
				justify="center"
				css={{ minHeight: '100vh' }}
			>
				<Card css={{ mw: '420px', p: '20px' }}>
					<Form />
				</Card>
			</Container>
		</div>
	);
};

export default Login;
