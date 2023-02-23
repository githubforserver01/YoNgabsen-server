const mongoose = require("mongoose");
const { Schema } = mongoose;

const AbsenKeluar = mongoose.model(
  "AbsenKeluar",
  new Schema({
    _id: Schema.Types.ObjectId,
    sekarang: {
      photo: String,
      latitude: String,
      longitude: String,
      tanggal: String,
      jam: String,
    },
    kemarin: {
      photo: String,
      latitude: String,
      longitude: String,
      tanggal: String,
      jam: String,
    },
  })
);

const JamKerja = mongoose.model(
  "JamKerja",
  new Schema({
    _id: Schema.Types.ObjectId,
    jamMasuk: String,
    jamPulang: String,
  })
);

const AbsenMasuk = mongoose.model(
  "AbsenMasuk",
  new Schema({
    _id: Schema.Types.ObjectId,
    sekarang: {
      photo: String,
      latitude: String,
      longitude: String,
      tanggal: String,
      jam: String,
    },
    kemarin: {
      photo: String,
      latitude: String,
      longitude: String,
      tanggal: String,
      jam: String,
    },
  })
);

const Admin = mongoose.model(
  "Admin",
  new Schema({
    _id: Schema.Types.ObjectId,
    foto: String,
    nama: String,
    divisi: String,
    fcmtoken: String,
    jamMasuk: String,
    jamPulang: String,
    izin: {
      type: Schema.Types.ObjectId,
      ref: "Izin",
    },
  })
);

const Auth = mongoose.model(
  "Auth",
  new Schema({
    email: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    authKeys: [String],
    role: { type: String, default: "user" },
    users: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  })
);

const NotificationHRD = mongoose.model(
  "NotificationHRD",
  new Schema({
    notification: {
      type: Map,
      of: String,
    },
  })
);

const NotificationUser = mongoose.model(
  "NotificationUser",
  new Schema({
    notification: {
      type: Map,
      of: String,
    },
  })
);

const Izin = mongoose.model(
  "Izin",
  new Schema({
    _id: Schema.Types.ObjectId,
    type: String,
    photo: String,
    startDate: String,
    endDate: String,
    keputusanHRD: {
      type: String,
      default: "",
    },
    pesanHRD: String,
    users: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

const User = mongoose.model(
  "User",
  new Schema({
    _id: Schema.Types.ObjectId,
    foto: String,
    noId: String,
    nama: String,
    usia: String,
    jenisKelamin: String,
    pekerjaan: String,
    divisi: String,
    no_ktp: String,
    no_telp: String,
    alamat: String,
    fcmtoken: String,
    absen: {
      type: String,
      default: "masuk",
    },
    status: {
      type: String,
      enum: ["Internship", "Proboration", "Kontrak", "Tetap"],
    },
    absenMasuk: {
      type: Schema.Types.ObjectId,
      ref: "AbsenMasuk",
    },
    absenKeluar: {
      type: Schema.Types.ObjectId,
      ref: "AbsenKeluar",
    },
    izin: [
      {
        type: Schema.Types.ObjectId,
        ref: "Izin",
      },
    ],
  })
);

module.exports = {
  NotificationHRD,
  NotificationUser,
  JamKerja,
  AbsenMasuk,
  AbsenKeluar,
  Admin,
  Auth,
  Izin,
  User,
};
