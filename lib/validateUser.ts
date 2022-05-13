import { UserRole } from "@prisma/client";
import Router from "next/router";

export default function validateUser(role: any) {
  switch (role) {
    case UserRole.TG:
      Router.push("/tg");
      break;
    case UserRole.HOD:
      Router.push("/hod");
      break;
    case UserRole.TEACHER:
      Router.push("/teacher");
      break;
    case UserRole.STUDENT:
      Router.push("/");
      break;
    case UserRole.PARENT:
      Router.push("/parent");
      break;
    case UserRole.INCHARGE:
      Router.push("/incharge");
      break;
  }
}
