import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  link?: string;
};

const CardShareview = ({ title, description, link }: CardProps) => {
  return (
    <>
      <div className="bg-white shrink-0 max-w-[15rem] mr-10 px-6 py-4 rounded shadow-md border">
        <h2 className="text-2xl font-black py-2">{title}</h2>
        <p className="text-lg flex-wrap break-word text-gray-500 pb-2">{description}</p>
          {link && (
              <Link href={`/${link}`}>
                <div className="flex items-center justify-between">
                <button className="px-3 py-1 text-xl text-white bg-purple-500 hover:bg-white hover:py-[0.18rem] hover:text-purple-500 hover:border hover:border-purple-500 rounded">Explore</button>                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                </div>
            </Link>
          )}
      </div>
    </>
  );
};

export default CardShareview;
