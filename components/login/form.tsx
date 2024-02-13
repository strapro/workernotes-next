import { useState } from 'react';

import { useRouter } from 'next/router';

import { Button, FormElement, Input, Spacer, Text } from '@nextui-org/react';

import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Form = () => {
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
		e.preventDefault();

		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: formData.email,
			password: formData.password,
		});

		if (!error) {
			router.push('/dashboard');
		}
	};

	return (
		<form onSubmit={login}>
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

			<Button type="submit">Sign in</Button>
		</form>
	);
};

export default Form;
