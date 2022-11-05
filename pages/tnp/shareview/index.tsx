import { UserRole } from '@prisma/client';
import TnpLayout from 'components/Layouts/TnpLayout';
import { checkUserRoleAndRedirect } from 'lib/checks';
import { prisma } from 'lib/prisma';
import GlobalFeed from 'components/Shareview/Global';
import { ModifiedExperienceType } from 'lib/interfaces';

export async function getServerSideProps(context: any) {
  const experiences = await prisma.experience.findMany({
    include: { Student: { select: { name: true } } },
  });
  return checkUserRoleAndRedirect(context, UserRole.TNP, {
    extra: { experiences: JSON.parse(JSON.stringify(experiences)) },
  });
}

type ShareviewAdminPageProps = {
  experiences: ModifiedExperienceType[];
};

export default function ShareviewAdminPage({
  experiences,
}: ShareviewAdminPageProps) {
  return (
    <TnpLayout>
      <div className='w-full min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-xl'>Shareview</h1>
        <GlobalFeed feed={experiences} forAdmins={true} />
      </div>
    </TnpLayout>
  );
}
