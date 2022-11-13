import Post from "../models/Post";
import User from "../models/User";

export default async function fetchPostByRef(ref) {
  return Post.findOne(
    { ref, deletedAt: null, status: "published" },
    {
      title: 1,
      coverimage: 1,
      content: 1,
      createdAt: 1,
    }
  ).populate({
    path: "author",
    select: "name profileimage",
  });
}
