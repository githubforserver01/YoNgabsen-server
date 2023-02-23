const { AddUserHandler } = require("./AddUserHandler");
const { DeleteUserHandler } = require("./DeleteUserHandler");
const { GetJamKerja } = require("./GetJamKerja");
const { GetListPengajuanUserHandler } = require("./GetListPengajuanUser");
const { GetPengajuanUserHandler } = require("./GetPengajuanUserHandler");
const { GetUserHandler } = require("./GetUserHandler");
const { KeputusanIzinHRDHandler } = require("./KeputusanIzinHRDHandler");
const { OrderUserByName } = require("./OrderItemHandler");
const { SearchUserHandler } = require("./SearchUserHandler");
const { SetBatasJamMasukKerja } = require("./SetBatasJamMasukKerja");
const { SetBatasJamPulangKerja } = require("./SetBatasJamPulangKerja");
const { UpdateUserHandler } = require("./UpdateUserHandler");

const AdminRouter = [
  {
    method: "POST",
    path: "/adduser",
    handler: AddUserHandler,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getuser",
    handler: GetUserHandler,
  },
  {
    method: "GET",
    path: "/getlistpengajukanizinuser",
    handler: GetListPengajuanUserHandler,
  },
  {
    method: "GET",
    path: "/getpengajukanizinuser/{id}",
    handler: GetPengajuanUserHandler,
  },
  {
    method: "DELETE",
    path: "/deleteuser/{id}",
    handler: DeleteUserHandler,
  },
  {
    method: "PUT",
    path: "/updateuser/{id}",
    handler: UpdateUserHandler,
  },
  {
    method: "GET",
    path: "/orderuserbyname",
    handler: OrderUserByName,
  },
  {
    method: "POST",
    path: "/searchuser/{nama}",
    handler: SearchUserHandler,
  },
  {
    method: "POST",
    path: "/pengajukanizinuser/{id}",
    handler: KeputusanIzinHRDHandler,
  },
  {
    method: "POST",
    path: "/setbatasjammasukkerja",
    handler: SetBatasJamMasukKerja,
  },
  {
    method: "POST",
    path: "/setbatasjampulangkerja",
    handler: SetBatasJamPulangKerja,
  },
  {
    method: "GET",
    path: "/getjamkerja",
    handler: GetJamKerja,
  },
];

module.exports = { AdminRouter };
