import { NextPage } from "next";
import StudentsLayout from "components/Layouts/StudentsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";
import { UserRole } from "@prisma/client";
import Image from "next/image";
import CardShareview from "components/Cards/CardShareview";

export const getServerSideProps = async (context: any) => {
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {});
};

const PlacementMaterial: NextPage = ({ user }: any) => {
  return (
    <StudentsLayout>
      <div className="h-screen flex-1 flex flex-col items-center">
        <Image
          src="/header.png"
          alt="College Header"
          width={625}
          height={114}
          className="text-center flex-center"
        />
        
        <div className="flex mt-10">
          <div className="shrink-0">
            <CardShareview link={"pl-material/interview-experiences"} title="Interview Experiences" description="Explore interview experiences posted by your senior batches." />
          </div>
          <div className="shrink-0">
            <CardShareview link={"pl-material/material"} title="Placement Material" description="Explore placement materials referred by your senior batches." />
          </div>
        </div>
      </div>
    </StudentsLayout>
  );
};

export default PlacementMaterial;
