import axios from "axios";
import LoadingIcon from "components/LoadingIcon";
import { useState } from "react";
import Toast, { ToastParams } from "components/Toast";

const PersonalDetailForm = () => {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [doa, setDoa] = useState("");
  const [address, setAddress] = useState("");
  const [cast, setCast] = useState("");
  const [religion, setReligion] = useState("");
  const [seatType, setSeatType] = useState("");
  const [addharNo, setAddharNo] = useState("");
  const [currentYear, setCurrentYear] = useState(0);
  const [section, setSection] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastParams>();

  const handlePersonalDetails = async () => {
    setLoading(true);
    const data = {
      type: "personalDetails",
      age: age ? age : null,
      gender: gender ? gender : null,
      dob: dob ? dob : null,
      doa: doa ? doa : null,
      address: address ? address : null,
      cast: cast ? cast : null,
      religion: religion ? religion : null,
      seatType: seatType ? seatType : null,
      addharNo: addharNo ? addharNo : null,
      currentYear: currentYear ? currentYear : null,
      section: section ? section : null,
      bloodType: bloodType ? bloodType : null,
      height: height ? height : null,
      weight: weight ? weight : null,
    };
    try {
      const res = await axios.post("/api/signup", data);
      if (res.status == 200) {
        setToast({
          type: "success",
          message: "Personal Details Saved, Plese move on",
        });
      }
    } catch (error) {
      console.log(error);
      setToast({
        type: "error",
        message: "There was Some error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <fieldset className="border border-black p-3 rounded w-fit">
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

      <legend className="text-2xl font-bold mb-6 px-2">
        Personal Details :
      </legend>

      <div className="flex flex-wrap">
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Age :
          </label>
          <input
            className="p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="text"
            placeholder="Enter your Age"
            onChange={(e) => setAge(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Gender :
          </label>
          <select
            className="p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-Bianry</option>
          </select>
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Date Of Birth :
          </label>
          <input
            className="p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="date"
            placeholder="Enter your  Date Of Birth"
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Date Of Addmission :
          </label>
          <input
            className="p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="date"
            placeholder="Enter your Date Of Addmission"
            onChange={(e) => setDoa(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Address :
          </label>
          <input
            className="p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="text"
            placeholder="Enter your Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Cast :
          </label>
          <input
            className="p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="text"
            placeholder="Enter your Cast"
            onChange={(e) => setCast(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Religion :
          </label>
          <input
            className=" p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm md: border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="text"
            placeholder="Enter your Religion"
            onChange={(e) => setReligion(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Seat Type :
          </label>
          <input
            className=" p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="text"
            placeholder="Enter your Seat Type"
            onChange={(e) => setSeatType(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Addhar no :
          </label>
          <input
            className=" p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="number"
            placeholder="Enter your Addhar No"
            onChange={(e) => setAddharNo(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Current Year :
          </label>
          <input
            className="  p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="number"
            placeholder="Enter your Current year"
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Section :
          </label>
          <input
            className=" p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="text"
            placeholder="Enter your Section"
            onChange={(e) => setSection(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Blood Type :
          </label>
          <input
            className=" p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="text"
            placeholder="Enter your Blood Type"
            onChange={(e) => setBloodType(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Height :
          </label>
          <input
            className=" p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="text"
            placeholder="Enter your Height"
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col pb-6 mr-8">
          <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
            Weight :
          </label>
          <input
            className=" p-2 pl-0 rounded-sm bg-white text-xl md:text-lg sm:text-sm border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
            type="text"
            placeholder="Enter your Weight"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>

      <button
        className="mt-5 p-2 w-fit flex items-center text-white text-md font-semibold bg-blue-500 hover:bg-blue-900 rounded"
        type="submit"
        disabled={isLoading}
        onClick={handlePersonalDetails}
      >
        <span className="pl-1 pr-2 ">Save Changes</span>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        )}
      </button>
    </fieldset>
  );
};

export default PersonalDetailForm;
