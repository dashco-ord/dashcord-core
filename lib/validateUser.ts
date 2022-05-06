import { UserRole } from "@prisma/client";
import Router from "next/router";

export default function validateUser(role: any) {
  switch (role) {
    case UserRole.tg:
      Router.push("/tg");
      break;
    case UserRole.hod:
      Router.push("/hod");
      break;
    case UserRole.teacher:
      Router.push("/teacher");
      break;
    case UserRole.student:
      Router.push("/");
      break;
    case UserRole.parent:
      Router.push("/parent");
      break;
    case UserRole.incharge:
      Router.push("/incharge");
      break;
  }
}
