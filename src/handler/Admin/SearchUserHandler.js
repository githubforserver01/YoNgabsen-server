const { User } = require("../../models");

const SearchUserHandler = async (req, h) => {
  try {
    const { nama } = req.params;
    const user = await User.find({ nama: nama });

    if (!user) {
      const response = h.response({
        status: "failed",
        message: "Nama user tidak ditemukan, silahkan coba lagi",
      });
      response.code(404);
    }

    const resultRemoveDuplicate = user.filter(
      (users, index) =>
        index === user.findIndex((other) => users.nama === other.nama)
    );

    const response = h.response({
      status: "success",
      data: resultRemoveDuplicate,
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

module.exports = { SearchUserHandler };
