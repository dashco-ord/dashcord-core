import Sidebar from "components/Sidebar/TgSidebar";

const Layout = ({ children }: any) => {
  return (
    <div className='flex bg-slate-200 h-screen'>
      <Sidebar />
      <main className='m-14 h-100 w-full overflow-y-visible'>{children}</main>
    </div>
  );
};

export default Layout;
