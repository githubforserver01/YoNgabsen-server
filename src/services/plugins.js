require("dotenv").config();
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const AuthBearer = require("hapi-auth-bearer-token");
const HapiCron = require('hapi-cron');

const swaggerOptions = {
  schemes: ["http"],
  host: "localhost:3000",
  info: {
    title: "Hapi API Documentation",
    version: "1.0.0",
  },
};

const plugins = [
  AuthBearer,
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
  {
    plugin: HapiCron,
    options: {
      jobs: [
        {
          name: "resethari",
          time: "59 23 * * *",
          timezone: "Asia/Bangkok",
          request: {
            method: "GET",
            url: "/resethari",
          },
        },
        {
          name: "tidakabsenmasuk",
          time: "59 8 * * *",
          timezone: "Asia/Bangkok",
          request: {
            method: "GET",
            url: "/tidakabsenmasuk",
          },
        },
        {
          name: "tidakabsenkeluar",
          time: "59 22 * * *",
          timezone: "Asia/Bangkok",
          request: {
            method: "GET",
            url: "/tidakabsenkeluar",
          },
        },
      ],
    },
  }
];

module.exports = plugins;
