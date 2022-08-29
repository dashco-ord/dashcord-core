import TgsLayout from "components/Layouts/TgsLayout";
import { useState } from "react";
import axios from "axios";
import Toast, { ToastParams } from "components/Toast";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";
import { Status, Tasks, Tg, UserRole } from "@prisma/client";
import { useRouter } from "next/router";
import { checkUserRoleAndRedirect } from "lib/checks";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const tasks = await prisma.tasks.findMany({
    where: {
      //@ts-ignore
      createdBy: session?.id,
    },
  });
  return checkUserRoleAndRedirect(context, UserRole.TG, {
    extra: { tasks: JSON.parse(JSON.stringify(tasks)) },
  });
}

const Tasks = ({ tasks, user }: TaskPageProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastParams>();

  const router = useRouter();

  const handleCreate = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      id: user.id,
      title,
      description,
      deadlineDate,
      deadlineTime,
    };
    try {
      const res = await axios.post("/api/tg/create-task", data);
      if (res.status == 200) {
        setToast({
          type: "success",
          message: "Task Created Successfully",
        });
        setTitle("");
        setDescription("");
        setDeadlineDate("");
        setDeadlineTime("");
        router.reload();
      }
      setLoading(false);
    } catch (error) {
      setToast({
        type: "error",
        message: "There was an error while Creating task",
      });
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete("/api/tg/delete-task", {
        params: { id },
      });
      if (res.status == 200) {
        setToast({
          type: "success",
          message: "Task Deleted Successfully",
        });
        router.reload();
      }
    } catch (error) {
      setToast({
        type: "error",
        message: "There was an error while Deleting task",
      });
    }
  };

  return (
    <TgsLayout>
      <div className='w-full h-full rounded-md bg-white p-8'>
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
                Task Title :
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
                Task Description :
              </label>
              <textarea
                className='w-80 h-10 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                placeholder='Enter Task Description'
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className='flex flex-col pb-6 mr-8'>
              <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                Task Deadline Date :
              </label>
              <input
                className='w-42 h-10 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                placeholder='Enter Task Deadline Date'
                required
                type='date'
                onChange={(e) => setDeadlineDate(e.target.value)}
                value={deadlineDate}
              />
            </div>
            <div className='flex flex-col pb-6 mr-8'>
              <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                Task Deadline Time :
              </label>
              <input
                className='w-42 h-10 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                placeholder='Enter Task Deadline Time'
                required
                type='time'
                onChange={(e) => setDeadlineTime(e.target.value)}
                value={deadlineTime}
              />
            </div>
            <div className='p-2 w-fit h-fit bg-purple-600 rounded-lg'>
              <input
                type='submit'
                className='text-white font-bold'
                value={`+ Create Task`}
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
        <hr className='border-black border-opacity-30' />
        <h1 className='text-xl mt-10 font-bold'>Current Tasks : </h1>
        <div className='flex flex-wrap'>
          {tasks &&
            tasks
              .slice(0)
              .reverse()
              .map((task) => (
                <div key={task.id}>
                  <div className='flex flex-col break-words min-h-[13rem] w-[25rem] font-semibold mt-10 mr-10 border border-black p-5 rounded-lg'>
                    <div className='flex items-center'>
                      <div className='text-3xl mb-2 font-bold p-1'>
                        {task.title}
                      </div>
                      <div
                        className={`ml-auto border p-1 px-2 w-fit text-sm rounded-full ${
                          task.taskStatus == Status.InProgress
                            ? "border-yellow-400 text-yellow-400"
                            : "border-green-400 text-green-400"
                        }`}>
                        {task.taskStatus}
                      </div>
                    </div>
                    <div>{`DeadLine : ${task.deadlineDate} by ${task.deadlineTime}`}</div>
                    <div className='mt-2 text-justify'>{task.description}</div>
                    <button
                      className='ml-auto mt-3 px-3 p-1 border border-red-400 rounded-full w-fit flex'
                      onClick={() => handleDelete(task.id)}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-red-400'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                      <div className='ml-1 font-semibold text-red-400'>
                        Delete
                      </div>
                    </button>
                  </div>
                  <br />
                </div>
              ))}
        </div>
      </div>
    </TgsLayout>
  );
};

export default Tasks;

type TaskPageProps = {
  tasks: Tasks[];
  user: Tg;
};
