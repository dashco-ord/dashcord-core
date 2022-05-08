const DetailsPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <form className=" border-2 border-slate-200 p-10 rounded-lg lg:w-1/5 sm:w-10/12 xl:w-1/5">
        <div className="flex flex-col pb-6">
          <label className="text-xl text-slate-600 font-semibold mr-5 pb-2">
            Gender :
          </label>
          <select className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75">
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
          />
        </div>

        <div className="flex flex-col pb-6">
          <label className="text-xl text-slate-600 font-semibold mr-5 pb-2">
            Cast validity no :
          </label>
          <input
            className="p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75"
            type="text"
            placeholder="Enter your  Cast validity no."
            required
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
          />
        </div>

        <input
          className="mt-5 p-2 w-24 text-white text-md font-semibold bg-purple-500 rounded-full"
          type="submit"
          value="Next"
          required
        />
      </form>
    </div>
  );
};

export default DetailsPage;
