const { User, Izin, Admin, NotificationHRD } = require("../../models");
const mongoose = require("mongoose");
const { randomCharacter } = require("../../utils/randomCharacter");
const fs = require("fs");
const ACCESS_IMAGE = require("../../url/accessImage/accessImage");
const {
  yoNgabsenAdmin_sendMessageToDevice,
} = require("../../utils/firebaseadmin");
const stringify = require("../../utils/stringify");
const { imageIconHistory } = require("../../config/imageIcon");

const SakitHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    const { typeIzin, foto, keterangan, startDate, endDate } = req.payload;

    if (!users) {
      const response = h.response({
        status: "failed",
        message: "Terjadi kesalahan, silahkan coba lagi",
      });
      response.code(500);
      return response;
    }

    let ext;
    let type;

    ext = foto.includes("image/png")
      ? "png"
      : foto.includes("image/jpg")
      ? "jpg"
      : foto.includes("image/jpeg")
      ? "jepg"
      : foto.includes("application/pdf") && "pdf";

    type = foto.includes("image/png")
      ? "image/png"
      : foto.includes("image/jpg")
      ? "image/jpg"
      : foto.includes("image/jpeg")
      ? "image/jpeg"
      : foto.includes("application/pdf") && "application/pdf";

    const imageName = `${randomCharacter(10)}.${ext}`;
    const replacingPath = foto.replace(`data:${type};base64,`, "");
    const imageData = `./src/image/${imageName}`;

    fs.writeFileSync(imageData, replacingPath, "base64", function (err) {
      const response = h.response({
        status: "failed",
        message: `Terjadi kesalahan ${err.message}, silahkan coba lagi`,
      });
      response.code(500);
      return response;
    });

    const createId = new mongoose.Types.ObjectId();

    const newSakit = new Izin({
      _id: createId,
      type: typeIzin,
      photo: `${ACCESS_IMAGE}${imageName}`,
      keterangan: keterangan,
      startDate: startDate,
      endDate: endDate,
      users: users._id,
    });

    await users.save();
    await newSakit.save();

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
  SakitHandler,
};
