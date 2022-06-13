import HodLayout from "components/Layout/HodLayout";

const AnalyticsPage = () => {
  return (
    <HodLayout>
      <div className='bg-white min-h-[40rem] p-4'>
        <div>
          <h1 className='text-xl font-bold mb-4'>Class Wise Analysis : </h1>
          <div className='border border-black w-fit p-2 rounded-md'>
            <div className='text-lg font-semibold'>3rd Year</div>
            <div className='text-md'>section B</div>
          </div>
        </div>
      </div>
    </HodLayout>
  );
};

export default AnalyticsPage;
