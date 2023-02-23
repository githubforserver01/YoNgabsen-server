const { AdminRouter } = require("../handler/Admin/router");
const { AuthRouter } = require("../handler/Auth/router");
const { UserRouter } = require("../handler/Users/router");

const routes = [].concat(AdminRouter, UserRouter, AuthRouter);

module.exports = routes;
