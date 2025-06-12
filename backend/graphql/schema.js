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
  }

  type Kunjungan {
    id_kunjungan: ID!
    id_rekam_medis: Int           
    id_dokter: Int
    id_diagnosa: Int
    tanggal_kunjungan: String
    keluhan: String
    tekanan_darah: String
    berat_badan: Float
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
    id_diagnosa: Int
    tanggal_kunjungan: String
    keluhan: String
    tekanan_darah: String
    berat_badan: Float
    }

  type Query {
    getAllRekamMedis: [RekamMedis]
    getRekamMedisById(id: ID!): RekamMedis
    getAllKunjungan: [Kunjungan]
    getAllKunjunganByRekamMedisId(id_rekam_medis: Int!): [Kunjungan]
  }

  type Mutation {
  tambahRekamMedis(input: RekamMedisInput!): RekamMedis

  tambahKunjungan(input: KunjunganInput!): Kunjungan

   hapusRekamMedis(id: Int!): String

   updateRekamMedis(
    id: Int!
    tanggal_dibuat: String
    golongan_darah: String
    alergi: String
    riwayat_penyakit: String
    catatan_dokter: String
    status: String
    ): RekamMedis

    updateKunjungan(
      id_kunjungan: Int!
      tanggal_kunjungan: String
      keluhan: String
      tekanan_darah: String
      berat_badan: Float
      id_dokter: Int
      id_diagnosa: Int
    ): Kunjungan

    hapusKunjungan(id_kunjungan: Int!): Boolean
}

`;

module.exports = typeDefs;
