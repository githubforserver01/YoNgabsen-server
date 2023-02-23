const { User } = require("../../models");

const GetIzinByIdHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const izin = await User.findById(id).populate("izin");

    if (!izin) {
      const response = h.response({
        status: "failed",
        message: "Terjadi kesalahan saat mengambil data, silahkan coba lagi",
      });
      response.code(500);
      return response;
    }

    const response = h.response({
      status: "success",
      message: "Data berhasil ditemukan",
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
  GetIzinByIdHandler,
};
