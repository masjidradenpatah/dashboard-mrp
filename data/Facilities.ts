import eyeglasses from "@/public/facilities/eyeglasses.jpg";
import robe from "@/public/facilities/mukena.jpg";
import p3k from "@/public/facilities/kotak_p3k.jpg";
import penitipan_barang from "@/public/facilities/tempat_penitipan_barang.jpg";
import plastik_sepatu from "@/public/facilities/plastik_sepatu.jpg";
import shoes from "@/public/facilities/rak_sepatu.jpg";
import qris_mrp from "@/public/facilities/qris_mrp.jpg";
import proyektor from "@/public/facilities/proyektor.jpg";
import braille from "@/public/facilities/quran_braille.jpg";
import etalase_barang_temuan from "@/public/facilities/etalase_barang_temuan.jpg";
import cctv from "@/public/facilities/cctv.jpg";
import charger_box from "@/public/facilities/charger_box.jpg";
import { Facility } from "@/types/Facility";

export const facilities: Facility[] = [
  {
    title: "Kacamata Baca",
    image: eyeglasses,
  },
  {
    title: "Mukena",
    image: robe,
  },
  {
    title: "CCTV",
    image: cctv,
  },
  {
    title: "Kotak P3K ",
    image: p3k,
  },
  {
    title: "Etalase Barang Temuan ",
    image: etalase_barang_temuan,
  },
  {
    title: "Charger Box ",
    image: charger_box,
  },
  {
    title: "Tempat Penitipan Barang",
    image: penitipan_barang,
  },
  {
    title: "Plastik Alas Kaki Jama'ah",
    image: plastik_sepatu,
  },
  {
    title: "Kotak Infaq Digital (Qris)",
    image: qris_mrp,
  },
  {
    title: "Qur'an Braille",
    image: braille,
  },
  {
    title: "Lemari Alas Kaki",
    image: shoes,
  },
  {
    title: "Proyektor",
    image: proyektor,
  },
];
