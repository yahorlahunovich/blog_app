"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export type PostProps = {
  postText: string;
  title: string;
  tags: string;
};

export const Post = ({ post }: PostProps) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  return (
    <Link
      href={`post/${post._id}`}
      className="bg-white rounded-lg p-5 cursor-pointer"
    >
      <div className="flex flex-col justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.creator.username}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {/* {post.creator.email} */}
          </p>
        </div>
        <div className="bg-white p-5 flex flex-col gap-3 rounded-lg">
          <h1 className="font-bold text-4xl hover:text-blue-700">
            {post.title}
          </h1>
          <div>Tags: {post.tags}</div>
        </div>
      </div>
      <div className="flex flex-row justify-start gap-3">
        <div>0 Likes</div>
        <div>0 Comments</div>
      </div>
    </Link>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    console.log(data);
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className="w-full">
      <div className="flex flex-col-reverse gap-5">
        {posts.map((post) => {
          return (
            <Post
              post={post}
              // key={post}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Posts;
