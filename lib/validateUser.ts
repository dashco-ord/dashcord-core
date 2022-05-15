import { UserRole } from "@prisma/client";
import Router from "next/router";

export default function validateUser(role: any) {
  switch (role) {
    case UserRole.TG:
      Router.push("/TG");
      break;
    case UserRole.HOD:
      Router.push("/HOD");
      break;
    case UserRole.TEACHER:
      Router.push("/TEACHER");
      break;
    case UserRole.STUDENT:
      Router.push("/STUDENT");
      break;
    case UserRole.PARENT:
      Router.push("/PARENT");
      break;
    case UserRole.INCHARGE:
      Router.push("/INCHARGE");
      break;
  }
}
