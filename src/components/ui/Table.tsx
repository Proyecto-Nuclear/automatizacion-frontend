import React from 'react';

type TableProps = {
    columns: string[];
    data: any[];
};

export default function Table({ columns, data }: TableProps) {
    return (
        <table>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col}>{col}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, idx) => (
                <tr key={idx}>
                    {columns.map((col) => (
                        <td key={col}>{row[col]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}