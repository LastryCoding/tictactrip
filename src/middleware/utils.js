// Generate AccessToken
exports.generateAccessToken = (user) => {
  const jwt = require("jsonwebtoken");
  return jwt.sign(user.toJSON(), "process.env.SECRET", { expiresIn: "1440m" });
};

// Verify Token in Header
exports.verifyTokenHeader = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ message: "noToken" });

  jwt.verify(token, "process.env.SECRET", (err, user) => {
    if (err) return res.status(401).json({ message: err });
    req.user = user;
    next();
  });
};

// Verify Token
exports.verifyToken = async (token) => {
  const jwt = require("jsonwebtoken");
  let userToken = { valid: true, user: {} };
  await jwt.verify(token, "process.env.SECRET", (err, user) => {
    if (err && err.message.includes("jwt expired")) {
      userToken = { valid: false, user: null };
    } else {
      userToken = { valid: true, user: user };
    }
  });
  return userToken;
};

// Get all words
exports.getAllWords = async (text) => {
  return text.split(" ");
};

// How Many Words
exports.howManyWords = async (text) => {
  return (await this.getAllWords(text)).length;
};

// Justify the text
exports.justifyText = async (text) => {
  let allWords = await this.getAllWords(text);
  let allSentences = [];
  let oneSentence = "";

  for (let i = 0; i < allWords.length; i++) {
    const oneWord = allWords[i];
    let tempSentence = oneSentence;
    tempSentence += oneWord + " ";
    if (tempSentence.length > 81) {
      allSentences.push(oneSentence);
      oneSentence = oneWord;
    } else if (tempSentence.length === 81) {
      oneSentence += oneWord;
      allSentences.push(oneSentence);
      oneSentence = "";
    } else {
      oneSentence = tempSentence;
    }
    if (i === allWords.length - 1 && oneSentence !== "") {
      allSentences.push(oneSentence);
    }
  }

  return allSentences.join("\n");
};
