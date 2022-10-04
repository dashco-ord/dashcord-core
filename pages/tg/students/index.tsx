import TgsLayout from "components/Layouts/TgsLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Student } from "@prisma/client";
import Table from "components/Tables/Table";
import Card from "components/Cards/Card";
import Toast, { ToastParams } from "components/Toast";
import Link from "next/link";
import readXlsxFile from "read-excel-file";
import { AssesmentSchema as schema } from "lib/xlSchema";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [xlFile, setXlFile] = useState();
  const [toast, setToast] = useState<ToastParams>();
  const [year, setYear] = useState(0);
  const [sheetType, setsheetType] = useState("");
  const [assesmentType, setAssesmentType] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/tg/students");

      setStudents(res.data);
    } catch (e) {
      setToast({
        type: "error",
        message: "There was an error while fetching the students",
      });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const genderColor = (gender: string) => {
    switch (gender) {
      case "male":
        return "text-white bg-purple-800";
      case "female":
        return "text-white bg-pink-800";
    }
  };

  const handleAssesmnetSheet = async () => {
    //@ts-ignore
    const data = await readXlsxFile(xlFile, { schema }).then(({ rows }) => {
      return rows;
    });
    if (assesmentType != "") {
      const res = await axios.post("/api/tg/students/updateAssesment", {
        data,
        assesmentType,
        year,
      });
      if (res.status == 200) {
        setToast({
          type: "success",
          message:
            "File Has been processed please wait the for the page to reload",
        });
      }
    } else {
      setToast({
        type: "error",
        message: "Please select a assesment type",
      });
    }
  };

  const handleAttendanceSheet = async () => {
    const schema = {
      "ROLL NO": {
        prop: "rollNo",
      },
      "STUDENT NAME": {
        prop: "name",
      },
      "LECTURE 1": {
        prop: "lecture1",
      },
      "LECTURE 2": {
        prop: "lecture2",
      },
      "LECTURE 3": {
        prop: "lecture3",
      },
      "LECTURE 4": {
        prop: "lecture4",
      },
      "LECTURE 5": {
        prop: "lecture5",
      },
      "LECTURE 6": {
        prop: "lecture6",
      },
    };
    //@ts-ignore
    const data = await readXlsxFile(xlFile, { schema }).then(({ rows }) => {
      return rows;
    });
    const res = await axios.post("/api/tg/students/updateAttendance", {
      data,
      year,
    });
    if (res.status == 200) {
      setToast({
        type: "success",
        message:
          "File Has been processed please wait the for the page to reload",
      });
    }
  };

  const handelXls = async (e: any) => {
    e.preventDefault();
    setToast({
      type: "warning",
      message: "The file is under processing please wait...",
    });
    try {
      switch (sheetType) {
        case "assesment":
          handleAssesmnetSheet();
          break;

        case "attendance":
          handleAttendanceSheet();
          break;

        default:
          setToast({
            type: "error",
            message: " Please select a sheet type",
          });
          break;
      }
    } catch (error) {
      setToast({
        type: "error",
        message:
          "There was an error while processing the file please re-check it and try again",
      });
    }
  };

  return (
    <TgsLayout>
      <div>
        {toast && (
          <Toast
            type={toast.type}
            className="mb-5"
            open={true}
            setOpen={() => setToast(undefined)}
          >
            {toast.message}
          </Toast>
        )}
      </div>

      <div className="flex mb-10">
        <Card title="All Students" value={students.length} />
      </div>

      <Table
        title="All Students"
        headings={["name", "rollNo", "email", "gender", "department"]}
      >
        {students.map((student) => (
          <tr key={student?.rollNo}>
            <td className="pl-5 p-2 whitespace-nowrap text-violet-700">
              <Link href={`/tg/students/${student?.rollNo}`}>
                <a>{student?.name}</a>
              </Link>
            </td>
            <td className="p-2 whitespace-nowrap">{student?.rollNo}</td>
            <td className="p-2 whitespace-nowrap text-indigo-500">
              <a href={`mailto:${student?.email}`}>{student?.email}</a>
            </td>
            <td
              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${genderColor(
                //@ts-ignore
                student.gender
              )}`}
            >
              {student.gender}
            </td>
            <td className="p-2 whitespace-nowrap">{student.department}</td>
          </tr>
        ))}
      </Table>
      <div className="mt-5 flex">
        <div className="flex list-none mr-3">
          <select
            name="Year "
            className="mr-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            <option value={0}>select a year</option>
            <option value={2}>2nd</option>
            <option value={3}>3rd</option>
            <option value={4}>4th</option>
          </select>

          <select
            name="For "
            className="mr-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            onChange={(e) => setsheetType(e.target.value)}
          >
            <option value="2">Which sheet is this</option>
            <option value="assesment">Assesmnet</option>
            <option value="attendance">Attendance</option>
          </select>

          {sheetType == "assesment" && (
            <select
              name="For "
              className="mr-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
              onChange={(e) => setAssesmentType(e.target.value)}
            >
              <option value="2">Which Assesmnet</option>
              <option value="TAE1">TAE1</option>
              <option value="TAE2">TAE2</option>
              <option value="TAE3">TAE3</option>
              <option value="TAE4">TAE4</option>
              <option value="CAE1">CAE1</option>
              <option value="CAE2">CAE2</option>
            </select>
          )}
        </div>
        <form onSubmit={handelXls}>
          <input
            className="rounded-sm border p-1 border-gray-400"
            type="file"
            onChange={(e) =>
              setXlFile(
                //@ts-ignore
                e.target.files[0]
              )
            }
          />
          <input
            className={`ml-7 rounded-sm p-1 px-2 text-lg font-semibold text-white ${
              xlFile
                ? "bg-blue-600 cursor-pointer"
                : "bg-blue-200 cursor-not-allowed"
            }`}
            type="submit"
            value="upload"
            disabled={xlFile ? false : true}
          />
        </form>
      </div>
    </TgsLayout>
  );
};

export default StudentsPage;
