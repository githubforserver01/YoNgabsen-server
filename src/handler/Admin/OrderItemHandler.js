const { User } = require("../../models");

const OrderUserByName = async (req, h) => {
  try {
    const user = await User.find();

    if (!user) {
      const response = h.response({
        status: "failed",
        message: "Terjadi kesalahan saat mengurutkan data, silahkan coba lagi",
      });
      response.code(500);
      return response;
    }

    const resultRemoveDuplicate = user.filter(
      (items, index) =>
        index === user.findIndex((other) => items.nama === other.nama)
    );

    const sortedList = resultRemoveDuplicate.sort((a, b) =>
      a.nama.localeCompare(b.nama)
    );

    const response = h.response({
      status: "success",
      data: sortedList,
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
  OrderUserByName,
};
