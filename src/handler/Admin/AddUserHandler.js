const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { BASE_URL } = require("../../config/baseurl");
const { Auth, User, AbsenMasuk, AbsenKeluar, Izin } = require("../../models");
const { randomCharacter } = require("../../utils/randomCharacter");
const fs = require("fs");

const AddUserHandler = async (req, h) => {
  try {
    const {
      foto,
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
    const hashPassword = await bcrypt.hash(password, 10);
    const checkUser = await Auth.findOne({ email: email });

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      nama === "" ||
      usia === "" ||
      jeniskelamin === "" ||
      pekerjaan === "" ||
      divisi === "" ||
      no_ktp === "" ||
      no_telp === "" ||
      alamat === "" ||
      status === ""
    ) {
      const response = h.response({
        status: "failed",
        message: "Data yang anda masukkan tidak lengkap",
      });
      response.code(400);
      return response;
    }

    if (checkUser) {
      const response = h.response({
        status: "failed",
        message: "User sudah digunakan",
      });
      response.code(409);
      return response;
    }

    let ext;

    ext = foto.includes("image/png")
      ? "png"
      : foto.includes("image/jpg")
      ? "jpg"
      : foto.includes("image/jpeg") && "jpeg";

    const imageName = `${randomCharacter(10)}.${ext}`;
    const replacingPath = foto.replace(`data:image/${ext};base64,`, "");
    const imageData = `./src/image/${imageName}`;

    fs.writeFileSync(imageData, replacingPath, "base64", function (err) {
      const response = h.response({
        status: "failed",
        message: `Terjadi kesalahan ${err.message}, silahkan coba lagi`,
      });
      response.code(500);
      return response;
    });

    const id = new mongoose.Types.ObjectId();

    const userProfile = new User({
      _id: id,
      foto: `${BASE_URL}${imageName}`,
      nama: nama,
      usia: usia,
      jenisKelamin: jeniskelamin,
      pekerjaan: pekerjaan,
      divisi: divisi,
      no_ktp: no_ktp,
      no_telp: no_telp,
      alamat: alamat,
      status: status,
      absenMasuk: id,
      absenKeluar: id,
    });

    const auth = new Auth({
      _id: id,
      email: email,
      username: username,
      password: hashPassword,
      users: id,
    });

    const absenMasuk = new AbsenMasuk({
      _id: id,
    });

    const absenKeluar = new AbsenKeluar({
      _id: id,
    });

    await userProfile.save();
    await auth.save();
    await absenMasuk.save();
    await absenKeluar.save();

    const response = h.response({
      status: "success",
      message: "User berhasil dibuat",
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: "failed",
      message: `Terjadi kesalahan karena ${error.message} , silahkan coba lagi`,
    });
    response.code(400);
    return response;
  }
};

module.exports = { AddUserHandler };
