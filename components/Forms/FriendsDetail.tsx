const FriendsDetailForm = () => {
  return (
    <fieldset className='border border-black p-3 rounded w-fit'>
      <legend className='text-2xl font-bold mb-6 px-2'>
        Friends Details :{" "}
      </legend>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Friend Roll No.:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Friends Roll No.'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Friend Name :
          </label>
          <input
            className='w-fit p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Friends Name'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Friend Contact :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Friends contact'
            required
          />
        </div>
      </div>
      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Friend Roll No.:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Friends Roll No.'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Friend Name :
          </label>
          <input
            className='w-fit p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Friends Name'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Friend Contact :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Friends contact'
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

export default FriendsDetailForm;
