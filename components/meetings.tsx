import { Meetings } from "@prisma/client";
import { useState } from "react";
import Toast, { ToastParams } from "components/Toast";

export default function MeetingsComponent({ meetings }: meetingProps) {
  const [toast, setToast] = useState<ToastParams>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleCreate = async () => {};

  return (
    <div>
      <div>
        {toast && (
          <Toast
            type={toast.type}
            className='mb-5'
            open={true}
            setOpen={() => setToast(undefined)}>
            {toast.message}
          </Toast>
        )}
      </div>
      <form onSubmit={handleCreate}>
        <div className='flex items-center'>
          <div className='flex flex-col pb-6 mr-8'>
            <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
              Meeting Title :
            </label>
            <input
              className='w-42 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
              type='text'
              placeholder='Enter Task Title'
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className='flex flex-col pb-6 mr-8'>
            <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
              Meeting Description :
            </label>
            <textarea
              className='w-80 h-10 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
              placeholder='Enter Task Description'
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className='p-2 w-fit h-fit bg-purple-600 rounded-lg'>
            <input
              type='submit'
              className='text-white font-bold'
              value={`+ Create Meeting`}
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

type meetingProps = {
  meetings: Meetings[];
};
