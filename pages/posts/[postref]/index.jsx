import Image from "next/image";
import connectMongo from "../../../utils/connect-mongo";
import fetchPublishedPostByRef from "../../../utils/fetch-published-post-by-ref";
import moment from "moment";

import { host } from "../../../utils/rest";
import { useEffect } from "react";

export default function Post({ post }) {
  return (
    <div className="container mx-auto pt-4 pb-10">
      <div className="flex flex-col items-center">
        <Image
          width={960}
          height={504}
          className="rounded-xl"
          alt=""
          src={`${host}${post.coverimage}`}
        />
        <h1
          className="text-center jakarta-sans"
          style={{
            padding: "0 80px",
            maxWidth: 800,
            margin: "40px 0 20px",
            fontSize: 48,
          }}
        >
          {post.title}
        </h1>
        <div className="flex items-center" style={{ margin: "28px 0 56px" }}>
          <Image
            width={48}
            height={48}
            className="rounded-full"
            alt=""
            src={`${host}${post.profileimage}`}
          />
          <p className="ml-4">{post.authorname}</p>
          <p className="ml-4">.</p>
          <p className="ml-4">{moment(post.createdAt).format("MMM Do YY")}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className="overflow-auto "
          dangerouslySetInnerHTML={{ __html: post.content }}
          id="content"
          style={{ padding: "0 46px", maxWidth: 900 }}
        ></div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  await connectMongo();
  const post = await fetchPublishedPostByRef(query.postref);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: {
        title: post.title,
        coverimage: post.coverimage,
        content: post.content,
        authorname: post.author.name,
        profileimage: post.author.profileimage,
        createdAt: post.createdAt.toString(),
      },
    }, // will be passed to the page component as props
  };
}
