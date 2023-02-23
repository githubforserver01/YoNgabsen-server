const { User } = require("../../models");

const AbsenByIdHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id)
      .populate("absenMasuk")
      .populate("absenKeluar");

    const absenMasukSekarang = {
      photo:
        users.absenMasuk.sekarang.photo !== undefined
          ? users.absenMasuk.sekarang.photo
          : "",
      latitude:
        users.absenMasuk.sekarang.latitude !== undefined
          ? users.absenMasuk.sekarang.latitude
          : "",
      longitude:
        users.absenMasuk.sekarang.longitude !== undefined
          ? users.absenMasuk.sekarang.longitude
          : "",
      tanggal:
        users.absenMasuk.sekarang.tanggal !== undefined
          ? users.absenMasuk.sekarang.tanggal
          : "",
      jam:
        users.absenMasuk.sekarang.jam !== undefined
          ? users.absenMasuk.sekarang.jam
          : "",
    };

    const absenKeluarSekarang = {
      photo:
        users.absenKeluar.sekarang.photo !== undefined
          ? users.absenKeluar.sekarang.photo
          : "",
      latitude:
        users.absenKeluar.sekarang.latitude !== undefined
          ? users.absenKeluar.sekarang.latitude
          : "",
      longitude:
        users.absenKeluar.sekarang.longitude !== undefined
          ? users.absenKeluar.sekarang.longitude
          : "",
      tanggal:
        users.absenKeluar.sekarang.tanggal !== undefined
          ? users.absenKeluar.sekarang.tanggal
          : "",
      jam:
        users.absenKeluar.sekarang.jam !== undefined
          ? users.absenKeluar.sekarang.jam
          : "",
    };

    const absenMasukKemarin = {
      photo:
        users.absenMasuk.kemarin.photo !== undefined
          ? users.absenMasuk.kemarin.photo
          : "",
      latitude:
        users.absenMasuk.kemarin.latitude !== undefined
          ? users.absenMasuk.kemarin.latitude
          : "",
      longitude:
        users.absenMasuk.kemarin.longitude !== undefined
          ? users.absenMasuk.kemarin.longitude
          : "",
      tanggal:
        users.absenMasuk.kemarin.tanggal !== undefined
          ? users.absenMasuk.kemarin.tanggal
          : "",
      jam:
        users.absenMasuk.kemarin.jam !== undefined
          ? users.absenMasuk.kemarin.jam
          : "",
    };

    const absenKeluarKemarin = {
      photo:
        users.absenKeluar.kemarin.photo !== undefined
          ? users.absenKeluar.kemarin.photo
          : "",
      latitude:
        users.absenKeluar.kemarin.latitude !== undefined
          ? users.absenKeluar.kemarin.latitude
          : "",
      longitude:
        users.absenKeluar.kemarin.longitude !== undefined
          ? users.absenKeluar.kemarin.longitude
          : "",
      tanggal:
        users.absenKeluar.kemarin.tanggal !== undefined
          ? users.absenKeluar.kemarin.tanggal
          : "",
      jam:
        users.absenKeluar.kemarin.jam !== undefined
          ? users.absenKeluar.kemarin.jam
          : "",
    };

    const response = h.response({
      status: "success",
      absen: users.absen,
      absenMasukSekarang,
      absenKeluarSekarang,
      absenMasukKemarin,
      absenKeluarKemarin,
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
  AbsenByIdHandler,
};
