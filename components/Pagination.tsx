const Pagination = ({
  currentPage,
  total,
  perPage = 10,
  onNavigation,
}: PaginationProps) => {
  const current = (currentPage - 1) * perPage + 1;
  const to = currentPage * perPage;
  const maxPage = Math.ceil(total / perPage);

  const isFirstPage = currentPage == 1;
  const isLastPage = currentPage == maxPage;

  const handlePrevious = () => {
    const page = currentPage - 1 < 1 ? 1 : currentPage - 1;
    onNavigation(page);
  };

  const handleNext = () => {
    const page = currentPage + 1 > maxPage ? maxPage : currentPage + 1;
    onNavigation(page);
  };

  return (
    <div className='mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
      <nav
        className='mb-4 sm:mb-0 sm:order-1'
        role='navigation'
        aria-label='Navigation'>
        <ul className='flex justify-center'>
          <li className='ml-3 first:ml-0'>
            <button
              disabled={isFirstPage}
              className={`btn p-2 rounded-lg bg-[#1E1D1D] ${
                isFirstPage
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300"
              }`}
              onClick={handlePrevious}>
              &lt;- Previous
            </button>
          </li>

          <li className='ml-3 first:ml-0'>
            <button
              disabled={isLastPage}
              className={`btn p-2 rounded-lg bg-[#1E1D1D] hover:border-slate-300 ${
                isLastPage
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300"
              }`}
              onClick={handleNext}>
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className='text-sm text-slate-500 text-center sm:text-left'>
        {total > 0 && (
          <>
            Showing
            <span className='font-medium text-slate-600'>{current}</span>
            to
            <span className='font-medium text-slate-600'>{to}</span>
            of
            <span className='font-medium text-slate-600'>{total}</span>
          </>
        )}

        {total == 0 && "Empty"}
      </div>
    </div>
  );
};

type PaginationProps = {
  currentPage: number;
  total: number;
  perPage?: number;
  onNavigation: (page: number) => void;
};

export default Pagination;
