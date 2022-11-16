import Link from 'next/link';
import StatusColourBadge from 'components/StatusColorBadge';
import { EventsComponentsProps } from 'lib/types';
import { useEffect, useState } from 'react';
import StringFilterItem from 'components/FilterItems/StringFilterItem';

export default function ConcludedEventsPage({
  events,
  forAdmin,
}: EventsComponentsProps) {
  return (
    <div className='mt-2 flex flex-col justify-center'>
      {events.map((event) => (
        <div
          key={event.id}
          className='min-w-[30rem] h-fit border border-black p-2 rounded mt-2 bg-white'>
          <div className='flex items-center'>
            <h2 className='text-2xl font-bold'>{event.title}</h2>
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
              <a className='p-1 text-md underline text-slate-500 border-slate-400 mt-auto'>
                Read more
              </a>
            </Link>
          </div>
          {event?.Student != null && (
            <p className='mt-2 italic'>
              Won by{' '}
              {
                //@ts-ignore
                event?.Student.name
              }
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
