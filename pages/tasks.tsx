import { Tasks, UserRole, Status } from "@prisma/client";
import StudentsLayout from "components/Layouts/StudentsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";

type taskProps = {
  tasks: Tasks[];
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  const tasks = await prisma.tasks.findMany({
    where: {Student:{}},
  });
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: { tasks: JSON.parse(JSON.stringify(tasks)) },
  });
};

const TasksPage = ({ tasks }: taskProps) => {
  return (
    <StudentsLayout>
      <div className='w-full bg-white p-4 rounded'>
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
                    <button className='ml-auto mt-3 px-3 p-1 border border-green-400 rounded-full w-fit flex'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6 text-green-400'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
                        />
                      </svg>

                      <div className='ml-1 font-semibold text-green-400'>
                        Done
                      </div>
                    </button>
                  </div>
                  <br />
                </div>
              ))}
        </div>
      </div>
    </StudentsLayout>
  );
};

export default TasksPage;
