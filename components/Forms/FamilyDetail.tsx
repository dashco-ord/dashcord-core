import { FamilyDetails } from "@prisma/client";

const FamilyDetailForm = ({ familyDetails }: FamilyDetailProps) => {
  return (
    <form className='ml-10 md:ml-0 md:mt-4'>
      <h1 className='text-2xl font-bold mb-6'>Family Details :</h1>
      <div className='flex'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Fathers Name :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Name'
            //@ts-ignore
            defaultValue={familyDetails.fathersName}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Fathers Contact :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Name'
            //@ts-ignore
            defaultValue={familyDetails.fathersPhoneNo}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Mothers Name :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Brothers Name'
            //@ts-ignore
            defaultValue={familyDetails.mothersName}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Mothers Contact :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Name'
            //@ts-ignore
            defaultValue={familyDetails.mothersPhoneNo}
            required
          />
        </div>
      </div>
      <div className='flex'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Brothers Name:
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Brothers Name'
            //@ts-ignore
            defaultValue={familyDetails.brothersName}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Brothers Contact :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Brothers Name'
            //@ts-ignore
            defaultValue={familyDetails.brothersPhoneNo}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Sisters Name:
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Brothers Name'
            //@ts-ignore
            defaultValue={familyDetails.sistersName}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Sisters Contact :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Brothers Name'
            //@ts-ignore
            defaultValue={familyDetails.sistersPhoneNo}
            required
          />
        </div>
      </div>
      <div className='flex'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Fathers Occupation:
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Brothers Name'
            //@ts-ignore
            defaultValue={familyDetails.fathersOccupation}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Mothers Occupation:
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Brothers Name'
            //@ts-ignore
            defaultValue={familyDetails.mothersOccupation}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Fathers Income:
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Brothers Name'
            //@ts-ignore
            defaultValue={`₹ ${familyDetails.familyIncome} /-`}
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
    </form>
  );
};

export default FamilyDetailForm;

type FamilyDetailProps = {
  familyDetails: FamilyDetails;
};
