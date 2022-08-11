import Link from "next/link";
import { getCsrfToken } from "next-auth/react";

const LoginPage = ({ csrfToken }: any) => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <form
        className=" border-2 border-slate-200 p-10 rounded-lg lg:w-1/5 sm:w-10/12 xl:w-1/5"
        method="post"
        action="/api/incharge/auth/callback/credentials"
      >
        {/* This hidden input field is need for passing csrfToken that is received from getServerSidePRops */}
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <div className="flex flex-col pb-6">
          <label className="text-xl text-slate-600 font-semibold mr-5 pb-2">
            Email :
          </label>
          <input
            className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            type="email"
            placeholder="Enter your Email"
            required
            name="email"
          />
        </div>

        <div className="flex flex-col pb-3">
          <div className="flex flex-wrap items-baseline">
            <label className="text-xl text-slate-600 font-semibold mr-auto pb-2">
              Password :
            </label>
            <div>
              <Link href="/password/forgot">
                <a className="text-sm text-purple-500">Forgot password ?</a>
              </Link>
            </div>
          </div>

          <input
            className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            type="password"
            placeholder="Enter your Password"
            required
            name="password"
          />
        </div>

        <input
          className="mt-5 p-2 w-24 text-white text-md font-semibold bg-purple-500 rounded-full"
          type="submit"
          value="Sign In"
          required
        />
        <p className="text-slate-600 mt-5">
          {"Got no account ? here "}
          <Link href="/signup">
            <a className="text-blue-500 hover:underline">sign up</a>
          </Link>
          {" for one"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
