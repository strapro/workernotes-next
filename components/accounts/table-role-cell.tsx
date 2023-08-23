import { Col, Row, Text } from '@nextui-org/react';

import { users } from './data';

interface Props {
	user: (typeof users)[number];
}

export const TableRoleCell = ({ user }: Props) => {
	return (
		<Col>
			<Row>
				<Text b size={14} css={{ tt: 'capitalize' }}>
					{user.role}
				</Text>
			</Row>
			<Row>
				<Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
					{user.team}
				</Text>
			</Row>
		</Col>
	);
};
