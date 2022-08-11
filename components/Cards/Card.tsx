import Link from "next/link";

type CardProps = {
  title: string;
  value?: number | string;
  link?: string;
};

const Card = ({ title, value, link }: CardProps) => {
  return (
    <>
      <div className="bg-white shrink-0 min-w-[13rem] mr-10 px-6 py-4 rounded shadow-md">
        <h2 className="text-2xl font-black py-2">{title}</h2>
        <p className="text-xl font-bold text-gray-500 pb-2">Total</p>
        <div className="flex items-baseline">
          <p className="text-4xl font-black pt-2">{value}</p>
          {link && (
            <Link href={`/${link}`}>
              <a className="ml-2 text-lg text-gray-500 flex items-center hover:underline">
                see all
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
              </a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
