import { Student } from "@prisma/client";
import moment from "moment";
import Table from "components/Table/Table";

const PersonalDetailForm = ({ student }: PersonalDetailProps) => {
  return (
    <form>
      <h1 className='text-2xl font-bold mb-6'>Personal Details :</h1>
      <div className='flex'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Name :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Name'
            defaultValue={student.name}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Phone.no :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 md:text-lg'
            type='text'
            placeholder='Enter your Roll.No'
            defaultValue={student.phoneNo}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Email :
          </label>
          <input
            className='w-96 md:w-72 md:text-lg p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='email'
            placeholder='Enter your Email'
            defaultValue={student.email}
            required
          />
        </div>
      </div>

      <div className='flex'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Age :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Age'
            //@ts-ignore
            defaultValue={student.age ? student.age : ""}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Gender :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Gender'
            //@ts-ignore
            defaultValue={student.gender ? student.gender : ""}
            required
            disabled={student.gender ? true : false}
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Date Of Birth :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your  Date Of Birth'
            defaultValue={moment(student.dateOfBirth).format("MMM Do YYYY")}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Date Of Addmission :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Date Of Addmission'
            value={moment(student.admissionDate).format("MMM Do YYYY")}
            required
          />
        </div>
      </div>

      <div className='flex'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Address :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Address'
            //@ts-ignore
            defaultValue={student.address ? student.address : ""}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Cast :
          </label>
          <input
            className='w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Cast'
            //@ts-ignore
            defaultValue={student.cast ? student.cast : ""}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Religion :
          </label>
          <input
            className=' w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg md:w-fit border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.religion ? student.religion : ""}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Seat Type :
          </label>
          <input
            className=' w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.seatType ? student.seatType : ""}
            required
          />
        </div>
      </div>
      <div className='flex'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Addhar no :
          </label>
          <input
            className=' w-46 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Addhar No'
            //@ts-ignore
            defaultValue={student.addharNumber ? student.addharNumber : ""}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            10th School :
          </label>
          <input
            className=' w-46 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.tenthCollege ? student.tenthCollege : ""}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            12th College :
          </label>
          <input
            className=' w-56 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.twelthCollege ? student.twelthCollege : ""}
            required
          />
        </div>
      </div>
      <div className='flex'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Year of Passing (10th) :
          </label>
          <input
            className=' w-44 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.tenthYOP}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Year of Passing (12th) :
          </label>
          <input
            className=' w-44 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.twelthYOP}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Current Year :
          </label>
          <input
            className=' w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.year}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Section :
          </label>
          <input
            className=' w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.section}
            required
          />
        </div>
      </div>
      <div className='flex'>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Blood Type :
          </label>
          <input
            className=' w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.bloodGroup}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Height :
          </label>
          <input
            className=' w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={student.height}
            required
          />
        </div>
        <div className='flex flex-col pb-6 mr-8'>
          <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
            Weight :
          </label>
          <input
            className=' w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
            type='text'
            placeholder='Enter your Religion'
            //@ts-ignore
            defaultValue={`${student.weight} kg`}
            required
          />
        </div>
      </div>
      <div>
        <input
          className='mt-3 p-2 rounded-xl font-semibold text-md bg-purple-600 hover:bg-purple-700 cursor-pointer text-white'
          type='submit'
          value='Save Changes'
        />
      </div>
      <div className='mt-2 mb-2 md:w-[50rem]'>
        <Table
          title='Academic Details :'
          headings={[
            "Year",
            "10th",
            "12th",
            "Sem 1",
            "Sem 2",
            "Sem 3",
            "Sem 4",
            "Sem 5",
            "Sem 6",
            "Sem 7",
            "Sem 8",
          ]}
          noShadow={true}>
          <tr className='font-semibold'>
            <td className='pl-5 p-2 whitespace-nowrap'>
              <div>Score</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.tenthScore} %`}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.twelthScore} %`}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.sem1Score}`}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.sem2Score}`}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.sem3Score}`}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.sem4Score}`}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.sem5Score}`}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.sem6Score}`}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.sem7Score}`}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div>{`${student.sem8Score}`}</div>
            </td>
          </tr>
        </Table>
      </div>
    </form>
  );
};

export default PersonalDetailForm;

type PersonalDetailProps = {
  student: Student;
};
