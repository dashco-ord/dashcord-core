import axios from 'axios';
import { useRouter } from 'next/router';

import { useState } from 'react';

export default function CreateResourceForm() {
  const [title, setTitle] = useState<string>();
  const [links, setLinks] = useState<string>();
  const [body, setBody] = useState<string>();
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const data = {
      title,
      links,
      body,
    };

    try {
      const res = await axios.post('/api/tnp/resources', data);
      if (res.status === 200) {
        router.reload();
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className='mt-8 flex flex-col'>
      <h2 className='text-xl font-semibold text-slate-800 mt-6 mb-6'>
        Share Placement material :
      </h2>

      <form
        className='border border-slate-400 rounded min-h-[5rem] p-2 bg-white w-10/12'
        onSubmit={handleSubmit}>
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
          />
        </div>

        <div className='flex flex-col pb-6 '>
          <label className='text-lg font-semibold mr-5 pb-2 md:text-lg'>
            Links: *
          </label>

          <input
            className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Note : Seprtae Links by Commas'
            required
            onChange={(e) => setLinks(e.target.value)}
          />
        </div>

        <div className='flex flex-col pb-6 '>
          <label className='text-lg font-semibold mr-5 pb-2 md:text-lg'>
            Body: *
          </label>

          <textarea
            className='p-2 pl-0 rounded-sm bg-white text-sm md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-purple-500 transition ease-in-out delay-75 duration-75'
            placeholder='E.g. Placement material for TCS'
            required
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div>
          <input
            className='mb-4 p-2 rounded font-semibold text-md bg-purple-500 hover:bg-purple-700 cursor-pointer text-white'
            type='submit'
            value='+ Create Material'
          />
        </div>
      </form>
    </div>
  );
}
