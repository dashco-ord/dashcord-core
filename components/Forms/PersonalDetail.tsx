const PersonalDetailForm = () => {
  return (
    <fieldset className='border border-black p-3 rounded w-fit'>
      <legend className='text-2xl font-bold mb-6 px-2'>
        Personal Details :
      </legend>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg sm:text-sm'>
            Name :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Name'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Phone.no :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 md:text-lg'
            type='text'
            placeholder='Enter your Roll.No'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Email :
          </label>
          <input
            className='md:text-lg sm:text-sm p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='email'
            placeholder='Enter your Email'
            required
          />
        </div>
      </div>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Age :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Age'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Gender :
          </label>
          <select className='p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'>
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-Bianry</option>
          </select>
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Date Of Birth :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your  Date Of Birth'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Date Of Addmission :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Date Of Addmission'
            required
          />
        </div>
      </div>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Address :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Address'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Cast :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Cast'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Religion :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm md: border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Seat Type :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Seat Type'
            required
          />
        </div>
      </div>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Addhar no :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Addhar No'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            10th School :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your 10th School'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            12th College :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your 12th School'
            required
          />
        </div>
      </div>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Year of Passing (10th) :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your 10th Year of Passing'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Year of Passing (12th) :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your 12th year of passing'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Current Year :
          </label>
          <input
            className='  p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Current year'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Section :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Section'
            required
          />
        </div>
      </div>

      <div className='flex flex-wrap'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Blood Type :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Blood Type'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Height :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Height'
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Weight :
          </label>
          <input
            className=' p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Weight'
          />
        </div>
      </div>

      {/* <div className='mt-2 mb-2 md:rem] overflocroll'>
        <Table
          title='Academic Details :'
          headings={[
            "Year",
            "10th",
            "12th",
            "Sem 1",
            "Sem 2",
            "Sem 3",
            "Sem 4",
            "Sem 5",
            "Sem 6",
            "Sem 7",
            "Sem 8",
          ]}
          noShadow={true}>
          <tr className='font-semibold'>
            <td className='pl-5 p-2 whitespace-nowrap'>
              <div>Score</div>
            </td>
            <td className='p-2 whitespace-nowrap'></td>
            <td className='p-2 whitespace-nowrap'></td>
            <td className='p-2 whitespace-nowrap'></td>
            <td className='p-2 whitespace-nowrap'></td>
            <td className='p-2 whitespace-nowrap'></td>
            <td className='p-2 whitespace-nowrap'></td>
            <td className='p-2 whitespace-nowrap'></td>
            <td className='p-2 whitespace-nowrap'></td>
            <td className='p-2 whitespace-nowrap'></td>
            <td className='p-2 whitespace-nowrap'></td>
          </tr>
        </Table>
      </div> */}
      <input
        className='mt-3 p-2 pb-4 rounded-xl font-semibold text-md bg-purple-600 hover:bg-purple-700 cursor-pointer text-white'
        type='submit'
        value='Save Changes'
      />
    </fieldset>
  );
};

export default PersonalDetailForm;
