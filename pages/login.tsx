import { UserRole } from "@prisma/client";
import LoginForm from "components/login";
import { useState } from "react";

const LoginPage = () => {
  const [view, setView] = useState<UserRole>();
  return (
    <>
      <div className="flex h-screen items-center justify-center flex-col">
        <div className="min-w-[10em] min-h-[2em] border border-black flex rounded items-center justify-center">
          <div
            onClick={() => {
              setView(UserRole.STUDENT);
            }}
            className={`border-r border-black p-1 ${
              view == UserRole.STUDENT ? "bg-purple-700 text-white" : ""
            }`}
          >
            Student
          </div>
          <div
            onClick={() => {
              setView(UserRole.TG);
            }}
            className={`border-r border-black p-1 ${
              view == UserRole.TG ? "bg-purple-700 text-white" : ""
            }`}
          >
            Teacher Guard.
          </div>
          <div
            onClick={() => {
              setView(UserRole.HOD);
            }}
            className={`border-r border-black p-1 ${
              view == UserRole.HOD ? "bg-purple-700 text-white" : ""
            }`}
          >
            Hod
          </div>
          <div
            onClick={() => {
              setView(UserRole.INCHARGE);
            }}
            className={`p-1 ${
              view == UserRole.INCHARGE ? "bg-purple-700 text-white" : ""
            }`}
          >
            Incharge
          </div>
        </div>
        <div
          className={`${
            view == UserRole.STUDENT ? "w-full h-[15em]" : "hidden"
          }`}
        >
          <LoginForm callback="/api/auth/callback/credentials" />
        </div>
        <div
          className={`${view == UserRole.TG ? "w-full h-[15em]" : "hidden"}`}
        >
          <LoginForm callback="/api/tg/auth/callback/credentials" />
        </div>
        <div
          className={`${view == UserRole.HOD ? "w-full h-[15em]" : "hidden"}`}
        >
          <LoginForm callback="/api/hod/auth/callback/credentials" />
        </div>
        <div
          className={`${
            view == UserRole.INCHARGE ? "w-full h-[15em]" : "hidden"
          }`}
        >
          <LoginForm callback="/api/incharge/auth/callback/credentials" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
