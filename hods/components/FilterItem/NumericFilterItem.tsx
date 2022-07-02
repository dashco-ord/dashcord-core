const NumericFilterItem = ({
  name,
  label,
  onSelect,
  selected = false,
}: {
  name: string;
  label: number;
  onSelect: (label: number) => void;
  selected: boolean;
}) => {
  return (
    <li className='m-1'>
      <button
        onClick={() => onSelect(label)}
        className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full mr-2 px-3 py-1 border shadow-sm duration-150 ease-in-out ${
          selected
            ? "text-white bg-indigo-500 border-indigo-500 hover:border-indigo-500"
            : "text-gray-500 bg-white border-slate-200 hover:border-indigo-500"
        }`}>
        {name}
      </button>
    </li>
  );
};

export default NumericFilterItem;
