import { Experience } from '@prisma/client';
import StringFilterItem from 'components/FilterItems/StringFilterItem';
import { ModifiedExperienceType } from 'lib/interfaces';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';

export type GlobalFeedProps = {
  feed: ModifiedExperienceType[];
  forAdmins: boolean;
};

export default function GlobalFeed({ feed, forAdmins }: GlobalFeedProps) {
  const [experiences, setExperiences] =
    useState<ModifiedExperienceType[]>(feed);
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <>
      <div className='mt-4'>
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className='flex flex-col gap-1 shadow-md break-words min-h-fit w-full mb-3 rounded-lg bg-white'>
            <p className='text-md mb-1 font-semibold p-2 py-1.5 bg-gray-200 rounded-t-lg flex items-center'>
              <svg
                version='1.1'
                id='Capa_1'
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                viewBox='0 0 60 60'
                className='w-5 h-5 mx-1 pl-1'>
                <path
                  d='M48.014,42.889l-9.553-4.776C37.56,37.662,37,36.756,37,35.748v-3.381c0.229-0.28,0.47-0.599,0.719-0.951
                      c1.239-1.75,2.232-3.698,2.954-5.799C42.084,24.97,43,23.575,43,22v-4c0-0.963-0.36-1.896-1-2.625v-5.319
                      c0.056-0.55,0.276-3.824-2.092-6.525C37.854,1.188,34.521,0,30,0s-7.854,1.188-9.908,3.53C17.724,6.231,17.944,9.506,18,10.056
                      v5.319c-0.64,0.729-1,1.662-1,2.625v4c0,1.217,0.553,2.352,1.497,3.109c0.916,3.627,2.833,6.36,3.503,7.237v3.309
                      c0,0.968-0.528,1.856-1.377,2.32l-8.921,4.866C8.801,44.424,7,47.458,7,50.762V54c0,4.746,15.045,6,23,6s23-1.254,23-6v-3.043
                      C53,47.519,51.089,44.427,48.014,42.889z'
                />
                <g></g>
              </svg>
              {experience?.Student.name}
            </p>
            <div className='flex items-center justify-between ml-4'>
              <Link
                href={`${
                  forAdmins
                    ? `/tnp/shareview/${experience.id}`
                    : `/shareview/${experience.id}`
                }`}>
                <a className='text-xl font-semibold'> {experience.title} </a>
              </Link>
              <p className='text-justify text-white rounded-lg mx-4 px-2 py-0.5 text-sm bg-gray-500 w-fit'>
                {moment(experience.createdAt).format('MMM Do YYYY')}
              </p>
            </div>
            <p className='ml-2 mb-1 text-sm pl-2'>
              Role : {experience.role} | Company : {experience.company} |
              Package : {experience.salary} LPA | Criteria :{' '}
              {experience.criteria}%
            </p>
            <p className='text-justify text-white text-xs flex ml-4'>
              {experience.tags.split(', ').map((tag) => (
                <p
                  key={tag}
                  className='bg-purple-500 w-fit rounded-lg px-2 py-0.5 mr-1'>
                  {tag}
                </p>
              ))}
            </p>

            <div className='flex items-center ml-4 my-1 mb-3'>
              <p className='flex items-center'>
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
              <p>
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
              </p>
              Comments
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
