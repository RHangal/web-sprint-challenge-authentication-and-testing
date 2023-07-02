const User = require("./auth-model");

function checkPasswordAndUsernameExists(req, res, next) {
  if (!req.body.password || !req.body.username) {
    next({ status: 422, message: "username and password required" });
  } else {
    next();
  }
}

async function checkUsernameFree(req, res, next) {
  try {
    const user = await User.findBy({ username: req.body.username });
    if (!user) {
      next();
    } else {
      next({ status: 422, message: "Username taken" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkPasswordAndUsernameExists,
  checkUsernameFree,
};
