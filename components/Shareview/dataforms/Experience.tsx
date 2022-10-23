import { Experience } from "@prisma/client";

type ExperienceModalProps = {
  experience: Experience;
};

export default function ExperienceModal({ experience }: ExperienceModalProps) {
  return (
    <div className='bg-white p-3 rounded overflow-y-scroll'>
      <fieldset className='border border-black p-3 rounded bg-white'>
        <legend className='text-xl font-bold mb-6 px-2'>
          Interview Experience Details :
        </legend>

        <form>
          <div className='flex flex-col pb-6 '>
            <label className='text-xl font-semibold mr-5 pb-2 md:text-lg'>
              Post Title: *
            </label>

            <input
              className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
              type='text'
              placeholder='Ex. Data Analyst Interview Experience at TCS for 4 LPA'
              required
              value={experience.title}
              readOnly={true}
            />
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-xl font-semibold mr-5 pb-2 md:text-lg'>
              Job Description: *
            </label>

            <div className='flex items-center justify-evenly'>
              1.
              <input
                className='p-2 pl-0 w-3/4 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
                type='text'
                placeholder='Job Title/Role (Ex. Data Analyst)'
                required
                value={experience.role}
                readOnly={true}
              />
            </div>

            <div className='flex items-center justify-evenly'>
              2.
              <input
                className='p-2 pl-0 w-3/4 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
                type='text'
                placeholder='Company Name (Ex. TCS)'
                required
                value={experience.company}
                readOnly={true}
              />
            </div>

            <div className='flex items-center justify-evenly'>
              <abbr title='if no criteria enter 35%'>3.</abbr>
              <input
                className='p-2 pl-0 w-3/4 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
                type='number'
                placeholder='Eligibility Criteria in % (Ex. 60)'
                required
                value={`${experience.criteria}%`}
                readOnly={true}
              />
            </div>

            <div className='flex items-center justify-evenly'>
              4.
              <input
                className='p-2 pl-0 w-3/4 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
                type='text'
                placeholder='Package (Ex. 4.5)'
                required
                value={experience.salary}
                readOnly={true}
              />
            </div>
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-xl font-semibold mr-5 pb-2 md:text-lg'>
              Tags: *
            </label>
            <input
              className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
              id='tags'
              type='text'
              placeholder='Enter Tags separated by commas'
              required
              value={experience.tags}
              readOnly={true}
            />
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-xl font-semibold mr-5 pb-2 md:text-lg'>
              Video Link :
            </label>
            <input
              className='p-2 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
              type='text'
              placeholder='Enter link of short video of your experience'
              value={experience.link}
              readOnly={true}
            />
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-xl font-semibold mr-5 pb-2 md:text-lg'>
              Body(Brief Experience): *
            </label>
            <div className='p-2 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'>
              {experience.body}
            </div>
          </div>

          <div className='mb-4 p-2 rounded text-md bg-red-500 hover:bg-red-700 cursor-pointer text-white w-fit'>
            close
          </div>
        </form>
      </fieldset>
    </div>
  );
}
