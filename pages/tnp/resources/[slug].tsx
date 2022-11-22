import TnpLayout from 'components/Layouts/TnpLayout';
import { PlacementMaterial, UserRole } from '@prisma/client';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { prisma } from 'lib/prisma';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getServerSideProps(context: any) {
  const material = await prisma.placementMaterial.findUnique({
    where: { id: context.params.slug },
  });
  return checkUserRoleAndRedirect(context, UserRole.TNP, {
    extra: { material: JSON.parse(JSON.stringify(material)) },
  });
}

export type ResourcePageProps = {
  material: PlacementMaterial;
};

export default function ResourceAdminPage({ material }: ResourcePageProps) {
  const [title, setTitle] = useState<string>();
  const [links, setLinks] = useState<string>();
  const [body, setBody] = useState<string>();
  const router = useRouter();

  async function handleUpdate(e: any) {
    e.preventDefault();

    const data = {
      id: material.id,
      title: title ? title : material.title,
      links: links ? links : material.links,
      body: body ? body : material.body,
    };
    try {
      const res = await axios.put('/api/tnp/resources/updateResource', data);
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function handleDelete() {
    const data = {
      id: material.id,
    };

    try {
      const res = await axios.post('/api/tnp/resources/deleteResource', data);
      if (res.status === 200) {
        router.push('/tnp/resources');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <TnpLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-xl'>Shareview - Placement material</h1>
        <span className='text-sm mt-4 italic text-slate-400'>
          Deliver placement material straight to your students
        </span>

        <form
          className='mt-10 border border-slate-400 rounded min-h-[5rem] p-2 bg-white w-10/12'
          onSubmit={handleUpdate}>
          <div className='flex flex-col pb-6'>
            <label className='text-lg font-semibold mr-5 pb-2 md:text-lg'>
              Title: *
            </label>

            <input
              className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
              type='text'
              placeholder='E.g. Placement material for TCS'
              required
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={material.title}
            />
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-lg font-semibold mr-5 pb-2 md:text-lg'>
              Links: *
            </label>
              <input
                className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
                defaultValue={material.links}
              />
          </div>

          <div className='flex flex-col pb-6 '>
            <label className='text-lg font-semibold mr-5 pb-2 md:text-lg'>
              Body: *
            </label>

            <textarea
              className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75 min-h-[15rem]'
              placeholder='E.g. Placement material for TCS'
              required
              onChange={(e) => setBody(e.target.value)}
              defaultValue={material.body}
            />
          </div>

          <div className='flex'>
            <input
              className='mb-4 p-2 rounded font-semibold text-md bg-purple-500 hover:bg-purple-700 cursor-pointer text-white'
              type='submit'
              value='Update Material'
            />
            <div
              className='ml-auto mb-4 p-2 rounded font-semibold text-md bg-red-400 hover:bg-red-700 cursor-pointer text-white w-fit'
              onClick={handleDelete}>
              Delete Material
            </div>
          </div>
        </form>
      </div>
    </TnpLayout>
  );
}
