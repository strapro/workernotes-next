import React, { useEffect, useState } from 'react';

import {
	Avatar,
	Button,
	Divider,
	FormElement,
	Input,
	Modal,
	Text,
} from '@nextui-org/react';

import { Flex } from 'components/styles/flex';

import { Worker } from 'types/database';

type Props = {
	worker: Worker;
	open?: boolean;
	onOpen?: () => void;
	onClose?: (worker: Worker) => void;
	onSave?: (worker: Worker) => void;
};

export const ModalAddUser = ({ worker, open, onOpen, onClose, onSave }: Props) => {
	const [visible, setVisible] = useState(false);
	const [formData, setFormData] = useState<Worker>({} as Worker);

	useEffect(() => {
		setFormData(worker);
	}, [worker]);

	useEffect(() => {
		setVisible(!!open);
	}, [open]);

	const openHandler = () => {
		if (onOpen) onOpen();

		setVisible(true);
	};

	const closeHandler = () => {
		if (onClose) onClose(formData);

		setVisible(false);
	};

	const saveHandler = async () => {
		if (onSave) onSave(formData);

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
								value={formData.first_name || ''}
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
								value={formData.last_name || ''}
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
								value={formData.email || ''}
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
								value={formData.status || ''}
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
								value={formData.departments?.name || ''}
								placeholder="Department"
							/>
							<Input
								label="Role"
								clearable
								bordered
								fullWidth
								size="lg"
								value={formData.levels?.name || ''}
								placeholder="Level"
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
