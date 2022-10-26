import axios from "axios";
import Router from "next/router";
import { useState } from "react";

export default function CreateExperience() {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState(""); // package is reserved word in typescript strict mode
  const [criteria, setCriteria] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      title,
      role,
      company,
      salary,
      criteria,
      tags,
      link,
      body,
    };
    try {
      const res = await axios.post("/api/shareview/createPost", data);
      if (res.status == 200) {
        Router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2 className='text-xl font-semibold text-slate-800 mt-6 mb-6'>
        Share your Interview Experience :
      </h2>

      <fieldset className='border border-black p-3 rounded bg-white'>
        <legend className='text-xl font-bold mb-6 px-2'>
          Interview Experience Details :
        </legend>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col pb-6 '>
            <label className='text-xl font-semibold mr-5 pb-2 md:text-lg'>
              Post Title: *
            </label>

            <input
              className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
              type='text'
              placeholder='Ex. Data Analyst Interview Experience at TCS for 4 LPA'
              required
              onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className='flex items-center justify-evenly'>
              2.
              <input
                className='p-2 pl-0 w-3/4 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
                type='text'
                placeholder='Company Name (Ex. TCS)'
                required
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className='flex items-center justify-evenly'>
              <abbr title='if no criteria enter 35%'>3.</abbr>
              <input
                className='p-2 pl-0 w-3/4 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
                type='number'
                placeholder='Eligibility Criteria in % (Ex. 60)'
                required
                onChange={(e) => setCriteria(e.target.value)}
              />
            </div>

            <div className='flex items-center justify-evenly'>
              4.
              <input
                className='p-2 pl-0 w-3/4 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
                type='text'
                placeholder='Package (Ex. 4.5)'
                required
                onChange={(e) => setSalary(e.target.value)}
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
              onChange={(e) => setTags(e.target.value)}
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
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-xl font-semibold mr-5 pb-2 md:text-lg'>
              Body(Brief Experience): *
            </label>
            <textarea
              className='p-2 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
              rows={5}
              placeholder='Explain your experience along with the questions asked serialwise'
              required
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div>
            <input
              className='mb-4 p-2 rounded font-semibold text-md bg-purple-500 hover:bg-purple-700 cursor-pointer text-white'
              type='submit'
              value='+ Create Post'
            />
          </div>
        </form>
      </fieldset>
    </div>
  );
}
