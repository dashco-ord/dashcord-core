import Sidebar from "components/Sidebar/TgSidebar";

const Layout = ({ children }: any) => {
  return (
    <div className='flex'>
      <section className='fixed h-screen overflow-hidden'>
        <Sidebar />
      </section>
      <section className='ml-16 w-[95rem] flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-10 h-screen bg-slate-100'>
        <main>{children}</main>
      </section>
    </div>
  );
};

export default Layout;
