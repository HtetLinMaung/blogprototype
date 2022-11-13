import fs from "fs";
import verifyToken from "../../utils/verify-token";
import isReaderRole from "../../utils/is-reader-role";
import connectMongo from "../../utils/connect-mongo";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(404).json({
        code: 404,
        message: "URL Not Found!",
      });
    }
    const token = await verifyToken(req);
    if (!token) {
      return res.status(401).json({
        code: 401,
        message: "Unauthorized!",
      });
    }
    await connectMongo();
    const yes = await isReaderRole(token.id);
    if (yes) {
      return res.status(401).json({
        code: 401,
        message: "Unauthorized!",
      });
    }

    const buffer = Buffer.from(req.body.image.split(",")[1], "base64");
    const fname = new Date().toISOString() + req.body.fname;
    const staticFolderPath = `${__dirname}/../../public`;
    if (!fs.existsSync(staticFolderPath)) {
      fs.mkdirSync(staticFolderPath);
    }
    const filePath = `${staticFolderPath}/images/${fname}`;
    fs.writeFileSync(filePath, buffer);

    res.json({
      code: 200,
      message: "Uploaded successful",
      url: "/images/" + fname,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
}
