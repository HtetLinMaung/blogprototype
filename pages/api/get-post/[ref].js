import connectMongo from "../../../utils/connect-mongo";
import fetchPublishedPostByRef from "../../../utils/fetch-published-post-by-ref";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const post = await fetchPublishedPostByRef(req.query.ref);
    if (!post) {
      return res.status(404).json({
        code: 404,
        message: "Not Found!",
      });
    }
    res.json({
      code: 200,
      message: "Successful.",
      data: {
        title: post.title,
        coverimage: post.coverimage,
        content: post.content,
        authorname: post.author.name,
        profileimage: post.author.profileimage,
        createdAt: post.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
}
