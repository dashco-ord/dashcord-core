import Header from "components/Header";
import TgSidebar from "components/Sidebar/TGsidebar";

const TgsLayout = ({ children }: any) => {
  return (
    <div className='flex flex-col lg:flex-row'>
      <section className='fixed h-screen overflow-hidden hidden lg:block'>
        <TgSidebar />
      </section>
      <section className='lg:hidden bg-white w-full h-12 p-2 z-30'>
        <div className='mr-1'>
          <Header />
        </div>
      </section>
      <section className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-8 lg:p-10 h-screen bg-slate-100 lg:ml-16 lg:items-center'>
        <main>{children}</main>
      </section>
    </div>
  );
};

export default TgsLayout;
