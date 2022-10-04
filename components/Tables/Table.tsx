import { MouseEventHandler } from "react";
import { FcRefresh } from "react-icons/fc";

type TableProps = {
  title: string;
  headings: string[];
  children: JSX.Element | JSX.Element[];
  refresh?: MouseEventHandler;
  noShadow?: boolean;
  scroll?: boolean;
};

const Table = ({
  title = "",
  headings,
  children,
  refresh,
  noShadow,
  scroll,
}: TableProps) => {
  return (
    <div
      className={`col-span-full bg-white shadow-md rounded-md min-w-1/3 ${
        noShadow ? "shadow-none" : ""
      } ${scroll ? "overflow-scroll h-52" : ""}`}>
      <header
        className={`py-4 flex items-center ${noShadow ? "px-0" : "px-5 "}`}>
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
          <thead
            className={`text-xs uppercase text-gray-500 bg-white border-t-2 border-black mt-0 ${
              scroll ? "" : ""
            }`}>
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
