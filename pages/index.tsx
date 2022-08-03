import { useState } from "react";
import axios from "axios";
import Toast, { ToastParams } from "components/Toast";
import { useRouter } from "next/router";
import LoadingIcon from "components/LoadingIcon";

const DefaultSignup = () => {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [toast, setToast] = useState<ToastParams>();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  let signUp = false;

  const handleSignUp = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (password == confirm) {
      signUp = true;
    }

    const data = {
      rollNo: rollNo ? rollNo : null,
      name: name ? name : null,
      contact: contact ? contact : null,
      email: email ? email : null,
      password: password ? password : null,
    };

    try {
      if (signUp) {
        const res = await axios.post("/api/signup", data);
        if (res.status == 200) {
          setToast({
            type: "success",
            message: "Signed up",
          });
          // router.push("/details");
        }
      } else {
        setToast({
          type: "error",
          message: "Password didn't match bitch",
        });
        throw "password not matching";
      }
    } catch (error) {
      setToast({
        type: "error",
        message: "There was an error while Signing you up",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen w-full items-center justify-center'>
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
      <form
        className='mt-5 border-2 border-slate-200 p-10 rounded-lg lg:w-1/5 sm:w-10/12 xl:w-1/5'
        onSubmit={handleSignUp}>
        <div className='flex flex-col pb-6'>
          <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
            Roll No. :
          </label>
          <input
            className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
            type='text'
            placeholder='Enter your Roll No'
            required
            name='rollNo'
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>

        <div className='flex flex-col pb-6'>
          <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
            Name :
          </label>
          <input
            className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
            type='text'
            placeholder='Enter your Name'
            required
            name='name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='flex flex-col pb-6'>
          <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
            Contact no. :
          </label>
          <input
            className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
            type='text'
            placeholder='Enter your Contact no.'
            required
            name='name'
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        <div className='flex flex-col pb-6'>
          <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
            Email :
          </label>
          <input
            className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
            type='email'
            placeholder='Enter your Email'
            required
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='flex flex-col pb-6'>
          <div className='flex flex-wrap items-baseline'>
            <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
              Password :
            </label>
          </div>
          <input
            className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
            type='password'
            placeholder='Enter your Password'
            required
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='flex flex-col pb-6'>
          <div className='flex flex-wrap items-baseline'>
            <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
              Confirm Password :
            </label>
          </div>
          <input
            className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
            type='password'
            placeholder='Enter your Password'
            required
            name='password'
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <button
          className='mt-5 p-2 w-fit flex items-center text-white text-md font-semibold bg-purple-500 rounded-full'
          type='submit'
          disabled={isLoading}>
          <span className='pl-1 pr-1'>SignUp</span>
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default DefaultSignup;
