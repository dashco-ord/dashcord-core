import { MouseEventHandler } from "react";
import { FcRefresh } from "react-icons/fc";

type TableProps = {
  title: string;
  headings: string[];
  children: JSX.Element | JSX.Element[];
  refresh?: MouseEventHandler;
};

const Table = ({ title = "", headings, children, refresh }: TableProps) => {
  return (
    <div className=' col-span-full bg-[#1E1D1D] shadow-lg rounded-md text-white min-w-1/3'>
      <header className='px-5 py-4 flex items-center'>
        <h2 className='font-bold text-2xl mr-auto'>{title}</h2>
        {refresh && (
          <FcRefresh
            className='text-2xl font-bold hover:scale-110'
            onClick={refresh}
          />
        )}
      </header>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full divide-y'>
          <thead className='text-xs uppercase text-gray-500 bg-[#1E1D1D] border-t-2 border-black mt-0'>
            <tr>
              {headings.map((heading) => (
                <th key={heading} className='px-2 first:pl-5 last:pr-5 py-3'>
                  <div className='font-semibold text-left'>{heading}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-md divide-y'>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
