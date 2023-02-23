const { JamKerja } = require("../../models");

const GetJamKerja = async (req, h) => {
  try {
    const jamkerja = await JamKerja.findById("63e1402f02085e1955a9b5af");

    if (!jamkerja) {
      const response = h.response({
        status: "failed",
        message: "Admin tidak ditemukan",
      });
      response.code(404);
      return response;
    }

    const splitJamMasuk = jamkerja.jamMasuk.split("-");
    const splitJamPulang = jamkerja.jamPulang.split("-");

    const response = h.response({
      status: "success",
      message: "Berhasil mengubah jam masuk kerja",
      jamMasukAwal: splitJamMasuk[0],
      jamMasukAkhir: splitJamMasuk[1],
      jamPulangAwal: splitJamPulang[0],
      jamPulangAkhir: splitJamPulang[1],
    });
    response.code(201);
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
  GetJamKerja,
};
