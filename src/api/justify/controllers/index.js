const { handleJustify } = require("./../handlers");

const { switchStatusResponse } = require("./../../../middleware/statusRes");

// JUSTIFY
exports.justify = async (req, res) => {
  if (req.user) {
    let content = {
      text: req.body,
      user: req.user,
    };
    const { status, message } = await handleJustify(content);
    if (status === 200) {
      res.status(200).send(message);
    } else {
      switchStatusResponse({ status, message }, res);
    }
  } else {
    switchStatusResponse({ status: 403 }, res);
  }
};
