const { AdminSignInHandler } = require("./AdminHandler");
const { UserSignInHandler } = require("./UserHandler");

const AuthRouter = [
  {
    method: "POST",
    path: "/signin",
    handler: UserSignInHandler,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/admin_signin",
    handler: AdminSignInHandler,
    options: {
      auth: false,
    },
  },
];

module.exports = { AuthRouter };
