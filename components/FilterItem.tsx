const FilterItem = ({
  name,
  label,
  onSelect,
  selected = false,
}: {
  name: string;
  label: string;
  onSelect: (name: string) => void;
  selected: boolean;
}) => {
  return (
    <li className='m-1'>
      <button
        onClick={() => onSelect(name)}
        className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full mr-2 px-3 py-1 border shadow-sm duration-150 ease-in-out ${
          selected
            ? "text-white bg-indigo-500 border-indigo-500 hover:border-indigo-500"
            : "text-gray-500 bg-[#1E1D1D] border-gray-800 hover:border-indigo-500"
        }`}>
        {label}
      </button>
    </li>
  );
};

export default FilterItem;
