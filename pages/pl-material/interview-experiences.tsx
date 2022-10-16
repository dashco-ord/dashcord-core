import { InterviewPost, UserRole } from "@prisma/client";
import { checkUserRoleAndRedirect } from "lib/checks";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";
import moment from "moment";
import StudentsLayout from "components/Layouts/StudentsLayout";
import { ShareviewHeader } from "components/Header";

type postprops = {
  posts: InterviewPost[];
};

// export const getServerSideProps = async (context: any) => {
//   const session = await getSession(context);
//   const posts = await prisma.posts.findMany({
//     where: {
//       //@ts-ignore
//       studentId: session?.id,
//     },
//   });

//   return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
//     extra: { posts: JSON.parse(JSON.stringify(posts)) },
//   });
// };

export default function InterViewExPage({ posts }: postprops) {
  return (
    <>
    <div className="flex justify-center flex-1 h-screen gap-14 bg-slate-100 py-10">

    <div className="p-5 h-fit bg-gray-50 rounded shadow-lg">
    <ul className="flex flex-col">
        <thead>
          <p className="text-md shadow text-center mb-1 font-semibold p-1 h-auto bg-gray-100 text-grey-900 border rounded-lg border-gray-500">Filters 🌪️</p>     
        </thead>
        <tbody className="mt-2 flex flex-col gap-2">
          <li>
            <a href="#most-liked" className="hover:text-purple-500">Most Liked (↕️)</a>
          </li>
          <li>
            <a href="#most-commented" className="hover:text-purple-500">Most Commented (↕️)</a>
          </li>
          <li>
            <a href="#latest" className="hover:text-purple-500">Latest (↕️)</a>
          </li>
          <li className="flex justify-between">
            <label> Eligibility Criteria: </label>  
            <select className="text-purple-500 hover:text-blue-500 outline-none">  
              <option value = "All"> All   
              </option>  
              <option value = "GT60"> > 60%   
              </option>  
              <option value = "GT70"> > 70%
              </option>  
              <option value = "Skoda"> No Backlog  
              </option>  
            </select> 
          </li>
          <li className="flex justify-between">
            <label> Package: </label>  
            <select className="text-purple-500 hover:text-blue-500 outline-none">  
              <option value = "All">  All
              </option>  
              <option value = "4h"> 4 LPA & higher
              </option>  
              <option value = "4l">  4 LPA & lower
              </option>  
              <option value = "6h"> 6 LPA & higher
              </option>  
              <option value = "6l"> 6 LPA & lower
              </option>  
            </select>
          </li>
        </tbody>
    </ul>
    </div>

      {/* {posts.map((post) => ( */}
        <div 
          // key={post.id}
          className="flex flex-col w-1/2"
        >
          <ShareviewHeader/>
          <a href="./posts/viewPost">
            <div className="flex flex-col gap-1 shadow-md break-words min-h-fit w-full mb-3 rounded-lg bg-white">
                <p className="text-md mb-1 font-semibold p-2 py-1 bg-gray-200 rounded-t-lg">👤 PranayK</p>
                <div className="flex items-center justify-between">
                  <em className="text-xl font-semibold px-2">Interview Experience at Infocepts</em>      
                  <p className="text-justify text-white rounded-lg mx-4 px-2 py-0.5 text-sm bg-gray-500 w-fit">2022</p>
                </div>
                <p className="text-justify text-gray-900 px-2">
                  Role: Data Analyst | Company: Infocepts | Eligibility: 60% | Package: 5 LPA
                </p>
                <p className="text-justify text-white rounded-lg mx-2 px-2 py-0.5 text-sm bg-purple-500 w-fit">
                  Tags
                </p>
                <div className="flex gap-2 py-2">
                  <button className="text-blue-500 hover:text-purple-500 text-left ml-2">like ❤️</button>
                  <button className="text-blue-500 hover:text-purple-500 text-left ml-2">comment 🗨️</button>
                </div>
            </div>
          </a>                  
          <a href="./posts/viewPost">
            <div className="flex flex-col gap-1 shadow-md break-words min-h-fit w-full mb-3 rounded-lg bg-white">
                <p className="text-md mb-1 font-semibold p-2 py-1 bg-gray-200 rounded-t-lg">👤 PranayK</p>
                <div className="flex items-center justify-between">
                  <em className="text-xl font-semibold px-2">Interview Experience at Infocepts</em>      
                  <p className="text-justify text-white rounded-lg mx-4 px-2 py-0.5 text-sm bg-gray-500 w-fit">2022</p>
                </div>
                <p className="text-justify text-gray-900 px-2">
                  Role:Data Analyst | Company: Infocepts | Eligibility: 60% | Package: 5 LPA
                </p>
                <p className="text-justify text-white rounded-lg mx-2 px-2 py-0.5 text-sm bg-purple-500 w-fit">
                  Tags
                </p>
                <div className="flex gap-2 py-2">
                  <button className="text-blue-500 hover:text-purple-500 text-left ml-2">like ❤️</button>
                  <button className="text-blue-500 hover:text-purple-500 text-left ml-2">comment 🗨️</button>
                </div>
            </div>
          </a>                  
          <a href="./posts/viewPost">
            <div className="flex flex-col gap-1 shadow-md break-words min-h-fit w-full mb-3 rounded-lg bg-white">
                <p className="text-md mb-1 font-semibold p-2 py-1 bg-gray-200 rounded-t-lg">👤 PranayK</p>
                <div className="flex items-center justify-between">
                  <em className="text-xl font-semibold px-2">Interview Experience at Infocepts</em>      
                  <p className="text-justify text-white rounded-lg mx-4 px-2 py-0.5 text-sm bg-gray-500 w-fit">2022</p>
                </div>
                <p className="text-justify text-gray-900 px-2">
                  Role:Data Analyst | Company: Infocepts | Eligibility: 60% | Package: 5 LPA
                </p>
                <p className="text-justify text-white rounded-lg mx-2 px-2 py-0.5 text-sm bg-purple-500 w-fit">
                  Tags
                </p>
                <div className="flex gap-2 py-2">
                  <button className="text-blue-500 hover:text-purple-500 text-left ml-2">like ❤️</button>
                  <button className="text-blue-500 hover:text-purple-500 text-left ml-2">comment 🗨️</button>
                </div>
            </div>
          </a>                  
          <a href="./posts/viewPost">
            <div className="flex flex-col gap-1 shadow-md break-words min-h-fit w-full mb-3 rounded-lg bg-white">
                <p className="text-md mb-1 font-semibold p-2 py-1 bg-gray-200 rounded-t-lg">👤 PranayK</p>
                <div className="flex items-center justify-between">
                  <em className="text-xl font-semibold px-2">Interview Experience at Infocepts</em>      
                  <p className="text-justify text-white rounded-lg mx-4 px-2 py-0.5 text-sm bg-gray-500 w-fit">2022</p>
                </div>
                <p className="text-justify text-gray-900 px-2">
                  Role:Data Analyst | Company: Infocepts | Eligibility: 60% | Package: 5 LPA
                </p>
                <p className="text-justify text-white rounded-lg mx-2 px-2 py-0.5 text-sm bg-purple-500 w-fit">
                  Tags
                </p>
                <div className="flex gap-2 py-2">
                  <button className="text-blue-500 hover:text-purple-500 text-left ml-2">like ❤️</button>
                  <button className="text-blue-500 hover:text-purple-500 text-left ml-2">comment 🗨️</button>
                </div>
            </div>
          </a>                  
        </div>
      {/* ))} */}

    <div className="flex flex-col p-3 text-center rounded h-60 mt-10 shadow-lg bg-white">
    <p className="text-md shadow text-center mb-1 font-semibold p-1 h-auto bg-gray-100 text-grey-900 border rounded-lg border-gray-500">📌Tags</p>     
      <div className=" overflow-y-auto overflow-x-hidden scrollbar-hide">
        <a href='/pl-material/tags'>
          <p className="text-md mb-1 font-semibold p-1 w-28 h-auto hover:bg-gray-200">Tags</p>     
        </a>
        <a href='/pl-material/tags'>
          <p className="text-md mb-1 font-semibold p-1 w-28 h-auto hover:bg-gray-200">Tags</p>     
        </a>
        <a href='/pl-material/tags'>
          <p className="text-md mb-1 font-semibold p-1 w-28 h-auto hover:bg-gray-200">Tags</p>     
        </a>
        <a href='/pl-material/tags'>
          <p className="text-md mb-1 font-semibold p-1 w-28 h-auto hover:bg-gray-200">Tags</p>     
        </a>
        <a href='/pl-material/tags'>
          <p className="text-md mb-1 font-semibold p-1 w-28 h-auto hover:bg-gray-200">Tags</p>     
        </a>
        <a href='/pl-material/tags'>
          <p className="text-md mb-1 font-semibold p-1 w-28 h-auto hover:bg-gray-200">Tags</p>     
        </a>
      </div>
      </div>
    </div>
    </>
  );
}
