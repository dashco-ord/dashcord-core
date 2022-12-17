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
        {/* <h1 className='font-bold text-xl'>Shareview - Placement material</h1>
        <span className='text-sm mt-4 italic text-slate-400'>
          Deliver placement material straight to your students
        </span> */}

        {/* <form className='mt-10 border border-slate-400 rounded min-h-[5rem] p-2 bg-white w-10/12'>
          <div className='flex flex-col pb-6'>
            <label className='text-lg font-semibold mr-5 pb-2 md:text-lg'>
              Title: *
            </label>
            <input
              className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
              type='text'
              placeholder='E.g. Placement material for TCS'
              required
              defaultValue={material.title}
              readOnly={true}
            />
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-lg font-semibold mr-5 pb-2 md:text-lg'>
              Links: *
            </label>
            {material.links.split(',').map((link) => (
              <a
                href={`${link}`}
                key={link}
                className='p-2 pl-0 text-blue-600 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
                target='_blank'
                rel='noreferrer'>
                {link}
              </a>
            ))}
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-lg font-semibold mr-5 pb-2 md:text-lg'>
              Body: *
            </label>
            <textarea
              className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75 min-h-[15rem]'
              placeholder='E.g. Placement material for TCS'
              required
              defaultValue={material.body}
              readOnly={true}
            />
          </div>
        </form> */}

        <div className="w-screen h-screen bg-slate-100 p-10 flex flex-col items-center">
            <h1 className="p-2 rounded font-extrabold text-5xl text-gray-50 bg-purple-500 from-purple-500 to-blue-500">{material.title}</h1>
            <p className="text-lg text-gray-500">(Explore the content level by level given on <strong>{material.title}</strong>)</p>
            <div className='m-2 w-3/4'>
                <table className="my-10 bg-white" style={{width: '100%',}}>
                  <tr className="text-center py-4">
                    <td className="font-semibold text-lg border border-black rounded">Levels</td>
                    {material.body.split(', ').map((level) => (
                      <>
                      <td className=" border border-black rounded">{level}</td>
                      </>
                      ))}
                  </tr>
                  <tr className="text-center py-4">
                    <td className="font-semibold text-lg border border-black rounded">Links</td>
                    {material.links.split(', ').map((link) => (
                    <td className=" border border-black rounded text-blue-500"><a href={`${link}`} target="_blank">{link}</a></td>
                    ))}
                    {/* <td className=" border border-black rounded">Html & CSS</td>
                    <td className="text-blue-500 hover:underline border border-black rounded"><a href="https://youtube.com/codewithharry" target="_blank" rel="noopener">https://youtube.com/codewithharry</a></td> */}
                  </tr>
                  {/* <tr className="text-center">
                    <td className=" border border-black rounded">Level 2</td>
                    <td className=" border border-black rounded">Javascript</td>
                    <td className="text-blue-500 hover:underline border border-black rounded"><a href="https://youtube.com/codewithharry" target="_blank" rel="noopener">https://youtube.com/codewithharry</a></td>
                  </tr> */}
                </table>
            </div>
        </div>
      </div>
    </StudentsLayout>
  );
}
