const { Izin } = require("../../models");

const GetListPengajuanUserHandler = async (req, h) => {
  try {
    const izin = await Izin.find();

    if (!izin) {
      const response = h.response({
        status: "failed",
        message: "Terjadi kesalahan, data tidak ditemukan",
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
  GetListPengajuanUserHandler,
};
