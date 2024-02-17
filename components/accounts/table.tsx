import { TableNameCell } from 'components/accounts/table-name-cell';
import { TableRoleCell } from 'components/accounts/table-role-cell';
import { Column, TableWrapper } from 'components/table/table';

import { Worker } from 'types/database';

interface Props {
	workers: Array<Worker>;
	columns: Array<Column>;
	onView: (selectedId: string) => void;
	onEdit: (selectedId: string) => void;
	onDelete: (selectedId: string) => void;
}

export const Table = ({ workers, columns, onView, onEdit, onDelete }: Props) => {
	return (
		<TableWrapper
			columns={columns}
			data={workers}
			onView={onView}
			onEdit={onEdit}
			onDelete={onDelete}
		>
			{(item, columnKey) => {
				switch (columnKey) {
					case 'name':
						return <TableNameCell worker={item} />;
					case 'role':
						return <TableRoleCell worker={item} />;
				}
			}}
		</TableWrapper>
	);
};
