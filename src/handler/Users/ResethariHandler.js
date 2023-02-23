const { AbsenMasuk, AbsenKeluar, User } = require("../../models");
const moment = require("moment");

const ResetHariHandler = async (req, h) => {
  try {
    const absenMasuk = await AbsenMasuk.find();
    const absenKeluar = await AbsenKeluar.find();
    const users = await User.find();
    const today = moment().format("YYYY-MM-DD");

    const dataAbsenMasuk = await absenMasuk.filter((item) => {
      if (item.sekarang.tanggal === today) {
        item.kemarin.tanggal = item.sekarang.tanggal;
        item.kemarin.jam = item.sekarang.jam;
        item.kemarin.latitude = item.sekarang.latitude;
        item.kemarin.longitude = item.sekarang.longitude;
        item.kemarin.photo = item.sekarang.photo;

        item.sekarang.tanggal = "";
        item.sekarang.jam = "";
        item.sekarang.latitude = "";
        item.sekarang.longitude = "";
        item.sekarang.photo = "";

        item.save();
      }
    });

    const dataAbsenKeluar = await absenKeluar.filter((item) => {
      if (item.sekarang.tanggal === today) {
        item.kemarin.tanggal = item.sekarang.tanggal;
        item.kemarin.jam = item.sekarang.jam;
        item.kemarin.latitude = item.sekarang.latitude;
        item.kemarin.longitude = item.sekarang.longitude;
        item.kemarin.photo = item.sekarang.photo;

        item.sekarang.tanggal = "";
        item.sekarang.jam = "";
        item.sekarang.latitude = "";
        item.sekarang.longitude = "";
        item.sekarang.photo = "";

        item.save();
      }
    });

    const dataUser = await users.filter((item) => {
      if (item.absen === "keluar") {
        item.absen = "masuk";

        item.save();
      }
    });

    const response = h.response({
      status: "success",
      message: "Berhasil mengambil data profile anda",
      absen: dataUser,
      masuk: dataAbsenMasuk,
      keluar: dataAbsenKeluar,
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
  ResetHariHandler,
};
