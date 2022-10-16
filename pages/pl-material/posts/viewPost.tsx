import {useState, useEffect} from 'react';

export default function ViewPost () {
    const [follow, setFollow] = useState(() => {
        return false;
  });

  useEffect(() => {
    // Persist state to localStorage
    localStorage.setItem("follow", JSON.stringify(follow));
  }, [follow]);

    const onClick = () => {
        setFollow(!follow);
    }
    return(
        <div className="w-4/3 mt-5">
            <div className="flex justify-center gap-10">
                <div className="w-44 shadow-md rounded h-fit p-4">
                    <div className="flex flex-col gap-1">
                    <h5 className="text-gray-700 text-lg font-semibold">PranayK</h5>
                    <hr className="border-gray-400" />
                    
                    <form
                        action=""
                        method="POST"
                        >
                        <button onClick={onClick} className={`px-2 py-1 mt-2 border border-green-700 rounded hover:text-green-500 hover:bg-white ${ follow ? 'text-green-500 bg-white': 'text-white bg-green-500'}`}>
                            { follow ? 'Following' : 'Follow' }
                        </button>                            
                    </form>
                    </div>
                </div>

                <div className="w-2/3">
                <div className="shadow-md rounded">
                    <img src="/" alt="" />
                    <div className="flex flex-col gap-1 p-10">
                    <em className="font-bold text-3xl text-gray-800">Interview Experience at Infocepts</em>
                    <p className="text-gray-500 font-semibold text-lg">Data Analyst role for 5 LPA</p>
                    <p className="text-gray-800 my-4 text-lg">
                        What they’re really asking: What makes you the right fit for this job?

                        This question can sound broad and open ended, but it’s really about your relationship with data analytics. Keep your answer focused on your journey toward becoming a data analyst. What sparked your interest in the field? What data analyst skills do you bring from previous jobs or coursework?

                        As you formulate your answer, try to answer these three questions:

                        What excites you about data analysis?

                        What excites you about this role?

                        What makes you the best candidate for the job?

                        Interviewer might also ask:


                        What made you want to become a data analyst?

                        What brought you here?

                        How would you describe yourself as a data analyst?          
                    </p>

                    
                    <form
                        className="flex gap-2"
                        action="/blog/<%= blog._id %>/delete?_method=delete"
                        method="POST"
                    >
                        <a href="#"><button className="px-2 py-1 rounded text-white bg-blue-500 border border-blue-300 hover:text-blue-500 hover:bg-white">Edit</button></a>
                        <button className="px-2 py-1 rounded text-white bg-red-500 border border-red-300 hover:text-red-500 hover:bg-white">Delete</button>
                    </form>
                    
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
