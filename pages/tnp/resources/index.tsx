import { PlacementMaterial, UserRole } from '@prisma/client';
import CreateResourceForm from 'components/Forms/CreateResource';
import TnpLayout from 'components/Layouts/TnpLayout';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { useState } from 'react';
import { prisma } from 'lib/prisma';
import Link from 'next/link';
import moment from 'moment';

export async function getServerSideProps(context: any) {
  const materials = await prisma.placementMaterial.findMany();
  return checkUserRoleAndRedirect(context, UserRole.TNP, {
    extra: { materials: JSON.parse(JSON.stringify(materials)) },
  });
}

export type ResourcesPageProps = {
  materials: PlacementMaterial[];
};

export default function ResourcesAdminPage({ materials }: ResourcesPageProps) {
  const [view, setView] = useState('all');

  return (
    <TnpLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-xl'>Shareview - Placement material</h1>
        <span className='text-sm mt-4 italic text-slate-400'>
          Deliver placement material straigth to your students
        </span>

        <div className='mt-5 border border-slate-400 flex rounded w-fit text-sm lg:text-md'>
          <p
            className={`border-r-2 pr-1 p-1 cursor-pointer ${
              view === 'all' ? 'bg-purple-500 text-white' : 'text-slate-600'
            }`}
            onClick={() => setView('all')}>
            All Material
          </p>
          <p
            className={` pr-1 p-1 cursor-pointer ${
              view === 'post' ? 'bg-purple-500 text-white' : 'text-slate-600'
            }`}
            onClick={() => setView('post')}>
            Post Material
          </p>
        </div>

        {view === 'post' ? <CreateResourceForm /> : null}
        {view === 'all' ? (
          <div className='mt-7'>
            {materials.map((material) => (
              <div
                key={material.id}
                className='border bg-white rounded p-3 border-slate-700 shadow-sm mt-4'>
                <div className='flex justify-between items-center'>
                  <h1 className='font-bold text-xl lg:text-2xl mb-2 text-gray-700 hover:text-purple-500'>
                    <Link href={`/tnp/resources/${material.id}`}>
                      <a>{material.title}</a>
                    </Link>
                  </h1>
                  <p className='text-xs text-gray-50 bg-gray-700 p-[0.15rem] px-1.5 rounded-md'>
                    {moment(material.createdAt).format('MMMM YYYY')}
                  </p>
                </div>
                <div className='flex gap-1'>
              {
                material.links.split(", ").map((link) =>
              <a href={`${link}`} target="_blank" className='px-2 text-sm mb-3 bg-purple-500 rounded-lg w-fit text-white'>
                Resource
              </a>
                )
              }
              </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </TnpLayout>
  );
}
