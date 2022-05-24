import Sidebar from "components/Sidebar/TgSidebar";
import Head from "next/head";

const Layout = ({ children }: any) => {
  return (
    <div className='flex bg-slate-200 h-screen'>
      <Head>
        <title>Dashcord - Home</title>
      </Head>
      <Sidebar />
      <main className='m-14 h-100 w-full overflow-y-visible'>{children}</main>
    </div>
  );
};

export default Layout;
