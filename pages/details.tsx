import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const DetailsPage = () => {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [validity, setValidity] = useState("");
  const [address, setAddress] = useState("");
  const [religion, setReligion] = useState("");
  const [admission, setAdmission] = useState("");

  const addDetails = async (e: any) => {
    e.preventDefault();
    const data = {
      gender,
      dob,
      validity,
      address,
      religion,
      admission,
    };
    const res = await axios.put("/api/signup", data);
    if (res.status == 200) {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <form
        className=" border-2 border-slate-200 p-10 rounded-lg lg:w-1/5 sm:w-10/12 xl:w-1/5"
        onSubmit={addDetails}
      >
        <div className="flex flex-col pb-6">
          <label className="text-xl text-slate-600 font-semibold mr-5 pb-2">
            Gender :
          </label>
          <select
            className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div className="flex flex-col pb-6">
          <label className="text-xl text-slate-600 font-semibold mr-5 pb-2">
            Date Of Birth :
          </label>
          <input
            className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            type="date"
            placeholder="Enter your Date Of Birth"
            required
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="flex flex-col pb-6">
          <label className="text-xl text-slate-600 font-semibold mr-5 pb-2">
            Cast validity no :
          </label>
          <input
            className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            type="number"
            placeholder="Enter your  Cast validity no."
            required
            onChange={(e) => setValidity(e.target.value)}
          />
        </div>

        <div className="flex flex-col pb-6">
          <label className="text-xl text-slate-600 font-semibold mr-5 pb-2">
            Address :
          </label>
          <input
            className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            type="text"
            placeholder="Enter your Address"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="flex flex-col pb-3">
          <div className="flex flex-wrap items-baseline">
            <label className="text-xl text-slate-600 font-semibold mr-auto pb-2">
              Religion :
            </label>
          </div>
          <input
            className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            type="text"
            placeholder="Enter your Religion"
            required
            onChange={(e) => setReligion(e.target.value)}
          />
        </div>

        <div className="flex flex-col pb-3">
          <div className="flex flex-wrap items-baseline">
            <label className="text-xl text-slate-600 font-semibold mr-auto pb-2">
              Admission Date :
            </label>
          </div>
          <input
            className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            type="date"
            placeholder="Enter your  Admission Date"
            required
            onChange={(e) => setAdmission(e.target.value)}
          />
        </div>

        <input
          className="mt-5 p-2 w-24 text-white text-md font-semibold bg-purple-500 rounded-full"
          type="submit"
          value="Submit"
          required
        />
      </form>
    </div>
  );
};

export default DetailsPage;
