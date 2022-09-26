import { Meetings } from "@prisma/client";
import { useState } from "react";
import Toast, { ToastParams } from "components/Toast";
import axios from "axios";
import moment from "moment";

export default function MeetingsComponent({
  meetings,
  studentId,
}: meetingProps) {
  const [toast, setToast] = useState<ToastParams>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const data = {
      title,
      description,
      studentId,
    };
    try {
      const res = await axios.post("/api/tg/createMeeting", data);
      if (res.status == 200) {
        setToast({
          type: "success",
          message: "Created Successfully",
        });
      }
    } catch (error) {
      setToast({
        type: "error",
        message: "Cant create meetings",
      });
    }
  };

  return (
    <div>
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
              Meeting Title :
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
              Meeting Description :
            </label>
            <textarea
              className="w-80 h-10 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
              placeholder="Enter Task Description"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="p-2 w-fit h-fit bg-purple-600 rounded-lg">
            <input
              type="submit"
              className="text-white font-bold"
              value={`+ Create Meeting`}
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
      <div>
        <h1>Past Meeting Details</h1>
        <div>
          {meetings.map((meeting) => (
            <div key={meeting.id}>
              <div className="flex flex-col break-words min-h-[13rem] w-[25rem] font-semibold mt-10 mr-10 border border-black p-5 rounded">
                <div className="flex items-center">
                  <div className="text-3xl mb-2 font-bold p-1">
                    {meeting.title}
                  </div>
                </div>
                <div className=" text-slate-700">{`Recorded At : ${moment(
                  meeting.createdAt
                ).format("MMMM Do YYYY, h:mm:ss a")}`}</div>
                <div className=" text-slate-700">{`Created By : ${
                  //@ts-ignore
                  meeting?.TG.name
                }`}</div>

                <div className="mt-2 text-justify text-lg">
                  {meeting.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type meetingProps = {
  meetings: Meetings[];
  studentId: String;
};
