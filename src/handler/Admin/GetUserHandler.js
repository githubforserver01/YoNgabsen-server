const { Auth } = require("../../models");

const GetUserHandler = async (req, h) => {
  try {
    const auth = await Auth.find().populate('users');

    if (!auth) {
      const response = h.response({
        status: "failed",
        message: "Gagal mengambil data user, silahkan coba lagi",
      });
      response.code(500);
      return response
    }

    const response = h.response({
      status: "success",
      message: "Berhasil mengambil data user",
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

module.exports = { GetUserHandler };
