const { User, Izin, Admin, NotificationHRD } = require("../../models");
const mongoose = require("mongoose");
const {
  yoNgabsenAdmin_sendMessageToDevice,
} = require("../../utils/firebaseadmin");
const stringify = require("../../utils/stringify");
const { imageIconHistory } = require("../../config/imageIcon");

const IzinKhususHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    const { typeIzin, keterangan, startDate, endDate } = req.payload;

    if (!users) {
      const response = h.response({
        status: "failed",
        message: "Terjadi kesalahan, silahkan coba lagi",
      });
      response.code(500);
      return response;
    }

    const createId = new mongoose.Types.ObjectId();

    const newIzinKhusus = new Izin({
      _id: createId,
      type: typeIzin,
      keterangan: keterangan,
      startDate: startDate,
      endDate: endDate,
      users: users._id,
    });

    await users.save();
    await newIzinKhusus.save();

    const admin = await Admin.find();
    let tokenFcm = "";
    for (const key in admin) {
      tokenFcm = admin[key].fcmtoken;
    }
    const payload = {
      notification: {
        title: `Pengajuan ${typeIzin}`,
        body: `Kak, ada karyawan yang melakukan pengajuan ${typeIzin}`,
        image: imageIconHistory,
      },
    };

    yoNgabsenAdmin_sendMessageToDevice(tokenFcm, payload)
      .then((response) => {
        console.log("====================================");
        console.log(`RESULT SENT MESSAGE TO DEVICE: ${stringify(response)}`);
        console.log("====================================");

        const fcmtoken_notvalid = response.results[0]["error"];

        if (fcmtoken_notvalid) {
          const notificationHrd = new NotificationHRD({
            notification: {},
          });
          notificationHrd.notification.set("notification", stringify(payload));
          notificationHrd.save();
        }
      })
      .catch((error) => {
        console.log("====================================");
        console.log(`ERROR SENT MESSAGE TO DEVICE: ${error.message}`);
        console.log("====================================");
      });

    const response = h.response({
      status: "success",
      message: "Data berhasil disimpan",
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: "failed",
      message: `Terjadi kesalahan karena ${error.message} , silahkan coba lagi`,
    });
    response.code(400);
    return response;
  }
};

module.exports = {
  IzinKhususHandler,
};
