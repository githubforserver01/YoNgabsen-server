const { AbsenByIdHandler } = require("./AbsenByIdHandler");
const { AbsenMasukHandler, AbsenKeluarHandler } = require("./AbsenHandler");
const { CutiKhususHandler } = require("./CutiKhususHandler");
const { CutiTahunanHandler } = require("./CutiTahunanHandler");
const { GetIzinByIdHandler } = require("./GetIzinByIdHandler");
const { GetProfileHandler } = require("./GetProfileHandler");
const { IzinHandler } = require("./IzinHandler");
const { IzinKhususHandler } = require("./IzinKhususHandler");
const { ResetHariHandler } = require("./ResethariHandler");
const { SakitHandler } = require("./SakitHandler");
const { TidakAbsenKeluarHandler } = require("./TidakAbsenKeluarHandler");
const { TidakAbsenMasukHandler } = require("./TidakAbsenMasukHandler");

const UserRouter = [
  {
    method: "POST",
    path: "/sakit/{id}",
    handler: SakitHandler,
  },
  {
    method: "POST",
    path: "/izinkhusus/{id}",
    handler: IzinKhususHandler,
  },
  {
    method: "POST",
    path: "/izin/{id}",
    handler: IzinHandler,
  },
  {
    method: "POST",
    path: "/cutikhusus/{id}",
    handler: CutiKhususHandler,
  },
  {
    method: "POST",
    path: "/cutitahunan/{id}",
    handler: CutiTahunanHandler,
  },
  {
    method: "POST",
    path: "/absenmasuk/{id}",
    handler: AbsenMasukHandler,
  },
  {
    method: "POST",
    path: "/absenkeluar/{id}",
    handler: AbsenKeluarHandler,
  },
  {
    method: "GET",
    path: "/getabsenbyid/{id}",
    handler: AbsenByIdHandler,
  },
  {
    method: "GET",
    path: "/profileuser/{id}",
    handler: GetProfileHandler,
  },
  {
    method: "GET",
    path: "/tidakabsenmasuk",
    handler: TidakAbsenMasukHandler,
  },
  {
    method: "GET",
    path: "/tidakabsenkeluar",
    handler: TidakAbsenKeluarHandler,
  },
  {
    method: "GET",
    path: "/resethari",
    handler: ResetHariHandler,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getizinbyid/{id}",
    handler: GetIzinByIdHandler,
  },
  {
    method: "GET",
    path: "/directory/{file*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
      },
    },
    options: {
      auth: false,
    },
  },
];

module.exports = {
  UserRouter,
};
