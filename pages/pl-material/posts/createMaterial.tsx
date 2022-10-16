import { InterviewPost, UserRole } from "@prisma/client";
import { checkUserRoleAndRedirect } from "lib/checks";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";
import moment from "moment";

type postprops = {
  posts: InterviewPost[];
};

// export const getServerSideProps = async (context: any) => {
//   const session = await getSession(context);
//   const posts = await prisma.posts.create({
//     where: {
//       //@ts-ignore
//       studentId: session?.id,
//     },
//   });

//   return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
//     extra: { posts: JSON.parse(JSON.stringify(posts)) },
//   });
// };
 
export default function CreatePost({ posts }: postprops) {
  return (
    <div className="flex-1 flex justify-center my-5">
    <fieldset className='border border-black p-3 rounded w-1/3'>
      <legend className='text-2xl font-bold mb-6 px-2'>
        Interview Experience Details :{" "}
      </legend>
        <div className='flex flex-col pb-6 '>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Name of the Company
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Ex. Infocepts/Cybage/etc'
            required
          />
        </div>
        <div className='flex flex-col pb-6 '>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Description:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter a short Description i.e. criteria/role/other'
            required
          />
        </div>
        <div className='flex flex-col pb-6 '>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Cover Image :
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base'
            type='file'
            placeholder='Enter Friends contact'
            required
          />
        </div>
        <div className='flex flex-col pb-6 '>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Tags:
          </label>
          <input
            className='p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
            id='tags'
            type='text'
            placeholder='Enter Tags separated by commas'
            required
          />
        </div>
        <div className='flex flex-col pb-6 '>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Video Link for Experience(G-Drive/Youtube/Vimeo):
          </label>
          <input
            className='p-2 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter Friends Name'
            required
          />
        </div>
        <div className='flex flex-col pb-6 '>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Body(Brief Experience) :
          </label>
          <textarea
            className='p-2 rounded-sm bg-white text-xl md:text-base border-2 border-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
            rows={5}
            placeholder='Explain your experience along with the questions asked'
            required
          />
        </div>

      <div>
        <input
          className='mb-4 p-2 rounded-xl font-semibold text-md bg-purple-600 hover:bg-purple-700 cursor-pointer text-white'
          type='submit'
          value='Save Changes'
        />
      </div>
    </fieldset>

    </div>
  );
}
