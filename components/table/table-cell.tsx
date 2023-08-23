import React from 'react';

import { TableCellActions } from './table-cell-actions';
import { TableCellStatus } from './table-cell-status';

interface Props<T> {
	item: T;
	columnKey: React.Key;
}

export const TableCell = <T extends object>({ item, columnKey }: Props<T>) => {
	switch (columnKey) {
		case 'status':
			// @ts-ignore
			return <TableCellStatus item={item} />;
		case 'actions':
			// @ts-ignore
			return <TableCellActions item={item} />;
		default:
			// @ts-ignore
			return item[columnKey];
	}
};
