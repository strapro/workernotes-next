import { Col, Row, Text } from '@nextui-org/react';

import { Worker } from 'types/database';

interface Props {
	worker: Worker;
}

export const TableRoleCell = ({ worker }: Props) => {
	return (
		<Col>
			<Row>
				<Text b size={14} css={{ tt: 'capitalize' }}>
					{worker.levels?.name}
				</Text>
			</Row>
			<Row>
				<Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
					{worker.departments?.name}
				</Text>
			</Row>
		</Col>
	);
};
