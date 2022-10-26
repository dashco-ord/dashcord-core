import { Experience } from "@prisma/client";
import axios from "axios";
import Router from "next/router";
import { useState } from "react";

export type ExperienceModalProps = {
  experience: Experience;
  forAdmin: boolean;
};

export default function ExperienceModal({
  experience,
  forAdmin,
}: ExperienceModalProps) {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState(""); // package is reserved word in typescript strict mode
  const [criteria, setCriteria] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [body, setBody] = useState("");

  async function handleUpdate(e: any) {
    e.preventDefault();
    const data = {
      id: experience.id,
      title: title ? title : experience.title,
      role: role ? role : experience.role,
      company: company ? company : experience.company,
      salary: salary ? salary : experience.salary,
      criteria: criteria ? criteria : experience.criteria,
      tags: tags ? tags : experience.tags,
      link: link ? link : experience.link,
      body: body ? body : experience.body,
    };
    try {
      const res = await axios.post("/api/shareview/updatePost", data);
      if (res.status == 200) {
        Router.push("/tnp/shareview");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(e: any) {
    e.preventDefault();
    const data = {
      id: experience.id,
    };
    try {
      const res = await axios.post("/api/shareview/deletePost", data);
      if (res.status == 200) {
        Router.push("/tnp/shareview");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='mt-auto bg-white lg:w-[40rem] p-3 rounded overflow-y-scroll'>
      <fieldset className='border border-black p-3 rounded bg-white h-screen lg:h-auto'>
        <legend className='text-xl font-bold mb-6 px-2'>
          Interview Experience Details :
        </legend>

        <form onSubmit={handleUpdate}>
          <div className='flex flex-col pb-6 '>
            <label className='text-xl font-semibold mr-5 pb-2 md:text-lg'>
              Post Title: *
            </label>

            <input
              className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
              type='text'
              placeholder='Ex. Data Analyst Interview Experience at TCS for 4 LPA'
              required
              defaultValue={experience.title}
              readOnly={forAdmin ? false : true}
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
                defaultValue={experience.role}
                readOnly={forAdmin ? false : true}
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
                defaultValue={experience.company}
                readOnly={forAdmin ? false : true}
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
                defaultValue={experience.criteria}
                readOnly={forAdmin ? false : true}
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
                defaultValue={experience.salary}
                readOnly={forAdmin ? false : true}
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
              defaultValue={experience.tags}
              readOnly={forAdmin ? false : true}
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
              defaultValue={experience.link}
              readOnly={forAdmin ? false : true}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-xl font-semibold mr-5 pb-2 md:text-lg'>
              Body(Brief Experience): *
            </label>
            <textarea
              className='h-64 p-2 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75 lg:h-72'
              defaultValue={experience.body}
              readOnly={forAdmin ? false : true}
              onChange={(e) => setBody(e.target.value)}
            />
            {/* <div>{experience.body}</div> */}
          </div>

          {forAdmin ? (
            <div className='flex w-fit'>
              <div>
                <input
                  className='mb-4 p-2 rounded font-semibold text-md bg-purple-500 hover:bg-purple-700 cursor-pointer text-white'
                  type='submit'
                  value='Save changes'
                />
              </div>
              <div>
                <div
                  className='w-max ml-4 mb-4 p-2 rounded font-semibold text-md bg-red-500 hover:bg-red-700 cursor-pointer text-white'
                  onClick={handleDelete}>
                  Delete Post
                </div>
              </div>
            </div>
          ) : null}
        </form>
      </fieldset>
    </div>
  );
}
