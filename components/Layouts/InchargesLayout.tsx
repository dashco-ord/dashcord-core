import Header from "components/Header";
import InchargesSidebar from "components/Sidebar/InchargesSidebar";
import { useState } from "react";

const InchargesLayout = ({ children }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className='flex flex-col lg:flex-row'>
      <section
        className={`overflow-y-scroll fixed h-screen overflow-hidden lg:block ${
          show ? "block z-50" : "hidden"
        }`}>
        <InchargesSidebar />
      </section>
      <section className='lg:hidden bg-white w-full h-12 p-2 z-30 overflow-y-scroll'>
        <div className='flex'>
          <div className='ml-auto'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              onClick={() => setShow(!show)}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </div>
        </div>
      </section>
      <section
        className={`flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-8 lg:p-10 h-screen bg-slate-100 lg:ml-16 lg:justify-center lg:block ${
          show ? "hidden" : "block"
        }`}>
        <main>{children}</main>
      </section>
    </div>
  );
};
export default InchargesLayout;
