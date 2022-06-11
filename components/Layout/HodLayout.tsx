import HodSidebar from "components/Sidebar/HodSidebar";

const HodLayout = ({ children }: any) => {
  return (
    <div className='flex'>
      <section className='fixed h-screen overflow-hidden'>
        <HodSidebar />
      </section>
      <section className='ml-16 w-[95rem] flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-10 h-screen bg-slate-100'>
        <main>{children}</main>
      </section>
    </div>
  );
};

export default HodLayout;
