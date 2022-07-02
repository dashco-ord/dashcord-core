import { Tg } from "@prisma/client";
import axios from "axios";
import HodLayout from "components/HodLayout";
import Pagination from "components/Pagination";
import Table from "components/Table/Table";
import Link from "next/link";
import { useEffect, useState } from "react";
import Toast, { ToastParams } from "components/Toast";

const TgsPage = () => {
  const [tgs, setTgs] = useState<Tg[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [toast, setToast] = useState<ToastParams>();

  const fetchTgs = async ({ page } = { page: 1 }) => {
    try {
      const res = await axios.get("/api/tgs", { params: { page } });
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
    <HodLayout>
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
              <Link href={`/HOD/tgs/${tg.id}`}>
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
    </HodLayout>
  );
};

export default TgsPage;
