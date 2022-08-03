const FamilyDetailForm = () => {
  return (
    <fieldset className='border border-black p-3 rounded w-fit'>
      <legend className='text-2xl font-bold mb-6 px-2'>
        Family Details :{" "}
      </legend>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Fathers Name :
          </label>
          <input
            className='w-fit p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Fathers Name'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Fathers Contact :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Fathers contact'
            required
          />
        </div>

        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Fathers Occupation:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Fathers occupation'
            required
          />
        </div>
      </div>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Mothers Name :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Mothers Name'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Mothers Contact :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Mothers Contact'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Mothers Occupation:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Mothers Occupation'
            required
          />
        </div>
      </div>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Brothers Name:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Brothers Name'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Brothers Contact :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Brothers Contact'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Brothers Occupation :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Brothers Occupation'
            required
          />
        </div>
      </div>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Sisters Name:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Sisters Name'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Sisters Contact :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Sisters Contact'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Sisters Occupation :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Sisters Occupation'
            required
          />
        </div>
      </div>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            No. of Siblings:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter No. of Siblings'
            required
          />
        </div>

        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Annual Family Income:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Annual Family Income'
            required
          />
        </div>
      </div>
      <div>
        <input
          className='mb-4 p-2 rounded-xl font-semibold text-md bg-purple-600 hover:bg-purple-700 cursor-pointer text-white'
          type='submit'
          value='Save Changes'
        />
      </div>
    </fieldset>
  );
};

export default FamilyDetailForm;
