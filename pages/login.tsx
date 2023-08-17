import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
	Button,
	Card,
	Container,
	FormElement,
	Input,
	Spacer,
	Text,
} from '@nextui-org/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const Login: NextPage = () => {
	const supabaseClient = useSupabaseClient();
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleInput = (e: React.ChangeEvent<FormElement>) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;

		setFormData(prevState => ({
			...prevState,
			[fieldName]: fieldValue,
		}));
	};

	const login = async (e: React.FormEvent) => {
		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: formData.email,
			password: formData.password,
		});

		if (!error) {
			router.push('/dashboard');
		}
	};

	return (
		<div>
			<Container
				display="flex"
				alignItems="center"
				justify="center"
				css={{ minHeight: '100vh' }}
			>
				<Card css={{ mw: '420px', p: '20px' }}>
					<Text
						size={24}
						weight="bold"
						css={{
							as: 'center',
							mb: '20px',
						}}
					>
						WorkerNotes Login
					</Text>
					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Email"
						name="email"
						onChange={handleInput}
					/>
					<Spacer y={1} />
					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Password"
						name="password"
						type="password"
						onChange={handleInput}
					/>
					<Spacer y={1} />

					<Button onClick={login}>Sign in</Button>
				</Card>
			</Container>
		</div>
	);
};

export default Login;
