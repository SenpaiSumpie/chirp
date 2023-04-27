

import Link from "next/link";


import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";


dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {

    const { post, author } = props;

    return (
        <div
        key={post.id}
        className="flex p-4 border-b border-slate-400 gap-3"
        >
        <Image 
            src={author.profilePicture} 
            alt={`@${author.username}'s profile picture`}
            className="rounded-full"
            width={56}
            height={56}
        />
        <div className="flex flex-col">
            <div className="flex gap-1 font-bold text-slate-300">
            <Link href={`/@${author.username}`}>
                <span> {`@${author.username}`} </span>
            </Link>
            <Link href={`/post/${post.id}`}>
                <span className="font-thin"> {`· ${dayjs(post.createdAt).fromNow()}`}</span>
            </Link>
            </div>
            <span className="text-2xl">{post.content}</span>
        </div>
        </div>
    );
};