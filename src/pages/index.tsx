import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import toast from "react-hot-toast";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postView";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  const [ input, setInput ] = useState("");
  
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if( errorMessage && errorMessage[0]){
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post, try again later");
      }
    },
  });
  
  if( !user ) return null;

  return (
    <div className="flex gap-3 w-full">
      <Image 
        src={user.profileImageUrl} 
        alt="Profile Image"
        className="rounded-full"
        width={56}
        height={56}
      />
      <input 
        placeholder="Type some emojis!" 
        className="bg-transparent grow outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if( e.key === "Enter" && !isPosting ){
            e.preventDefault();
            if(input != ""){
              mutate({content: input});
            }
          }
        }}
      />
      {input !== "" && !isPosting && (
        <button 
          onClick={() => mutate({content: input})}
          disabled={isPosting}
        >
          Post
        </button>
      )}
      {isPosting  && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20}/>
        </div>
      )}
    </div>
  );
};



const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if( postsLoading ) return <LoadingPage/>;

  if( !data ) return <div>Something went wrong</div>;

  return(
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id}/>
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const {isLoaded: userLoaded, isSignedIn} = useUser();
  
  // Start fetching asap
  api.posts.getAll.useQuery();

  // return empty div if user is not loaded
  if (!userLoaded) return <div/>;

  return (
    <>
      <PageLayout>
          <div className="flex border-b border-slate-400 p-4">
            {!isSignedIn && 
              <div className="flex justify-center">
                <SignInButton/>
              </div>
            }
            {!!isSignedIn && <CreatePostWizard/>}
          </div>
          <Feed/>
        </PageLayout>
    </>
  );
};

export default Home;
