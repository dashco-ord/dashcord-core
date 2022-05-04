import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className='flex bg-black h-screen'>
      <Sidebar />
      <main className='m-14 h-100 w-full'>{children}</main>
    </div>
  );
};

export default Layout;
