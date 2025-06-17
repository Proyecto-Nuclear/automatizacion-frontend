import React, { ReactNode } from 'react';

type TableProps = {
    columns: string[];
    data: Array<Record<string, ReactNode>>;
};

export default function Table({ columns, data }: TableProps) {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col} style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #eee' }}>{col}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f3f3f3' }}>
                    {columns.map((col) => (
                        <td key={col} style={{ padding: '8px' }}>{row[col]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}