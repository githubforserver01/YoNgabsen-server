const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const key = require("../../config/config");
const { Auth, User, NotificationUser } = require("../../models");
const { yoNgabsen_sendMessageToDevice } = require("../../utils/firebaseadmin");
const stringify = require("../../utils/stringify");

const UserSignInHandler = async (req, h) => {
  try {
    const { email, password, fcmtoken } = req.payload;
    const auth = await Auth.findOne({ email: email }).populate("users");
    const notificationUser = await NotificationUser.find();

    if (!auth) {
      const response = h.response({
        status: "failed",
        message: "User tidak ditemukan",
      });
      response.code(404);
      return response;
    }

    const checkPassword = await bcrypt.compare(password, auth.password);

    if (!checkPassword) {
      const response = h.response({
        status: "failed",
        message: "Password yang anda masukan salah",
      });
      response.code(404);
      return response;
    }

    const randomId = nanoid(16);

    auth.authKeys.unshift(randomId);
    const updateUser = await User.findByIdAndUpdate(
      auth.users._id,
      { $set: { fcmtoken: fcmtoken } },
      { new: true }
    );

    const token = jwt.sign(
      {
        _id: auth._id,
        key: randomId,
      },
      key
    );

    await updateUser.save();
    await auth.save();

    if (notificationUser.length > 0) {
      await notificationUser.map((notifikasi) => {
        const getNotifikasi = notifikasi.notification.get("notification");
        const payload = JSON.parse(getNotifikasi);
        yoNgabsen_sendMessageToDevice(fcmtoken, payload)
          .then((response) => {
            console.log("====================================");
            console.log(
              `RESULT SENT MESSAGE TO DEVICE: ${stringify(response)}`
            );
            console.log("====================================");
            notifikasi.deleteOne({ _id: notifikasi._id });
          })
          .catch((error) => {
            console.log("====================================");
            console.log(`ERROR SENT MESSAGE TO DEVICE: ${error.message}`);
            console.log("====================================");
          });
      });
    }

    const response = h.response({
      id_identity: auth.users._id,
      status: "success",
      message: "Berhasil masuk",
      token: token,
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
  // verifyUniqueUsername,
  // verifyUniqueEmail,
  UserSignInHandler,
};
