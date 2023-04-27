
import { type NextPage } from "next";
import Head from "next/head";



const ProfilePage: NextPage = () => {
  

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center ">
        <div className="w-full h-full md:max-w-2xl border-x border-slate-400">
          <div className="flex border-b border-slate-400 p-4">
            Profile View
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
