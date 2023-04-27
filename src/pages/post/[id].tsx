
import { type NextPage } from "next";
import Head from "next/head";



const SinglePostPage: NextPage = () => {
  

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex h-screen justify-center ">
        <div className="w-full h-full md:max-w-2xl border-x border-slate-400">
          <div className="flex border-b border-slate-400 p-4">
            Post View
          </div>
        </div>
      </main>
    </>
  );
};

export default SinglePostPage;