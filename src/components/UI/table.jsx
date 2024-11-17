import React from 'react';

const Table = ({ children, className = '', ...props }) => (
    <table
        className={`w-full caption-bottom text-sm ${className}`}
        style={{ width: '100%' }}
        {...props}
    >
        {children}
    </table>
);

const TableHeader = ({ children, className = '', ...props }) => (
    <thead className={`border-b bg-gray-50/40 ${className}`} {...props}>
        {children}
    </thead>
);

const TableBody = ({ children, className = '', ...props }) => (
    <tbody className={`${className}`} {...props}>
        {children}
    </tbody>
);

const TableFooter = ({ children, className = '', ...props }) => (
    <tfoot className={`border-t bg-gray-50/40 font-medium ${className}`} {...props}>
        {children}
    </tfoot>
);

const TableRow = ({ children, className = '', ...props }) => (
    <tr
        className={`border-b transition-colors hover:bg-gray-50/50 ${className}`}
        {...props}
    >
        {children}
    </tr>
);

const TableHead = ({ children, className = '', ...props }) => (
    <th
        className={`h-12 px-4 text-left align-middle font-medium text-gray-500 ${className}`}
        {...props}
    >
        {children}
    </th>
);

const TableCell = ({ children, className = '', ...props }) => (
    <td
        className={`p-4 align-middle ${className}`}
        {...props}
    >
        {children}
    </td>
);

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell
};