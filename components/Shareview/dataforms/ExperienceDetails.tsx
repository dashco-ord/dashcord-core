import { Experience, Student, UserRole, Comments } from '@prisma/client';
import { useState, useEffect } from 'react';
import { prisma } from 'lib/prisma';
import { checkUserRoleAndRedirect } from 'lib/checks';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import moment from 'moment';
import { ModifiedExperienceType } from 'lib/interfaces';
import { getServerSideProps } from '../../../pages/shareview/[slug]'

export type ExperienceModalProps = {
  experience: ModifiedExperienceType;
  forAdmin: boolean;
  tnp: boolean;
  user: Student;
  comments: Comments;
};

export default function ExperienceDetails({
  experience,
  forAdmin,
  tnp,
  user,
  comments
}: ExperienceModalProps) {
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState(''); // package is reserved word in typescript strict mode
  const [criteria, setCriteria] = useState('');
  const [tags, setTags] = useState('');
  const [link, setLink] = useState('');
  const [body, setBody] = useState('');
  const [follow, setFollow] = useState(false);
  const [comment, setComment] = useState<string>();

  async function handleComments(e: any) {
    e.preventDefault();
    const data = {
      by: user.email,
      body: comment,
      experienceId: experience.id,
    };

    try {
      const res = await axios.post('/api/shareview/createComment', data);
      if (res.status == 200) {
        Router.reload();
      }
    } catch (error) {
      alert(error);
    }
  }
  

  async function handleDelete(e: any) {
    e.preventDefault();
    const data = {
      id: experience.id,
    };
    try {
      const res = await axios.post('/api/shareview/deletePost', data);
      if (res.status == 200) {
        tnp ? Router.push('/tnp/shareview') : Router.push('/shareview');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-4/3' key={experience.id}>
      <div className='flex justify-center gap-10'>
        <div className='w-60 shadow-md rounded h-fit p-4 py-8 bg-white'>
          <div className='flex flex-col gap-1'>
            <p className='text-gray-700 text-lg font-semibold flex items-center'>
              
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 60 60" className="w-5 h-5 mx-1">
                <path d="M48.014,42.889l-9.553-4.776C37.56,37.662,37,36.756,37,35.748v-3.381c0.229-0.28,0.47-0.599,0.719-0.951
                  c1.239-1.75,2.232-3.698,2.954-5.799C42.084,24.97,43,23.575,43,22v-4c0-0.963-0.36-1.896-1-2.625v-5.319
                  c0.056-0.55,0.276-3.824-2.092-6.525C37.854,1.188,34.521,0,30,0s-7.854,1.188-9.908,3.53C17.724,6.231,17.944,9.506,18,10.056
                  v5.319c-0.64,0.729-1,1.662-1,2.625v4c0,1.217,0.553,2.352,1.497,3.109c0.916,3.627,2.833,6.36,3.503,7.237v3.309
                  c0,0.968-0.528,1.856-1.377,2.32l-8.921,4.866C8.801,44.424,7,47.458,7,50.762V54c0,4.746,15.045,6,23,6s23-1.254,23-6v-3.043
                  C53,47.519,51.089,44.427,48.014,42.889z"/>
                <g>
                </g>
              </svg>
              
              {experience?.Student.name}
            </p>
            <hr className='border-gray-400' />

            {/* <form action='' method='POST'>
              <button
                className={`px-2 py-0.5 mt-2 border border-purple-700 rounded text-sm hover:text-purple-500 hover:bg-white ${
                  follow ? 'text-purple-500 bg-white' : 'text-white bg-purple-500'
                }`}>
                {follow ? 'Following' : 'Follow'}
                </button>
              </form> */}
              <a
                href="https://www.linkedin.com/in/pranay-kharabe-b01456207/" target="_blank"
                className={`px-2 py-0.5 mt-2 border w-fit font-semibold border-purple-700 rounded text-sm hover:text-purple-500 hover:bg-white text-white bg-blue-600`}>
                  in
                </a>

          </div>
        </div>

        <div className='w-2/3'>
          <div className='shadow rounded bg-white'>
            <div className='flex flex-col gap-1 p-4'>
              <div className='flex items-center justify-between'>
                <h1 className='font-bold text-3xl text-gray-800 w-5/6'>
                  {experience.title}
                </h1>
                <p className='text-justify text-white rounded-lg mx-4 px-2 py-0.5 text-sm bg-gray-500 w-fit'>
                  {moment(experience.createdAt).format('MMM Do YYYY')}
                </p>
              </div>
              <p className='text-gray-500 font-semibold text-lg'>
                Role : {experience.role} | Company : {experience.company} |
                Package : {experience.salary} LPA | Criteria :{' '}
                {experience.criteria}%
              </p>
              <p className="text-justify text-white text-xs flex">
                  {experience.tags.split(", ").map(tag =>(
                    <p className="bg-purple-500 w-fit rounded-lg px-2 py-0.5 mr-1">{tag}</p>
                  ))}
                  {experience.link ? (
                  <a href={experience.link} target="_blank" className='text-gray-50 bg-blue-500 w-fit rounded-lg text-xs px-2 py-0.5 mr-1'>
                    Short Video
                  </a>
                  ) : null} 
              </p>
              <p className='text-gray-800 mt-2 text-lg text-justify whitespace-pre-wrap'>
                {experience.body}
              </p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center my-1'>
                  <p className='flex items-center cursor-pointer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5 mr-1 text-red-500'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                      />
                    </svg>
                    {experience.likes ? experience.likes : 0} Likes
                  </p>
                  <p className="flex italic-center cursor-pointer">
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5 ml-4 mr-1'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z'
                      />
                    </svg>
                    Comments
                  </p>
                </div> 
                {forAdmin ? (
                  <div className='flex w-fit items-center mx-2'>
                    <div>
                      <Link
                        href={`${
                          tnp
                            ? `/tnp/shareview/edit/${experience.id}`
                            : `/shareview/edit/${experience.id}`
                        }`}>
                        <a className='cursor-pointer p-3'>
                          <svg version="1.1" id="Capa_1" x="0px" y="0px"
                            viewBox="0 0 59.985 59.985" className="w-4 h-4">
                            <g>
                              <path d="M5.243,44.844L42.378,7.708l9.899,9.899L15.141,54.742L5.243,44.844z"/>
                              <path d="M56.521,13.364l1.414-1.414c1.322-1.322,2.05-3.079,2.05-4.949s-0.728-3.627-2.05-4.949S54.855,0,52.985,0
                                s-3.627,0.729-4.95,2.051l-1.414,1.414L56.521,13.364z"/>
                              <path d="M4.099,46.527L0.051,58.669c-0.12,0.359-0.026,0.756,0.242,1.023c0.19,0.19,0.446,0.293,0.707,0.293
                                c0.106,0,0.212-0.017,0.316-0.052l12.141-4.047L4.099,46.527z"/>
                              <path d="M43.793,6.294l1.415-1.415l9.899,9.899l-1.415,1.415L43.793,6.294z"/>
                            </g>
                            <g></g>
                          </svg>
                        </a>
                      </Link>
                    </div>
                    <div>
                      <div
                        className='p-3 rounded font-semibold text-sm cursor-pointer text-white'
                        onClick={handleDelete}>
                          <abbr title='Delete'>
                          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 284.011 284.011" className="w-4 h-5">
                            <g><g>
                              <path d="M235.732,66.214l-28.006-13.301l1.452-3.057c6.354-13.379,0.639-29.434-12.74-35.789L172.316,2.611
                                c-6.48-3.079-13.771-3.447-20.532-1.042c-6.76,2.406-12.178,7.301-15.256,13.782l-1.452,3.057L107.07,5.106
                                c-14.653-6.958-32.239-0.698-39.2,13.955L60.7,34.155c-1.138,2.396-1.277,5.146-0.388,7.644c0.89,2.499,2.735,4.542,5.131,5.68
                                l74.218,35.25h-98.18c-2.797,0-5.465,1.171-7.358,3.229c-1.894,2.059-2.839,4.815-2.607,7.602l13.143,157.706
                                c1.53,18.362,17.162,32.745,35.588,32.745h73.54c18.425,0,34.057-14.383,35.587-32.745l11.618-139.408l28.205,13.396
                                c1.385,0.658,2.845,0.969,4.283,0.969c3.74,0,7.328-2.108,9.04-5.712l7.169-15.093C256.646,90.761,250.386,73.175,235.732,66.214z
                                M154.594,23.931c0.786-1.655,2.17-2.905,3.896-3.521c1.729-0.614,3.59-0.521,5.245,0.267l24.121,11.455
                                c3.418,1.624,4.878,5.726,3.255,9.144l-1.452,3.057l-36.518-17.344L154.594,23.931z M169.441,249.604
                                c-0.673,8.077-7.55,14.405-15.655,14.405h-73.54c-8.106,0-14.983-6.328-15.656-14.405L52.35,102.728h129.332L169.441,249.604z
                                M231.62,96.835l-2.878,6.06L83.057,33.701l2.879-6.061c2.229-4.695,7.863-6.698,12.554-4.469l128.661,61.108
                                C231.845,86.509,233.85,92.142,231.62,96.835z" color='red' strokeWidth={2} />
                            </g></g>
                          </svg>
                          </abbr>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
