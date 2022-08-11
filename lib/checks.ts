import { UserRole } from "@prisma/client";
import { getSession } from "next-auth/react";

export const checkUserRoleAndRedirect = async (
  context: any,
  userRole: UserRole,
  destination: string,
  { login = "/login", extra = {} }: any
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: { destination: login },
    };
  }
  if (session?.role != userRole) {
    return {
      redirect: { destination: destination },
      props: {},
    };
  } else {
    return { props: { user: session?.user, extra } };
  }
};
