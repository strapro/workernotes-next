import { Col, Row, Text } from '@nextui-org/react';

import { Worker } from '../../types/database';

interface Props {
	user: Worker;
}

export const TableRoleCell = ({ user }: Props) => {
	return (
		<Col>
			<Row>
				<Text b size={14} css={{ tt: 'capitalize' }}>
					{user.levels?.name}
				</Text>
			</Row>
			<Row>
				<Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
					{user.departments?.name}
				</Text>
			</Row>
		</Col>
	);
};
