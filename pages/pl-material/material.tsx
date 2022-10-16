import { InterviewPost, UserRole } from "@prisma/client";
import { checkUserRoleAndRedirect } from "lib/checks";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";
import moment from "moment";
import CardShareview from "components/Cards/CardShareview";

type postprops = {
  posts: InterviewPost[];
};

// export const getServerSideProps = async (context: any) => {
//   const session = await getSession(context);
//   const posts = await prisma.posts.findMany({
//     where: {
//       //@ts-ignore
//       studentId: session?.id,
//     },
//   });

//   return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
//     extra: { posts: JSON.parse(JSON.stringify(posts)) },
//   });
// };

export default function PlMaterialPage({ posts }: postprops) {
  return (
    <>
      {/* {posts.map((post) => ( */}
        {/* <div key={post.id}> */}
        <div className="flex mt-10 flex-wrap justify-center overflow-hidden">
          <div className="shrink-0">
            <CardShareview link={"pl-material/material"} title="Website Development" description="Explore and learn to develop web applications" />
          </div>
          <div className="shrink-0">
            <CardShareview link={"pl-material/material"} title="Aptitude Material" description="Explore placement materials referred by your senior batches." />
          </div>
          <div className="shrink-0">
            <CardShareview link={"pl-material/material"} title="Website Development" description="Explore and learn to develop web applications" />
          </div>
          <div className="shrink-0">
            <CardShareview link={"pl-material/material"} title="Aptitude Material" description="Explore placement materials referred by your senior batches." />
          </div>
          <div className="shrink-0">
            <CardShareview link={"pl-material/material"} title="Website Development" description="Explore and learn to develop web applications" />
          </div>
          <div className="shrink-0">
            <CardShareview link={"pl-material/material"} title="Aptitude Material" description="Explore placement materials referred by your senior batches." />
          </div>
        </div>
        {/* </div>
      ))} */}
    </>
  );
}
