import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className='flex bg-black h-screen'>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
