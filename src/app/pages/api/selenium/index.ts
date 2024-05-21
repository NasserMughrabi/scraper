import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    // return res.status(200).json({ uid: userCredential.user.uid });
  } catch (e) {
    // console.log(e);
    return res
      .status(500)
      .json({ error: "[NextJs] : Backend API Login Failed" });
  }
}
