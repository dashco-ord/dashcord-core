import HodLayout from "components/Layout/HodLayout";
import Table from "components/Table/Table";

const TgsPage = () => {
  return (
    <HodLayout>
      <div className='w-full flex flex-row mb-5'>
        <form className=' ml-auto'>
          <input
            type='search'
            placeholder={` Search by name or email`}
            className='p-1 rounded-md shadow-sm'
          />
        </form>
      </div>
      <Table
        title="Tg's"
        headings={[
          "Name",
          "email",
          "Contact",
          "Department",
          "Gender",
          "No. of Students",
        ]}></Table>
    </HodLayout>
  );
};

export default TgsPage;
