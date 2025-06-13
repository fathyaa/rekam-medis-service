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
    diagnosa: DiagnosaInap
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

  type RekamMedisWithPasien {
    rekamMedis: [RekamMedis]
    pasien: Pasien
  }

    type Pasien {
    id: Int
    nama: String
    nik: String
    jenis_kelamin: String
    alamat: String
    tanggal_lahir: String
  }

  type Query {
    getAllRekamMedis: [RekamMedis]
    getRekamMedisById(id: ID!): RekamMedis
    getAllKunjungan: [Kunjungan]
    getAllKunjunganByRekamMedisId(id_rekam_medis: Int!): [Kunjungan]
    getRekamMedisDanPasien(id_pasien: Int!): RekamMedisWithPasien
    getDiagnosaById(id: Int!): DiagnosaInap
  }

  type DiagnosaInap {
  id_diagnosa_inap: ID!
  id_rawat_inap: Int
  nama_diagnosa: String
  kode_icd10: String
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
