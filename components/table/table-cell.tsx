import React from 'react';

import { TableCellActions } from 'components/table/table-cell-actions';
import { TableCellStatus } from 'components/table/table-cell-status';

interface Props<T> {
	item: T;
	columnKey: React.Key;
	onView?: (selectedId: string) => void;
	onEdit?: (selectedId: string) => void;
	onDelete?: (selectedId: string) => void;
}

export const TableCell = <T extends { id: string }>({
	item,
	columnKey,
	onView,
	onEdit,
	onDelete,
}: Props<T>) => {
	switch (columnKey) {
		case 'status':
			// @ts-ignore
			return <TableCellStatus item={item} />;
		case 'actions':
			return (
				<TableCellActions
					item={item}
					onView={onView}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			);
		default:
			// @ts-ignore
			return item[columnKey];
	}
};
