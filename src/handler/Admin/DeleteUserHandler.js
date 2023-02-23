const { Auth, User, AbsenMasuk, AbsenKeluar, Izin } = require("../../models");

const DeleteUserHandler = async (req, h) => {
  try {
    const { id } = req.params;

    await Auth.findByIdAndRemove({ _id: id }, { new: true });
    await User.findByIdAndRemove({ _id: id }, { new: true });
    await AbsenMasuk.findByIdAndRemove({ _id: id }, { new: true });
    await AbsenKeluar.findByIdAndRemove({ _id: id }, { new: true });
    await Izin.findByIdAndRemove({ _id: id }, { new: true });

    const response = h.response({
      status: "success",
      message: "Berhasil menghapus user",
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

module.exports = { DeleteUserHandler };
