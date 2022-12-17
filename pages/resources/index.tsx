import { UserRole } from '@prisma/client';
import { checkUserRoleAndRedirect } from 'lib/checks';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import { prisma } from 'lib/prisma';
import { ResourcesPageProps } from 'pages/tnp/resources';
import Link from 'next/link';
import moment from 'moment';

export async function getServerSideProps(context: any) {
  const materials = await prisma.placementMaterial.findMany();
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: { materials: JSON.parse(JSON.stringify(materials)) },
  });
}

export default function ResourcesPage({ materials }: ResourcesPageProps) {
  return (
    <StudentsLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-xl'>Shareview - Placement material</h1>
        <span className='text-sm mt-4 italic text-slate-400'>
          Placement material staright from traning and placement cell
        </span>

        <div className='mt-3'>
          {materials.map((material) => (
            <div
              key={material.id}
              className='border bg-white rounded p-3 border-slate-700 shadow-sm mt-4'>
                <div className='flex justify-between items-center'>
                  <h1 className='font-bold text-xl lg:text-2xl mb-2 text-gray-700 hover:text-purple-500'>
                    <Link href={`/resources/${material.id}`}>
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
              {/* <p className='lg:ml-auto text-sm text-slate-800 mb-3'>
                {moment(material.createdAt).format('MMMM Do YYYY')}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </StudentsLayout>
  );
}
