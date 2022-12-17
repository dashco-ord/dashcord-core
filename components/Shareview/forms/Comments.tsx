import { useState } from "react";
import Router from "next/router";
import axios from "axios";
import { CommentsComponentProps } from "lib/types";
import moment from "moment";

export default function Comments({
  comments,
  userEmail,
  experienceID,
}: CommentsComponentProps) {
  const [newComment, setNewComment] = useState<string>();

  async function handleComments(e: any) {
    e.preventDefault();
    const data = {
      by: userEmail,
      body: newComment,
      experienceId: experienceID,
    };

    try {
      const res = await axios.post("/api/shareview/createComment", data);
      if (res.status == 200) {
        Router.reload();
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="flex flex-col rounded mt-2 w-2/3 mr-[7.25rem] ml-auto p-5 bg-white shadow-md">
      <h1 className="text-sm font-semibold bg-gray-500 text-white rounded-full p-1 px-3 w-fit">
        Comments
      </h1>
      <fieldset className="flex justify-between items-start mt-2">
        <div className="flex flex-col ml-1">
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col items-start gap-60">
              <div className="flex my-0.5 gap-2 items-center">
                <p className="font-semibold flex items-center">
                  {/* user svg */}
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 60 60"
                    className="w-5 h-5 mx-1 pl-1"
                  >
                    <path
                      d="M48.014,42.889l-9.553-4.776C37.56,37.662,37,36.756,37,35.748v-3.381c0.229-0.28,0.47-0.599,0.719-0.951
                        c1.239-1.75,2.232-3.698,2.954-5.799C42.084,24.97,43,23.575,43,22v-4c0-0.963-0.36-1.896-1-2.625v-5.319
                        c0.056-0.55,0.276-3.824-2.092-6.525C37.854,1.188,34.521,0,30,0s-7.854,1.188-9.908,3.53C17.724,6.231,17.944,9.506,18,10.056
                        v5.319c-0.64,0.729-1,1.662-1,2.625v4c0,1.217,0.553,2.352,1.497,3.109c0.916,3.627,2.833,6.36,3.503,7.237v3.309
                        c0,0.968-0.528,1.856-1.377,2.32l-8.921,4.866C8.801,44.424,7,47.458,7,50.762V54c0,4.746,15.045,6,23,6s23-1.254,23-6v-3.043
                        C53,47.519,51.089,44.427,48.014,42.889z"
                    />
                    <g></g>
                  </svg>
                  {
                    //@ts-ignore
                    comment?.Student.name
                  }
                  <span className="text-blue-500">))</span>
                </p>
                <em className="mt-0.5">{comment.body}</em>
                <a href="#" className="">
                  {/* delete svg */}
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 284.011 284.011"
                    className="w-4 h-5"
                  >
                    <g>
                      <g>
                        <path
                          d="M235.732,66.214l-28.006-13.301l1.452-3.057c6.354-13.379,0.639-29.434-12.74-35.789L172.316,2.611
                          c-6.48-3.079-13.771-3.447-20.532-1.042c-6.76,2.406-12.178,7.301-15.256,13.782l-1.452,3.057L107.07,5.106
                          c-14.653-6.958-32.239-0.698-39.2,13.955L60.7,34.155c-1.138,2.396-1.277,5.146-0.388,7.644c0.89,2.499,2.735,4.542,5.131,5.68
                          l74.218,35.25h-98.18c-2.797,0-5.465,1.171-7.358,3.229c-1.894,2.059-2.839,4.815-2.607,7.602l13.143,157.706
                          c1.53,18.362,17.162,32.745,35.588,32.745h73.54c18.425,0,34.057-14.383,35.587-32.745l11.618-139.408l28.205,13.396
                          c1.385,0.658,2.845,0.969,4.283,0.969c3.74,0,7.328-2.108,9.04-5.712l7.169-15.093C256.646,90.761,250.386,73.175,235.732,66.214z
                          M154.594,23.931c0.786-1.655,2.17-2.905,3.896-3.521c1.729-0.614,3.59-0.521,5.245,0.267l24.121,11.455
                          c3.418,1.624,4.878,5.726,3.255,9.144l-1.452,3.057l-36.518-17.344L154.594,23.931z M169.441,249.604
                          c-0.673,8.077-7.55,14.405-15.655,14.405h-73.54c-8.106,0-14.983-6.328-15.656-14.405L52.35,102.728h129.332L169.441,249.604z
                          M231.62,96.835l-2.878,6.06L83.057,33.701l2.879-6.061c2.229-4.695,7.863-6.698,12.554-4.469l128.661,61.108
                          C231.845,86.509,233.85,92.142,231.62,96.835z"
                          color="red"
                          strokeWidth={2}
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start rounded mt-2 mr-5">
          <form onSubmit={handleComments}>
            <textarea
              className="p-2 w-full rounded bg-white text-sm md:text-base border-2 border-gray-500 focus:outline-none focus:border-blue-300 transition ease-in-out delay-75 duration-75"
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Comment your thoughts"
              required
            />
            <button
              type="submit"
              value="comment"
              className="text-white bg-purple-500 border py-0.5 px-3 my-2 rounded"
            >
              Comment
            </button>
          </form>
        </div>
      </fieldset>

      {/* <div className='flex w-full'>
      <div>
        <h3 className='font-bold text-lg'>Comments : </h3>
        <form onSubmit={handleComments}>
          <textarea
            className='p-2 w-full rounded bg-white text-sm md:text-base border-2 border-gray-500 focus:outline-none focus:border-blue-300 transition ease-in-out delay-75 duration-75'
            placeholder='Comment your thoughts'
            required
            onChange={(e) => setNewComment(e.target.value)}
          />
          <br />
          <input
            type='submit'
            value='comment'
            className='text-white text-sm bg-purple-500 border py-0.5 px-3 my-2 rounded'
          />
        </form>
      </div>
      <div className="w-1/2">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className='bg-white shadow w-fit p-3 rounded mt-3 max-w-[40rem]'>
            <div className='flex mb-1'>
              <p className='italic text-sm'>
                {
                  //@ts-ignore
                  comment?.Student.name
                }
              </p>
              <p className='italic text-sm ml-auto'>
                {moment(comment.createdAt).format('MMM Do YYYY')}
              </p>
            </div>

            <hr />
            <div className='mt-1'>{comment.body}</div>
          </div>
        ))}
      </div>
      </div> */}
    </div>
  );
}
