import { TableNameCell } from 'components/accounts/table-name-cell';
import { TableRoleCell } from 'components/accounts/table-role-cell';
import { Column, TableWrapper } from 'components/table/table';

import { Worker } from 'types/database';

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
