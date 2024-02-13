import { EventHandler, MouseEventHandler } from 'react';
import { PiEyeBold, PiPencilSimpleLineBold, PiTrashBold } from 'react-icons/pi';

import { useRouter } from 'next/router';

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
}

export const TableCellActions = ({ item }: Props) => {
	const router = useRouter();
	console.log();

	const onPointerDown: MouseEventHandler<HTMLButtonElement> = e => {
		e.stopPropagation();

		return false;
	};

	const onView = () => {
		console.log('View record', item.id);

		router.push(`${router.pathname}/${item.id}/view`);

		return false;
	};

	const onEdit = () => {
		console.log('Edit record', item.id);

		router.push(`${router.pathname}/${item.id}/edit`);

		return false;
	};

	const onDelete = () => {
		console.log('Delete record', item.id);

		router.push(`${router.pathname}/${item.id}/delete`);

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
						onClick={onView}
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
						onClick={onEdit}
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
						onClick={onDelete}
						css={{ svg: { color: '#FF0080' } }}
					>
						<PiTrashBold />
					</IconButton>
				</Tooltip>
			</Col>
		</Row>
	);
};
