import { Events } from '@prisma/client';
import Link from 'next/link';
import StatusColourBadge from 'components/StatusColorBadge';
import { EventsComponentsProps } from 'lib/types';

export default function OngoingEventsPage({
  events,
  forAdmin,
}: EventsComponentsProps) {
  return (
    <div className='mt-4 flex flex-wrap'>
      {events.map((event) => (
        <div
          key={event.id}
          className='w-fit min-w-[16rem] h-fit border border-black p-2 rounded m-3 bg-white'>
          <div className='flex items-center'>
            <h2 className='text-xl font-bold'>{event.title}</h2>
            <div
              className={`px-2 ml-auto border rounded-full p-1 text-sm ${StatusColourBadge(
                event.status
              )}`}>
              {event.status}
            </div>
          </div>
          <p className='text-sm my-2 italic text-slate-600'>
            Date : {event.date}
          </p>
          <div className='flex flex-wrap'>
            <Link
              href={
                forAdmin
                  ? `/incharge/events/${event.id}`
                  : `/events/${event.id}`
              }>
              <a className='border rounded p-1 text-sm w-fit border-dashed text-slate-500 border-slate-400'>
                Details
              </a>
            </Link>

            <a
              href={event.regLink}
              target='_blank'
              rel='noreferrer'
              className='ml-auto rounded p-1 text-sm w-fit bg-blue-500 text-white hover:bg-blue-700'>
              Register
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
