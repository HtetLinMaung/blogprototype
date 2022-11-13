import User from "../models/User";

export default async function isReaderRole(_id) {
  return User.exists({
    _id,
    deletedAt: null,
    role: "reader",
  });
}
