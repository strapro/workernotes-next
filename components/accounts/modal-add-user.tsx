import {
	Avatar,
	Button,
	Divider,
	FormElement,
	Input,
	Modal,
	Text,
} from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { Ulid, Uuid4 } from 'id128';
import React, { useCallback, useEffect, useState } from 'react';

import { Database, Worker } from '../../types/database';
import { Flex } from '../styles/flex';

type Props = {
	id?: string | null;
};

export const ModalAddUser = ({ id }: Props) => {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<Worker>({
		id: id || Uuid4.fromRaw(Ulid.generate().toRaw()).toCanonical(),
		first_name: null,
		last_name: null,
		email: null,
		status: null,
		department_id: null,
		level_id: null,
		manager_id: null,
		profile_pic: null,
		created_at: null,
		updated_at: null,
	});

	const supabase = createClientComponentClient<Database>();

	const user = useUser();

	const getAccount = useCallback(async () => {
		if (!id) return;

		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from('workers')
				.select('*')
				.eq('manager_id', user?.id)
				.eq('id', id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setFormData(data);
			}
		} catch (error) {
			alert('Error loading accounts');
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	const saveAccount = async () => {
		try {
			setLoading(true);

			let { data, error, status } = await supabase.from('workers').insert({
				id: formData.id,
				first_name: formData.first_name,
				last_name: formData.last_name,
				email: formData.email,
				status: formData.status,
				department_id: formData.department_id,
				level_id: formData.level_id,
				manager_id: user?.id,
				profile_pic: null,
			});

			if (error && status !== 406) {
				throw error;
			}
		} catch (error) {
			alert('Error saving account');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAccount();
	}, [getAccount, id]);

	const openHandler = () => setVisible(true);
	const closeHandler = () => setVisible(false);
	const saveHandler = () => {
		saveAccount();
		setVisible(false);
	};

	const handleInput = (e: React.ChangeEvent<FormElement>) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;

		setFormData(prevState => ({
			...prevState,
			[fieldName]: fieldValue,
		}));
	};

	return (
		<div>
			<Button auto onClick={openHandler}>
				Add User
			</Button>

			<Modal
				closeButton
				aria-labelledby="modal-title"
				width="600px"
				open={visible}
				onClose={closeHandler}
			>
				<Modal.Header css={{ justifyContent: 'start' }}>
					<Text id="modal-title" h4>
						Add new user
					</Text>
				</Modal.Header>
				<Divider css={{ my: '$5' }} />
				<Modal.Body css={{ py: '$10' }}>
					<Flex
						direction={'column'}
						css={{
							flexWrap: 'wrap',
							gap: '$8',
							'@lg': { flexWrap: 'nowrap', gap: '$12' },
						}}
					>
						<Flex
							css={{
								gap: '$10',
								flexWrap: 'wrap',
								'@lg': { flexWrap: 'nowrap' },
							}}
						>
							<Avatar
								bordered
								color="gradient"
								src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
								css={{
									size: '$20',
									minWidth: '$20',
									alignSelf: 'center',
								}}
							/>
							<Input
								label="Photo"
								clearable
								bordered
								fullWidth
								size="lg"
								placeholder="Photo"
								type="file"
							/>
						</Flex>

						<hr />

						<Flex
							css={{
								gap: '$10',
								flexWrap: 'wrap',
								'@lg': { flexWrap: 'nowrap' },
							}}
						>
							<Input
								label="First Name"
								bordered
								clearable
								fullWidth
								size="lg"
								placeholder="First Name"
								name="first_name"
								onChange={handleInput}
							/>
							<Input
								label="Last Name"
								clearable
								bordered
								fullWidth
								size="lg"
								placeholder="Last Name"
								name="last_name"
								onChange={handleInput}
							/>
						</Flex>

						<Flex
							css={{
								gap: '$10',
								flexWrap: 'wrap',
								'@lg': { flexWrap: 'nowrap' },
							}}
						>
							<Input
								label="Email"
								clearable
								bordered
								fullWidth
								size="lg"
								placeholder="Email"
								name="email"
								onChange={handleInput}
							/>
							<Input
								label="Status"
								clearable
								bordered
								fullWidth
								size="lg"
								placeholder="Status"
								name="status"
								onChange={handleInput}
							/>
						</Flex>

						<hr />

						<Flex
							css={{
								gap: '$10',
								flexWrap: 'wrap',
								'@lg': { flexWrap: 'nowrap' },
							}}
						>
							<Input
								label="Department"
								clearable
								bordered
								fullWidth
								size="lg"
								placeholder="Department"
							/>
							<Input
								label="Role"
								clearable
								bordered
								fullWidth
								size="lg"
								placeholder="Company"
							/>
						</Flex>
					</Flex>
				</Modal.Body>
				<Divider css={{ my: '$5' }} />
				<Modal.Footer>
					<Button auto onClick={saveHandler}>
						Add User
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
