import { Worker } from '../../types/database';
import { Column, TableWrapper } from '../table/table';
import { TableNameCell } from './table-name-cell';
import { TableRoleCell } from './table-role-cell';

interface Props {
	users: Array<Worker>;
	columns: Array<Column>;
}

export const Table = ({ users, columns }: Props) => {
	return (
		<TableWrapper columns={columns} data={users}>
			{(item, columnKey) => {
				switch (columnKey) {
					case 'name':
						return <TableNameCell user={item} />;
					case 'role':
						return <TableRoleCell user={item} />;
				}
			}}
		</TableWrapper>
	);
};
