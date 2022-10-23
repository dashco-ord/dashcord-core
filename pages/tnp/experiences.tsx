import { UserRole } from "@prisma/client";
import TnpLayout from "components/Layouts/TnpLayout";
import { checkUserRoleAndRedirect } from "lib/checks";

export async function getServerSideProps(context: any) {
  return checkUserRoleAndRedirect(context, UserRole.TNP, {});
}

export default function ExperiencesAdminPage() {
  return (
    <TnpLayout>
      <h1>Tnp Experiences page</h1>
    </TnpLayout>
  );
}
