import React, { Key, ReactNode } from 'react';

import { Table } from '@nextui-org/react';

import { Box } from 'components/styles/box';
import { TableCell } from 'components/table/table-cell';

export type Column = { name: string; uid: string };

interface TableProps<T> {
	data: Array<T>;
	columns: Array<Column>;
	onView?: (selectedId: string) => void;
	onEdit?: (selectedId: string) => void;
	onDelete?: (selectedId: string) => void;
	children?: (item: T, columnKey: Key) => ReactNode;
}

export const TableWrapper = <T extends { id: string }>({
	columns,
	data,
	onView,
	onEdit,
	onDelete,
	children,
}: TableProps<T>) => {
	return (
		<Box
			css={{
				'& .nextui-table-container': {
					boxShadow: 'none',
				},
			}}
		>
			<Table
				aria-label="Example table with custom cells"
				css={{
					height: 'auto',
					minWidth: '100%',
					boxShadow: 'none',
					width: '100%',
					px: 0,
				}}
				selectionMode="multiple"
			>
				<Table.Header columns={columns}>
					{column => (
						<Table.Column
							key={column.uid}
							hideHeader={column.uid === 'actions'}
							align={column.uid === 'actions' ? 'center' : 'start'}
						>
							{column.name}
						</Table.Column>
					)}
				</Table.Header>
				<Table.Body items={data}>
					{item => (
						<Table.Row>
							{(columnKey: Key) => (
								<Table.Cell>
									{(children !== undefined && children!(item, columnKey)) ||
										TableCell({
											item: item,
											columnKey: columnKey,
											onView: onView,
											onEdit: onEdit,
											onDelete: onDelete,
										})}
								</Table.Cell>
							)}
						</Table.Row>
					)}
				</Table.Body>
				<Table.Pagination
					shadow
					noMargin
					align="center"
					rowsPerPage={8}
					onPageChange={page => console.log({ page })}
				/>
			</Table>
		</Box>
	);
};
