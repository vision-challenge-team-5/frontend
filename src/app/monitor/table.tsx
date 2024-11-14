import React from 'react';
import { useReactTable, ColumnDef, getCoreRowModel } from '@tanstack/react-table';

interface AnalResultProps {
  id: number;
  alt: string;
  name: string;
  status: string;
}

export default function AnalResult() {
    const data: AnalResultProps[] = [
        { id: 1, alt: 'contaStatus', name: '오염 여부', status: 'Operational' },
        { id: 2, alt: 'contaCause', name: '오염 원인', status: 'Cause 1' },
        { id: 3, alt: 'contaRate', name: '오염률', status: '90' },
        { id: 4, alt: 'powerEfficiency', name: '발전 효율', status: 'High' },
      ];

      const columns: ColumnDef<AnalResultProps, keyof AnalResultProps>[] = [
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Status',
            accessorKey: 'status',
        },
      ];

      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
    
      return (
        <div className="overflow-x-auto text-center">
          <table className="min-w-full table-auto border-collapse">
            {/* 테이블 헤더 */}
            {/* <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      className="px-4 py-2 border-b text-left"
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead> */}

            {/* 테이블 내용 */}
            <tbody className="border-t">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}> 
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id}
                      className="px-4 py-4 border-b font-medium text-lg">
                      {cell.getValue()?.toString() ?? ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}