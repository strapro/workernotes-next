import { Col, Row, Tooltip } from '@nextui-org/react';
import { styled } from '@nextui-org/react';
import { PiEyeBold, PiPencilSimpleLineBold, PiTrashBold } from 'react-icons/pi';

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
	item: { id: number };
}

export const TableCellActions = ({ item }: Props) => {
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
						onClick={() => console.log('View record', item.id)}
						css={{ svg: { color: '#979797' } }}
					>
						<PiEyeBold />
					</IconButton>
				</Tooltip>
			</Col>
			<Col css={{ d: 'flex' }}>
				<Tooltip content="Edit user">
					<IconButton
						onClick={() => console.log('Edit record', item.id)}
						css={{ svg: { color: '#979797' } }}
					>
						<PiPencilSimpleLineBold />
					</IconButton>
				</Tooltip>
			</Col>
			<Col css={{ d: 'flex' }}>
				<Tooltip content="Delete user" color="error">
					<IconButton
						onClick={() => console.log('Delete record', item.id)}
						css={{ svg: { color: '#FF0080' } }}
					>
						<PiTrashBold />
					</IconButton>
				</Tooltip>
			</Col>
		</Row>
	);
};
