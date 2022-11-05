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
      <div className='mt-7'>
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className='flex flex-col gap-1 shadow-md break-words min-h-fit w-full mb-3 rounded-lg bg-white'>
            <p className='text-md mb-1 font-semibold p-2 py-1 bg-gray-200 rounded-t-lg'>
              👤 {experience?.Student.name}
            </p>
            <div className='flex items-center justify-between'>
              <Link
                href={`${
                  forAdmins
                    ? `/tnp/shareview/${experience.id}`
                    : `/shareview/${experience.id}`
                }`}>
                <a className='text-xl font-semibold px-2'>
                  {' '}
                  {experience.title}{' '}
                </a>
              </Link>
              <p className='text-justify text-white rounded-lg mx-4 px-2 py-0.5 text-sm bg-gray-500 w-fit'>
                {moment(experience.createdAt).format('MMM Do YYYY')}
              </p>
            </div>
            <p className='ml-2 mb-2 text-sm'>
              Role : {experience.role} | Company : {experience.company} |
              Package : {experience.salary} LPA | Criteria :{' '}
              {experience.criteria}%
            </p>
            <p className='text-justify text-white rounded-lg mx-2 px-2 py-0.5 text-sm bg-purple-500 w-fit'>
              {experience.tags}
            </p>
            <div className='flex gap-2 py-2'>
              <button className='text-blue-500 hover:text-purple-500 text-left ml-2'>
                like ❤️
              </button>
              <button className='text-blue-500 hover:text-purple-500 text-left ml-2'>
                comment 🗨️
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
