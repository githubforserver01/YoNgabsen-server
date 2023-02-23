require("dotenv").config();
require("./src/database/database");
const Hapi = require("@hapi/hapi");
const key = require("./src/config/config");
const routes = require("./src/routes/routes");
const plugins = require("./src/services/plugins");
const jwt = require("jsonwebtoken");
const { Auth } = require("./src/models");
const Path = require("path");

const init = async () => {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || "0.0.0.0";
  try {
    const server = Hapi.server({
      port: port,
      host: host,
      routes: {
        files: {
          relativeTo: Path.join(__dirname, "./src/image"),
        },
        cors: {
          origin: ["*"],
        },
      },
    });

    await server.register(plugins).then(() => {
      server.auth.strategy("simple", "bearer-access-token", {
        validate: async (request, token, h) => {
          const decoded = jwt.verify(token, key);

          const auth = await Auth.findOne({ _id: decoded._id }).populate(
            "users"
          );

          if (!auth) {
            const response = h.response({
              status: "failed",
              message: "Token tidak valid",
            });
            response.code(500);
            return response;
          }

          if (auth.authKeys.find((key) => key === decoded.key)) {
            return {
              isValid: true,
              credentials: {
                _id: auth._id,
                user: auth.profileuser,
              },
            };
          } else {
            const response = h.response({
              status: "failed",
              message: "Token tidak valid",
            });
            response.code(500);
            return response;
          }
        },
      });
    });

    await server.route(routes);

    server.auth.default("simple");

    await server.start();
    console.log("Server berjalan pada %s", server.info.uri);
  } catch (error) {
    console.log(`Terjadi kesalahan pada ${error.message}`);
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
