import React, { Key, useEffect, useState } from 'react';

import {
	Avatar,
	Button,
	Divider,
	Dropdown,
	FormElement,
	Input,
	Modal,
	Text,
} from '@nextui-org/react';

import { Flex } from 'components/styles/flex';

import { useDepartments } from 'hooks/supabase/useDepartments';
import { useLevels } from 'hooks/supabase/useLevels';

import { Worker } from 'types/database';

type Props = {
	worker: Worker;
	open?: boolean;
	onOpen?: () => void;
	onClose?: (worker: Worker) => void;
	onSave?: (worker: Worker) => void;
};

export const ModalForm = ({ worker, open, onOpen, onClose, onSave }: Props) => {
	const [visible, setVisible] = useState(false);
	const [formData, setFormData] = useState<Worker>({} as Worker);

	const { departments } = useDepartments();
	const { levels } = useLevels();

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

	const handleDropdownInput = (fieldName: string, selection: 'all' | Set<Key>) => {
		setFormData(prevState => ({
			...prevState,
			[fieldName]: (selection as Set<Key>).entries().next().value[0],
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
							<Flex
								css={{
									width: '100%',
									flexDirection: 'column',
									fontSize: 'var(--nextui--inputFontSize)',
								}}
							>
								<Text>Department</Text>
								<Dropdown>
									<Dropdown.Button
										light
										css={{
											width: '100%',
											textAlign: 'left',
											border: '1px solid',
											justifyContent: 'space-between',
											fontSize: 'var(--nextui--inputFontSize)',
										}}
									>
										{departments.find(
											department => department.id == formData.department_id
										)?.name || ''}
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Level"
										variant="light"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={formData.level_id || ''}
										onSelectionChange={selection =>
											handleDropdownInput('department_id', selection)
										}
									>
										{departments.map(department => {
											return (
												<Dropdown.Item key={department.id}>
													{department.name}
												</Dropdown.Item>
											);
										})}
									</Dropdown.Menu>
								</Dropdown>
							</Flex>
							<Flex
								css={{
									width: '100%',
									flexDirection: 'column',
									fontSize: 'var(--nextui--inputFontSize)',
								}}
							>
								<Text>Level</Text>
								<Dropdown>
									<Dropdown.Button
										light
										css={{
											width: '100%',
											textAlign: 'left',
											border: '1px solid',
											justifyContent: 'space-between',
											fontSize: 'var(--nextui--inputFontSize)',
										}}
									>
										{levels.find(level => level.id == formData.level_id)?.name || ''}
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="Level"
										variant="light"
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={formData.level_id || ''}
										onSelectionChange={selection =>
											handleDropdownInput('level_id', selection)
										}
									>
										{levels.map(level => {
											return <Dropdown.Item key={level.id}>{level.name}</Dropdown.Item>;
										})}
									</Dropdown.Menu>
								</Dropdown>
							</Flex>
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
