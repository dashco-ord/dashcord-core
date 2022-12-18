import { UserRole } from '@prisma/client';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { prisma } from 'lib/prisma';
import StudentsLayout from 'components/Layouts/StudentsLayout';
import { ResourcePageProps } from 'pages/tnp/resources/[slug]';

export async function getServerSideProps(context: any) {
  const material = await prisma.placementMaterial.findUnique({
    where: { id: context.params.slug },
  });
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: { material: JSON.parse(JSON.stringify(material)) },
  });
}

export default function ResourceAdminPage({ material }: ResourcePageProps) {
  return (
    <StudentsLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <div className='w-screen h-screen bg-slate-100 p-10 flex flex-col items-center'>
          <h1 className='p-2 rounded font-extrabold text-5xl text-gray-50 bg-purple-500 from-purple-500 to-blue-500'>
            {material.title}
          </h1>
          <p className='text-lg text-gray-500'>
            (Explore the content level by level given on{' '}
            <strong>{material.title}</strong>)
          </p>
          <div className='m-2 w-3/4'>
            <table className='my-10 bg-white' style={{ width: '100%' }}>
              <tr className='text-center py-4'>
                <td className='font-semibold text-lg border border-black rounded'>
                  Levels
                </td>
                {material.body.split(', ').map((level) => (
                  <>
                    <td className=' border border-black rounded'>{level}</td>
                  </>
                ))}
              </tr>
              <tr className='text-center py-4'>
                <td className='font-semibold text-lg border border-black rounded'>
                  Links
                </td>
                {material.links.split(', ').map((link) => (
                  <td
                    key={link}
                    className=' border border-black rounded text-blue-500'>
                    <a href={`${link}`} target='_blank' rel='noreferrer'>
                      {link}
                    </a>
                  </td>
                ))}
              </tr>
            </table>
          </div>
        </div>
      </div>
    </StudentsLayout>
  );
}
