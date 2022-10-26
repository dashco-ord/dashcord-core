import { UserRole } from "@prisma/client";
import { getSession } from "next-auth/react";

export const checkUserRoleAndRedirect = async (
  context: any,
  userRole: UserRole,
  { login = "/login", extra = {} }: any
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: { destination: login },
    };
  }
  if (session?.role != userRole) {
    switch (session?.role) {
      case UserRole.STUDENT:
        return {
          redirect: { destination: "/" },
          props: {},
        };
      case UserRole.TG:
        return {
          redirect: { destination: "/tg" },
          props: {},
        };
      case UserRole.INCHARGE:
        return {
          redirect: { destination: "/incharge" },
          props: {},
        };
      case UserRole.TNP:
        return {
          redirect: { destination: "/tnp" },
          props: {},
        };
      case UserRole.HOD: {
        return {
          redirect: { destination: "/hod" },
          props: {},
        };
      }
      default:
        return {
          redirect: { destination: "/login" },
          props: {},
        };
    }
  } else {
    return { props: { ...extra, user: session.user } };
  }
};
