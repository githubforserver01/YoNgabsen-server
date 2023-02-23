const { Auth } = require("../../models");

const GetProfileHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const auth = await Auth.findById(id).populate('users')

    if (!auth) {
      const response = h.response({
        status: "failed",
        message: "Gagal mengambil data profile anda, silahkan coba lagi",
      });
      response.code(500);
      return response;
    }

    const response = h.response({
      status: "success",
      message: "Berhasil mengambil data profile anda",
      data: auth,
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

module.exports = { GetProfileHandler };
