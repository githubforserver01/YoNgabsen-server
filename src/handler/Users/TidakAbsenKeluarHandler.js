const { AbsenKeluar } = require("../../models");

const TidakAbsenKeluarHandler = async (req, h) => {
try {
    const absenKeluar = await AbsenKeluar.find()

    if (!absenKeluar) {
        const response = h.response({
            status: "failed",
            message: "Gagal mengambil data!",
          });
          response.code(404);
          return response;
    }

    await absenKeluar.filter((member) => {
        if (member.absen === "Belum absen") {
            member.absen = "Telat"
        }
    })

    await absenKeluar.save()

    const response = h.response({
        status: "success",
        message: "Reset",
      });
      response.code(200)
      return response
} catch (error) {
    const response = h.response({
        status: "failed",
        message: `Terjadi kesalahan karena ${error.message} , silahkan coba lagi`,
      });
      response.code(500);
      return response;
}
}

module.exports = {
    TidakAbsenKeluarHandler
}