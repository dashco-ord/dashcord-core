import PastAcademicDetailForm from "components/Forms/PastAcademicDetailForm";
import FamilyDetailForm from "components/Forms/FamilyDetail";
import FriendsDetailForm from "components/Forms/FriendsDetail";
import MedicalDetailForm from "components/Forms/MediaclDetailForm";
import PersonalDetailForm from "components/Forms/PersonalDetail";
import { NextPage } from "next";
import CurrentAcademicDetails from "components/Forms/CurrentAcademicDetails";
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";

const Details: NextPage = () => {
  const useMediaQuery = (width: any) => {
    const [isMobile, setIsMobile] = useState(false);

    const updtateViewPort = useCallback((e: any) => {
      if (e.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", (e) => updtateViewPort(e));

      if (media.matches) {
        setIsMobile(true);
      }

      return () =>
        media.removeEventListener("change", (e) => updtateViewPort(e));
    }, [updtateViewPort, width]);

    return isMobile;
  };

  const isMobile = useMediaQuery(810);

  if (isMobile) {
    return (
      <>
        <Head>
          <title>Dashcord - Details</title>
          <meta
            name='description'
            content='A student performance Monitor (& more... )'></meta>
        </Head>
        <div className='h-screen w-full px-8 py-4'>
          <div className='flex flex-wrap justify-evenly'>
            <PersonalDetailForm />
            <FamilyDetailForm />
            <PastAcademicDetailForm />
            <CurrentAcademicDetails />
            <FriendsDetailForm />
            <MedicalDetailForm />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Dashcord - Details</title>
        <meta
          name='description'
          content='A student performance Monitor (& more... )'></meta>
      </Head>
      <div className='h-screen w-full p-3'>
        <div className='columns-2 gap-3'>
          <PersonalDetailForm />
          <FamilyDetailForm />
          <PastAcademicDetailForm />
        </div>
        <CurrentAcademicDetails />
        <div className='flex'>
          <FriendsDetailForm />

          <div className='pl-3 '>
            <MedicalDetailForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
