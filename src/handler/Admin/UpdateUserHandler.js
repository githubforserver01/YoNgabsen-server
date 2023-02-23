const { Auth, User } = require("../../models");
const mongoose = require("mongoose");

const UpdateUserHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const {
      username,
      email,
      password,
      nama,
      usia,
      jeniskelamin,
      pekerjaan,
      divisi,
      no_ktp,
      no_telp,
      alamat,
      status,
    } = req.payload;

    const auth = await Auth.findById(id);
    const users = await User.findById(id);

    auth.username = username;
    auth.email = email;
    auth.password = password;
    users.nama = nama;
    users.usia = usia;
    users.jeniskelamin = jeniskelamin;
    users.pekerjaan = pekerjaan;
    users.divisi = divisi;
    users.no_ktp = no_ktp;
    users.no_telp = no_telp;
    users.alamat = alamat;
    users.status = status;

    await auth.save();
    await users.save();

    const response = h.response({
      status: "success",
      message: "User berhasil diperbarui",
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "failed",
      message: `Terjadi kesalahan karena ${error.message} , silahkan coba lagi`,
    });
    response.code(500);
    return response;
  }
};

module.exports = { UpdateUserHandler };
