const { create, updateOne, readAll, readOne, deleteOne, readOneByEmail } = require("./../../../middleware/requests");
const { generateAccessToken, verifyToken } = require("./../../../middleware/utils");
const { validateData, reduceData } = require("./../reducers");
const { switchStatus } = require("./../../../middleware/statusRes");
const userSchema = require("./../../../models/users");

//CREATE
exports.handleCreateOne = async (content) => {
  // Checking if the body has an email key, and if the email is actually a correct email
  const { valid, errors } = validateData(content);
  if (!valid) return switchStatus({ status: 400, message: errors });

  // Only taking what we need from what was send, in here we take only email key via reduceData
  let dataReduced = reduceData(content);

  // If Email already exists, we need to check the token
  // Else we create a new user in database, we generate a token and we update user with his token
  const readOneByEmailResult = await readOneByEmail(userSchema, dataReduced.email);
  if (readOneByEmailResult.status === 200) {
    let user = readOneByEmailResult.message;
    let { valid } = await verifyToken(user.tokenString);
    // If token not already expired we send back the old token - with the quota remaining :}
    // Else we regenerate a new token and update it in database with refreshing the quota
    if (valid) {
      return switchStatus({ status: 200, message: user.tokenString });
    } else {
      user.tokenString = "";
      const newToken = await generateAccessToken(user);
      await updateOne(userSchema, user._id, {
        tokenString: newToken,
        quotaRemaining: 80000,
      });
      return switchStatus({ status: 200, message: newToken });
    }
  } else {
    const { status, message, id } = await create(userSchema, dataReduced);
    if (status === 201) {
      const user = (await this.handleReadOne(id)).message;
      const token = await generateAccessToken(user);
      await updateOne(userSchema, user._id, {
        tokenString: token,
      });
      return switchStatus({ status: 200, message: token });
    } else {
      return switchStatus({ status: 500, message: "Something went wrong, please try again later!" });
    }
  }
};

//READ ALL
exports.handleReadAll = async () => {
  return switchStatus(await readAll(userSchema));
};
//READ ONE
exports.handleReadOne = async (id) => {
  return switchStatus(await readOne(userSchema, id));
};
//UPDATE ONE
exports.handleUpdateOne = async (content, id) => {
  const { valid, errors } = validateData(content);
  if (!valid) return switchStatus({ status: 400, message: errors });
  let dataReduced = reduceData(content);
  return switchStatus(await updateOne(userSchema, id, dataReduced));
};
// DELETE ONE
exports.handleDeleteOne = async (id) => {
  return switchStatus(await deleteOne(userSchema, id));
};
