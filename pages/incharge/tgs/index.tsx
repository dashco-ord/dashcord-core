import { Tg, UserRole } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Toast, { ToastParams } from "components/Toast";
import Table from "components/Tables/Table";
import InchargesLayout from "components/Layouts/InchargesLayout";
import Pagination from "components/Pagination";
import { checkUserRoleAndRedirect } from "lib/checks";

export async function getServerSideProps(context: any) {
  return checkUserRoleAndRedirect(context, UserRole.INCHARGE, {});
}

const TgsPage = () => {
  const [tgs, setTgs] = useState<Tg[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [toast, setToast] = useState<ToastParams>();

  const fetchTgs = async ({ page } = { page: 1 }) => {
    try {
      const res = await axios.get("/api/hod/tgs", { params: { page } });
      setTgs(res.data.tgs);
      setTotal(res.data.total);
      setPage(page);
    } catch (error) {
      setToast({
        type: "error",
        message: "There was an error while fetching the Tg's",
      });
    }
  };

  useEffect(() => {
    fetchTgs();
  }, []);

  const handleNavigate = async (page: any) => {
    await fetchTgs({ page });
  };

  return (
    <InchargesLayout>
      <div>
        {toast && (
          <Toast
            type={toast.type}
            className='mb-5'
            open={true}
            setOpen={() => setToast(undefined)}>
            {toast.message}
          </Toast>
        )}
      </div>

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
        ]}
        refresh={() => fetchTgs()}>
        {tgs?.map((tg) => (
          <tr key={tg.id}>
            <td className='pl-5 p-2 whitespace-nowrap text-violet-400'>
              <Link href={`/incharge/tgs/${tg.id}`}>
                <a>{tg.name}</a>
              </Link>
            </td>
            <td className='p-2 whitespace-nowrap text-indigo-300'>
              <a href={`mailto:${tg.email}`}>{tg.email}</a>
            </td>
            <td className='p-2 whitespace-nowrap'>{tg.phoneNo}</td>
            <td className='p-2 whitespace-nowrap'>{tg.department}</td>
            <td className='p-2 whitespace-nowrap'>{tg.gender}</td>
            <td className='p-2 whitespace-nowrap'>
              {
                //@ts-ignore
                tg.Student.length
              }
            </td>
          </tr>
        ))}
      </Table>
      <Pagination
        currentPage={page}
        onNavigation={handleNavigate}
        total={total}
      />
    </InchargesLayout>
  );
};

export default TgsPage;
