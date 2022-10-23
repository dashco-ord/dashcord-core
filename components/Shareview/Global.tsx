import { Experience } from "@prisma/client";
import moment from "moment";

type GlobalFeedProps = {
  experiences: Experience[];
};

export default function GlobalFeed({ experiences }: GlobalFeedProps) {
  return (
    <>
      <div className='mt-7'>
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className='border bg-white rounded p-3 border-slate-700 shadow-sm'>
            <h1 className='font-bold text-xl lg:text-3xl mb-2'>
              {experience.title}
            </h1>

            <p className='mb-2 text-sm'>
              Role : {experience.role} | Company : {experience.company} |
              Package : {experience.salary} LPA | Criteria :{" "}
              {experience.criteria}%
            </p>

            <p className='text-sm text-slate-600 mb-4'>
              Tags : {experience.tags}
            </p>

            <div className='flex flex-wrap flex-col-reverse lg:flex-row w-full'>
              <div className='flex items-center'>
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

              <p className='lg:ml-auto text-sm text-slate-800 mb-3'>
                By -{" "}
                {
                  //@ts-ignore
                  experience?.Student.name
                }{" "}
                on {moment(experience.createdAt).format("MMM Do YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
