const { imageIconHistory } = require("../../config/imageIcon");
const { Izin, NotificationUser } = require("../../models");
const { yoNgabsen_sendMessageToDevice } = require("../../utils/firebaseadmin");
const stringify = require("../../utils/stringify");

const KeputusanIzinHRDHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const { keputusan, alasan } = req.payload;
    const izin = await Izin.findById(id).populate("users");

    izin.keputusanHRD = keputusan;
    izin.pesanHRD = alasan;

    await izin.save();

    const tokenFcm = izin.users.fcmtoken;

    const payload = {
      notification: {
        title: `Keputusan pengajuan dari HR`,
        body: keputusan,
        image: imageIconHistory,
      },
    };

    yoNgabsen_sendMessageToDevice(tokenFcm, payload)
      .then((response) => {
        console.log("====================================");
        console.log(`RESULT SENT MESSAGE TO DEVICE: ${stringify(response)}`);
        console.log("====================================");

        const fcmtoken_notvalid = response.results[0]["error"];

        if (fcmtoken_notvalid) {
          const notificationHrd = new NotificationUser({
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
      message: "Berhasil menyimpan keputusan",
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
  KeputusanIzinHRDHandler,
};
