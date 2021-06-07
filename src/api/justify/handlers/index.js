const { validateData } = require("./../reducers");
const { switchStatus } = require("./../../../middleware/statusRes");
const { readOneByEmail, updateOne } = require("./../../../middleware/requests");
const userSchema = require("./../../../models/users");
const { howManyWords, justifyText } = require("./../../../middleware/utils");

// Justifying
exports.handleJustify = async (content) => {
  // Verify if content.text is text/plain
  if (typeof content.text !== "string") return switchStatus({ status: 400, message: "Please send a ContentType of text/plain" });

  // Verify if content.text is not an empty text
  const { valid, errors } = validateData(content);
  if (!valid) return switchStatus({ status: 400, message: errors });

  // Get the user to verify if quota is not exceeded
  const user = await readOneByEmail(userSchema, content.user.email);
  if (user.status === 200) {
    let usersQuotaRemaining = user.message.quotaRemaining;
    let nbrOfWords = await howManyWords(content.text);
    if (nbrOfWords > usersQuotaRemaining) return switchStatus({ status: 402, message: "Payment Required." });

    // Handle justify
    let textJustified = await justifyText(content.text);

    // Handle update quota of user
    usersQuotaRemaining = usersQuotaRemaining - nbrOfWords;
    await updateOne(userSchema, user.message._id, { quotaRemaining: usersQuotaRemaining });

    // Return data to client
    return switchStatus({ status: 200, message: textJustified });
  } else {
    return switchStatus({ status: 400, message: "Please try to get a new token!" });
  }
};
