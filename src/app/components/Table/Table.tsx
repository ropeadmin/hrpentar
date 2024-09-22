import React from 'react';
import './Table.scss';

interface TableProps {
  head: React.ReactNode;
  body: React.ReactNode;
}

export default function Table({ head, body }: TableProps) {
  return (
    <div className='relative overflow-x-auto sm:rounded-[8px]'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-[#0F1625]'>
          <tr>{head}</tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
}
