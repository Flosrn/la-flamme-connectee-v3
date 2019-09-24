import useMiddleware from "../../../middlewares/useMiddleware";

const handler = (req, res) => {
  if (req.method === "PATCH") {
    if (!req.user) return res.status(401).send("Vous n'etes pas connecté.");
    console.log(req.body);
    const { firstName, lastName, email, dateOfBirth, adress } = req.body;
    return req.db
      .collection("users")
      .updateOne({ _id: req.user._id }, { $set: { firstName, lastName, email, dateOfBirth, adress } })
      .then(() =>
        res.json({
          message: "Profile updated successfully",
          data: { firstName, lastName, email, dateOfBirth, adress }
        })
      )
      .catch(error =>
        res.send({
          status: "error",
          message: error.toString()
        })
      );
  }
  return res.status(405).end();
};

export default useMiddleware(handler);
