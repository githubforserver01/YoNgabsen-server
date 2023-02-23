const { Izin } = require("../../models");

const GetPengajuanUserHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const izin = await Izin.findById(id);

    if (!izin) {
      const response = h.response({
        status: "failed",
        message: "Pengajuan ini tidak ditemukan, silahkan coba lagi",
      });
      response.code(404);
      return response;
    }

    const response = h.response({
      status: "success",
      data: izin,
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
  GetPengajuanUserHandler,
};
