import { Friends } from "@prisma/client";

const FriendsDetailForm = ({
  friends,
  username,
  noSave,
}: FriendsDetailProps) => {
  return (
    <form className='ml-10 md:ml-0 md:mt-4'>
      <h1 className='text-2xl font-bold mb-6'>Friends Details :</h1>
      <h1 className='text-lg font-semibold mb-5 text-slate-600'>
        College Friends
      </h1>
      <div className='flex flex-wrap'>
        {
          //@ts-ignore
          friends?.collegeFriend.map((friend: any) =>
            friend.name == username ? (
              <div></div>
            ) : (
              <div key={friend.id}>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg flex items-center'>
                    {`${friend.name}`}
                    <a
                      href={`/TG/students/${friend.id}`}
                      className='text-violet-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 ml-1'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                        />
                      </svg>
                    </a>
                  </label>
                  <input
                    className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                    type='text'
                    placeholder='Enter your Brothers Name'
                    defaultValue={friend.phoneNo}
                    required
                  />
                </div>
              </div>
            )
          )
        }
      </div>
      <div>
        <input
          className={`mb-4 p-2 rounded-xl font-semibold text-md bg-purple-600 hover:bg-purple-700 cursor-pointer text-white ${
            noSave ? "hidden" : ""
          }`}
          type='submit'
          value='Save Changes'
        />
      </div>
    </form>
  );
};

export default FriendsDetailForm;

type FriendsDetailProps = {
  friends: Friends;
  username: string;
  noSave?: boolean;
};
