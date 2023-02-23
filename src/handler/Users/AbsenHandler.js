const fs = require("fs");
const moment = require("moment/moment");
const { BASE_URL } = require("../../config/baseurl");
const { AbsenMasuk, AbsenKeluar, User } = require("../../models");
const { randomCharacter } = require("../../utils/randomCharacter");

const AbsenMasukHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const absenMasuk = await AbsenMasuk.findById(id);
    const users = await User.findById(id);
    const { foto, latitude, longitude, tanggal, jam } = req.payload;

    if (!absenMasuk) {
      const response = h.response({
        status: "failed",
        message: "User tidak ditemukan, silahkan coba lagi",
      });
      response.code(404);
      return response;
    }

    let ext;

    ext = foto.includes("image/png")
      ? "png"
      : foto.includes("image/jpg")
      ? "jpg"
      : foto.includes("image/jpeg") && "jpeg";

    const imageName = `${randomCharacter()}${ext}`;
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

    absenMasuk.sekarang.photo = `${BASE_URL}${imageName}`;
    absenMasuk.sekarang.latitude = latitude;
    absenMasuk.sekarang.longitude = longitude;
    absenMasuk.sekarang.tanggal = tanggal;
    absenMasuk.sekarang.jam = jam;
    users.absen = "keluar";

    await absenMasuk.save();
    await users.save();

    const response = h.response({
      status: "success",
      message: "Absen masuk berhasil",
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

const AbsenKeluarHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const absenKeluar = await AbsenKeluar.findById(id);
    const { foto, latitude, longitude, tanggal, jam } = req.payload;

    if (!absenKeluar) {
      const response = h.response({
        status: "failed",
        message: "User tidak ditemukan, silahkan coba lagi",
      });
      response.code(404);
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

    absenKeluar.sekarang.photo = `${BASE_URL}${imageName}`;
    absenKeluar.sekarang.latitude = latitude;
    absenKeluar.sekarang.longitude = longitude;
    absenKeluar.sekarang.tanggal = tanggal;
    absenKeluar.sekarang.jam = jam;

    await absenKeluar.save();

    const response = h.response({
      status: "success",
      message: "Absen keluar berhasil",
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

module.exports = {
  AbsenMasukHandler,
  AbsenKeluarHandler,
};
