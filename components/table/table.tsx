import { Table } from '@nextui-org/react';
import React, { Key, ReactNode } from 'react';

import { Box } from '../styles/box';
import { TableCell } from './table-cell';

export type Column = { name: string; uid: string };

interface TableProps<T> {
	data: Array<T>;
	columns: Array<Column>;
	children?: (item: T, columnKey: Key) => ReactNode;
}

export const TableWrapper = <T extends object>({
	columns,
	data,
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
							{columnKey => (
								<Table.Cell>
									{(children !== undefined && children!(item, columnKey)) ||
										TableCell({ item: item, columnKey: columnKey })}
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
