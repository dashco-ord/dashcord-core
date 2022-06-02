import Layout from "components/Layout/TgLayout";
import { useState } from "react";
import axios from "axios";
import Toast, { ToastParams } from "components/Toast";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";
import { Status, Tasks } from "@prisma/client";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const session = await getSession({});
  const tasks = await prisma.tasks.findMany({
    where: {
      //@ts-ignore
      tgId: session?.id,
    },
  });
  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tasks)),
    },
  };
}

const Tasks = ({ tasks }: TaskPageProps) => {
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

  return (
    <Layout>
      <div className="w-full h-full rounded-md bg-white p-8">
        <div>
          {toast && (
            <Toast
              type={toast.type}
              className="mb-5"
              open={true}
              setOpen={() => setToast(undefined)}
            >
              {toast.message}
            </Toast>
          )}
        </div>
        <form onSubmit={handleCreate}>
          <div className="flex items-center">
            <div className="flex flex-col pb-6 mr-8">
              <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                Task Title :
              </label>
              <input
                className="w-42 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                type="text"
                placeholder="Enter Task Title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="flex flex-col pb-6 mr-8">
              <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                Task Description :
              </label>
              <textarea
                className="w-80 h-10 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                placeholder="Enter Task Description"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="flex flex-col pb-6 mr-8">
              <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                Task Deadline Date :
              </label>
              <input
                className="w-42 h-10 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                placeholder="Enter Task Deadline Date"
                required
                type="date"
                onChange={(e) => setDeadlineDate(e.target.value)}
                value={deadlineDate}
              />
            </div>
            <div className="flex flex-col pb-6 mr-8">
              <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                Task Deadline Time :
              </label>
              <input
                className="w-42 h-10 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                placeholder="Enter Task Deadline Time"
                required
                type="time"
                onChange={(e) => setDeadlineTime(e.target.value)}
                value={deadlineTime}
              />
            </div>
            <div className="p-2 w-fit h-fit bg-purple-600 rounded-lg">
              <input
                type="submit"
                className="text-white font-bold"
                value={`+ Create Task`}
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
        <hr className="border-black border-opacity-30" />
        <h1 className="text-xl mt-10 font-bold">Current Tasks : </h1>
        <div className="flex flex-wrap">
          {tasks &&
            tasks
              .slice(0)
              .reverse()
              .map((task) => (
                <div key={task.id}>
                  <div className="break-words min-h-[13rem] w-[25rem] font-semibold mt-10 mr-10 border border-black p-5 rounded-lg">
                    <div className="flex items-center">
                      <div className="text-3xl mb-2 font-bold p-1">
                        {task.title}
                      </div>
                      <div
                        className={`ml-auto border p-1 px-2 w-fit text-sm rounded-full ${
                          task.taskStatus == Status.InProgress
                            ? "border-yellow-400 text-yellow-400"
                            : "border-green-400 text-green-400"
                        }`}
                      >
                        {task.taskStatus}
                      </div>
                    </div>
                    <div>{`DeadLine : ${task.deadlineDate} by ${task.deadlineTime}`}</div>
                    <div className="mt-2 text-justify">{task.description}</div>
                  </div>
                  <br />
                </div>
              ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;

type TaskPageProps = {
  tasks: Tasks[];
};
