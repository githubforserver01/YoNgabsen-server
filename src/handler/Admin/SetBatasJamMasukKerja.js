const { JamKerja } = require("../../models");

const SetBatasJamMasukKerja = async (req, h) => {
  try {
    const { jamAwal, jamAkhir } = req.payload;
    const jamkerja = await JamKerja.findById("63e1402f02085e1955a9b5af");

    if (!jamkerja) {
      const response = h.response({
        status: "failed",
        message: "Admin tidak ditemukan",
      });
      response.code(404);
      return response;
    }

    jamkerja.jamMasuk = `${jamAwal}-${jamAkhir}`;

    await jamkerja.save();

    const response = h.response({
      status: "success",
      message: "Berhasil mengubah jam masuk kerja",
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
  SetBatasJamMasukKerja,
};
