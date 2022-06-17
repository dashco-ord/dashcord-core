import Layout from "components/Layout/TgLayout";
import { useState } from "react";

const certificates = () => {
  const [cert, setCert] = useState("");

  const handleCert = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", cert);
    data.append("upload_preset", "certificates");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dashcord/image/upload",
      {
        method: "POST",
        body: data,
      }
    ).then((res) => res.json());
    console.log(res);
  };
  return (
    <Layout>
      <div>
        <h1>Certificates : </h1>
        <form onSubmit={handleCert}>
          <input
            type="file"
            onChange={(e) =>
              setCert(
                //@ts-ignore
                e.target.files[0]
              )
            }
          />
          <input type="submit" value="Upload." />
        </form>
      </div>
    </Layout>
  );
};
export default certificates;
