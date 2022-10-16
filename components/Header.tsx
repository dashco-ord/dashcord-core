const Header = ({ children }: any) => {
  return (
    <div>
      <div className="flex">
        <div className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Header;

import {useState} from 'react';
export const ShareviewHeader = ({ children }: any) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div>
      <div className="flex">
        <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
          role="tablist">
          <li className="nav-item" role="presentation">
          <a aria-selected="true" data-bs-target="#global" href="pl-material/interview-experiences/global" data-bs-toggle="pill" className={`nav-link active rounded-l text-center border-2 border-slate-200 px-2 py-1 w-1/2 hover:bg-white hover:text-purple-500 ${active ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'}`}>
            Global Feed
          </a>
          </li>
          <li className="nav-item" role="presentation">
          <a aria-selected="false" data-bs-target="#personal" href="pl-material/interview-experiences/personal" data-bs-toggle="pill" className={`nav-link active rounded-r text-center border-2 border-slate-200 px-2 py-1 w-1/2 hover:bg-white hover:text-purple-500 ${!active ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'}`}>
            Personal Feed
          </a>
          </li>
          <li className="nav-item" role="presentation">
          <a aria-selected="false" href="posts/createPost" data-bs-toggle="pill" className={`active rounded-r text-center border-2 border-slate-200 px-2 py-1 w-1/2 bg-purple-500 text-white hover:bg-white hover:text-purple-500`}>
            Create Feed
          </a>
          </li>
        </ul>
      </div>
      <div>{children}</div>

    </div>
  );
};

export const NavComponent = ({ children }: any) => {
  return (
    <>
    <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
      role="tablist">
      <li className="nav-item" role="presentation">
        <a href="#tabs-home" className="
          nav-link
          block
          font-medium
          text-xs
          leading-tight
          uppercase
          border-x-0 border-t-0 border-b-2 border-transparent
          px-6
          py-3
          my-2
          hover:border-transparent hover:bg-gray-100
          focus:border-transparent
          active
        " id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
          aria-selected="true">Home</a>
      </li>
      <li className="nav-item" role="presentation">
        <a href="#tabs-profile" className="
          nav-link
          block
          font-medium
          text-xs
          leading-tight
          uppercase
          border-x-0 border-t-0 border-b-2 border-transparent
          px-6
          py-3
          my-2
          hover:border-transparent hover:bg-gray-100
          focus:border-transparent
        " id="tabs-profile-tab" data-bs-toggle="pill" data-bs-target="#tabs-profile" role="tab"
          aria-controls="tabs-profile" aria-selected="false">Profile</a>
      </li>
    </ul>
    {/* <div className="tab-content" id="tabs-tabContent">
      <div className="tab-pane fade show active" id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab">
        Tab 1 content
      </div>
      <div className="tab-pane fade" id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
        Tab 2 content
      </div>
      <div className="tab-pane fade" id="tabs-messages" role="tabpanel" aria-labelledby="tabs-profile-tab">
        Tab 3 content
      </div>
      <div className="tab-pane fade" id="tabs-contact" role="tabpanel" aria-labelledby="tabs-contact-tab">
        Tab 4 content
      </div>
    </div> */}
    </>
  )
}

export const ShareviewMaterialHeader = ({ children }: any) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div>
      <div className="flex">
        <a href="#" onClick={handleClick} className={`rounded-l text-center border-2 border-slate-200 px-2 py-1 w-1/2 hover:bg-white hover:text-purple-500 bg-purple-500 text-white`}>
          Global Feed
        </a>
        <a href="#" onClick={handleClick} className={`rounded-r text-center border-2 border-slate-200 px-2 py-1 w-1/2 hover:bg-white hover:text-purple-500 bg-purple-500 text-white`}>
          Personal Feed
        </a>
        <a href="posts/createPost" onClick={handleClick} className={`rounded-r text-center border-2 border-slate-200 px-2 py-1 w-1/2 bg-purple-500 text-white hover:bg-white hover:text-purple-500`}>
          Create Feed
        </a>
      </div>
      <div>{children}</div>
    </div>
  );
};

// import Link from "next/link";

// type CardProps = {
//   title: string;
//   description: string;
//   link?: string;
// };

// const CardShareview = ({ title, description, link }: CardProps) => {
//   return (
//     <>
//       <div className="bg-white shrink-0 max-w-[15rem] mr-10 px-6 py-4 rounded shadow-md">
//         <h2 className="text-2xl font-black py-2">{title}</h2>
//         <p className="text-lg flex-wrap break-word text-gray-500 pb-2">{description}</p>
//           {link && (
//               <Link href={`/${link}`}>
//                 <div className="flex items-center justify-between">
//                 <button className="px-3 py-1 text-xl text-white bg-purple-500 hover:bg-white hover:py-[0.18rem] hover:text-purple-500 hover:border hover:border-purple-500 rounded">Explore</button>                
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14 5l7 7m0 0l-7 7m7-7H3"
//                   />
//                 </svg>              
//                 </div>
//             </Link>
//           )}
//       </div>
//     </>
//   );
// };

// export default CardShareview;

