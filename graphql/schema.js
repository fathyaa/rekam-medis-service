const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type RekamMedis {
    id: ID!
    id_pasien: Int
    tanggal_dibuat: String
    golongan_darah: String
    alergi: String
    riwayat_penyakit: String
    catatan_dokter: String
    status: String
    kunjungan: [Kunjungan]
    pasien: Pasien
  }

  type Kunjungan {
    id_kunjungan: ID!
    id_rekam_medis: Int
    id_dokter: Int
    tanggal_kunjungan: String
    keluhan: String
    tekanan_darah: String
    berat_badan: Float
    rawatJalan: RawatJalan
    rawatInap: RawatInap
  }

  type RawatInap {
    id_rawat_inap: ID!
    id_kunjungan: Int
    kamar: String
    tanggal_masuk: String
    tanggal_keluar: String
    diagnosa: DiagnosaInap
  }

  type RawatJalan {
    id_rawat_jalan: ID!
    id_kunjungan: Int!
    tanggal_kunjungan: String!
    keluhan: String
    catatan_dokter: String
    status: String
    diagnosa: DiagnosaJalan
  }

  type DiagnosaInap {
    id_diagnosa_inap: ID!
    id_rawat_inap: Int
    nama_diagnosa: String
    kode_icd10: String
  }

  type DiagnosaJalan {
    id_diagnosa_jalan: ID!
    id_rawat_jalan: Int
    nama_diagnosa: String
    kode_icd10: String
  }

  type Pasien {
    id: Int
    nama: String
    tanggal_lahir: String
  }

  input RekamMedisInput {
    id_pasien: Int!
    tanggal_dibuat: String
    golongan_darah: String
    alergi: String
    riwayat_penyakit: String
    catatan_dokter: String
    status: String
  }

  input KunjunganInput {
    id_rekam_medis: Int
    id_dokter: Int
    tanggal_kunjungan: String
    keluhan: String
    tekanan_darah: String
    berat_badan: Float
  }

  input UpdateRekamMedisInput {
    id: Int!
    tanggal_dibuat: String
    golongan_darah: String
    alergi: String
    riwayat_penyakit: String
    catatan_dokter: String
    status: String
  }

  input UpdateKunjunganInput {
    id_kunjungan: Int!
    tanggal_kunjungan: String
    keluhan: String
    tekanan_darah: String
    berat_badan: Float
    id_dokter: Int
  }

  type Query {
    getAllRekamMedis: [RekamMedis]
    getRekamMedisById(id: ID!): RekamMedis
    getAllKunjungan: [Kunjungan]
    getAllKunjunganByRekamMedisId(id_rekam_medis: Int!): [Kunjungan]
    getAllPasien: [Pasien]
    getDiagnosaInapById(id: Int!): DiagnosaInap
    getDiagnosaJalanById(id: Int!): DiagnosaJalan
    getAllRawatInap: [RawatInap]
    getAllRawatJalan: [RawatJalan]
  }

  type Mutation {
    tambahRekamMedis(input: RekamMedisInput!): RekamMedis
    tambahKunjungan(input: KunjunganInput!): Kunjungan
    hapusRekamMedis(id: Int!): String
    updateRekamMedis(input: UpdateRekamMedisInput!): RekamMedis
    updateKunjungan(input: UpdateKunjunganInput!): Kunjungan
    hapusKunjungan(id_kunjungan: Int!): Boolean
  }
`;

module.exports = typeDefs;
