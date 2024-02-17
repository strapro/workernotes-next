import { MouseEventHandler } from 'react';
import { PiEyeBold, PiPencilSimpleLineBold, PiTrashBold } from 'react-icons/pi';

import { Col, Row, Tooltip } from '@nextui-org/react';
import { styled } from '@nextui-org/react';

const IconButton = styled('button', {
	dflex: 'center',
	border: 'none',
	outline: 'none',
	cursor: 'pointer',
	padding: '0',
	margin: '0',
	bg: 'transparent',
	transition: '$default',
	'&:hover': {
		opacity: '0.8',
	},
	'&:active': {
		opacity: '0.6',
	},
});

interface Props {
	item: { id: string };
	onView?: (selectedId: string) => void;
	onEdit?: (selectedId: string) => void;
	onDelete?: (selectedId: string) => void;
}

export const TableCellActions = ({ item, onView, onEdit, onDelete }: Props) => {
	const onPointerDown: MouseEventHandler<HTMLButtonElement> = e => {
		e.stopPropagation();

		return false;
	};

	const onViewHandler = () => {
		if (onView) onView(item.id);

		return false;
	};

	const onEditHandler = () => {
		if (onEdit) onEdit(item.id);

		return false;
	};

	const onDeleteHandler = () => {
		if (onDelete) onDelete(item.id);

		return false;
	};

	return (
		<Row
			justify="center"
			align="center"
			css={{
				gap: '$8',
				'@md': { gap: 0 },
				svg: { height: '1.2em', width: 'auto' },
			}}
		>
			<Col css={{ d: 'flex' }}>
				<Tooltip content="Details">
					<IconButton
						onPointerDown={onPointerDown}
						onClick={onViewHandler}
						css={{ svg: { color: '#979797' } }}
					>
						<PiEyeBold />
					</IconButton>
				</Tooltip>
			</Col>
			<Col css={{ d: 'flex' }}>
				<Tooltip content="Edit user">
					<IconButton
						onPointerDown={onPointerDown}
						onClick={onEditHandler}
						css={{ svg: { color: '#979797' } }}
					>
						<PiPencilSimpleLineBold />
					</IconButton>
				</Tooltip>
			</Col>
			<Col css={{ d: 'flex' }}>
				<Tooltip content="Delete user" color="error">
					<IconButton
						onPointerDown={onPointerDown}
						onClick={onDeleteHandler}
						css={{ svg: { color: '#FF0080' } }}
					>
						<PiTrashBold />
					</IconButton>
				</Tooltip>
			</Col>
		</Row>
	);
};
