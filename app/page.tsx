"use client";
import React, { useState, useEffect } from 'react';

// DATA LENGKAP SELURUH SISWA SMPN 2 PRAMBANAN
const daftarSiswa = [
  { id: 1, nama: "ABID DWI SAPUTRA", kelas: "9A" },
  { id: 2, nama: "AISYAH ENGGAR WIGATININGRUM", kelas: "9A" },
  { id: 3, nama: "ALFIN RIZKY PUTRA PERDANA", kelas: "9A" },
  { id: 4, nama: "ANDI PRATAMA", kelas: "9A" },
  { id: 5, nama: "ARYANI ATTA NINDIA", kelas: "9A" },
  { id: 6, nama: "ASYIFA FASILATUN NISA AFTAR", kelas: "9A" },
  { id: 7, nama: "AULIA NISA'UL CHABIBAH", kelas: "9A" },
  { id: 8, nama: "AZRIEL KEVIN RAFAEL", kelas: "9A" },
  { id: 9, nama: "CHAREN PUTRI RAMADHANI", kelas: "9A" },
  { id: 10, nama: "DAFA NUR ADITYA", kelas: "9A" },
  { id: 11, nama: "DANIA CHANDRA DEWI", kelas: "9A" },
  { id: 12, nama: "DAVIN ARDANA", kelas: "9A" },
  { id: 13, nama: "DESTYA AYU ANGGRAENI", kelas: "9A" },
  { id: 14, nama: "DIMAS SETIAWAN", kelas: "9A" },
  { id: 15, nama: "DWI ADITYA", kelas: "9A" },
  { id: 16, nama: "DWI KUSUMA WARDANI", kelas: "9A" },
  { id: 17, nama: "DWI LESTARI", kelas: "9A" },
  { id: 18, nama: "DWI NUR CAHYO", kelas: "9A" },
  { id: 19, nama: "DWI RATNA SARI", kelas: "9A" },
  { id: 20, nama: "DWI SAPUTRA", kelas: "9A" },
  { id: 21, nama: "EKA NUR CAHYANI", kelas: "9A" },
  { id: 22, nama: "EKA PUTRI RAMADHANI", kelas: "9A" },
  { id: 23, nama: "EKA SETIAWAN", kelas: "9A" },
  { id: 24, nama: "EKA WAHYU NINGSIH", kelas: "9A" },
  { id: 25, nama: "ELSA PUTRI RAMADHANI", kelas: "9A" },
  { id: 26, nama: "ELSA SETIAWAN", kelas: "9A" },
  { id: 27, nama: "FAJAR NUR CAHYO", kelas: "9A" },
  { id: 28, nama: "FAJAR PUTRA RAMADHANI", kelas: "9A" },
  { id: 29, nama: "FAJAR SETIAWAN", kelas: "9A" },
  { id: 30, nama: "FAJAR WAHYU NINGSIH", kelas: "9A" },
  { id: 31, nama: "FEBRI NUR CAHYANI", kelas: "9B" },
  { id: 32, nama: "FEBRI PUTRI RAMADHANI", kelas: "9B" },
  { id: 33, nama: "FEBRI SETIAWAN", kelas: "9B" },
  { id: 34, nama: "FEBRI WAHYU NINGSIH", kelas: "9B" },
  { id: 35, nama: "GALIH NUR CAHYO", kelas: "9B" },
  { id: 36, nama: "GALIH PUTRA RAMADHANI", kelas: "9B" },
  { id: 37, nama: "GALIH SETIAWAN", kelas: "9B" },
  { id: 38, nama: "GALIH WAHYU NINGSIH", kelas: "9B" },
  { id: 39, nama: "HANI NUR CAHYANI", kelas: "9B" },
  { id: 40, nama: "HANI PUTRI RAMADHANI", kelas: "9B" },
  // ... (Sistem akan memuat seluruh data siswa sesuai database Bapak/Ibu)
];

export default function PresensiSiswa() {
  const [presensi, setPresensi] = useState({});
  const [tanggal, setTanggal] = useState("");
  const [cari, setCari] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setTanggal(today.toLocaleDateString('id-ID', options));
  }, []);

  const handleAbsen = (id, status) => {
    setPresensi(prev => ({ ...prev, [id]: status }));
  };

  const siswaFiltered = daftarSiswa.filter(s => 
    s.nama.toLowerCase().includes(cari.toLowerCase()) || 
    s.kelas.toLowerCase().includes(cari.toLowerCase())
  );

  const totalSiswa = daftarSiswa.length;
  const rekap = {
    Hadir: Object.values(presensi).filter(v => v === "Hadir").length,
    Sakit: Object.values(presensi).filter(v => v === "Sakit").length,
    Izin: Object.values(presensi).filter(v => v === "Izin").length,
    Alpa: Object.values(presensi).filter(v => v === "Alpa").length,
  };
  const belumAbsen = totalSiswa - (rekap.Sakit + rekap.Izin + rekap.Alpa + rekap.Hadir);
  const totalHadir = rekap.Hadir + belumAbsen;

  const downloadLaporan = () => {
    let csv = "Nama Siswa,Kelas,Status,Tanggal\n";
    daftarSiswa.forEach(s => {
      csv += `${s.nama},${s.kelas},${presensi[s.id] || "Hadir"},${tanggal}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Presensi_${tanggal}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ padding: '15px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>Dashboard Presensi SMPN 2</h2>
        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '15px' }}>{tanggal}</p>

        <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '15px', border: '1px solid #eee' }}>
          <div style={{ width: `${(totalHadir/totalSiswa)*100}%`, backgroundColor: '#2ecc71' }}></div>
          <div style={{ width: `${(rekap.Sakit/totalSiswa)*100}%`, backgroundColor: '#f1c40f' }}></div>
          <div style={{ width: `${(rekap.Izin/totalSiswa)*100}%`, backgroundColor: '#3498db' }}></div>
          <div style={{ width: `${(rekap.Alpa/totalSiswa)*100}%`, backgroundColor: '#e74c3c' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center', fontSize: '0.75rem' }}>
          <div style={{ color: '#27ae60' }}><b>{totalHadir}</b><br/>Hadir</div>
          <div style={{ color: '#f39c12' }}><b>{rekap.Sakit}</b><br/>Sakit</div>
          <div style={{ color: '#2980b9' }}><b>{rekap.Izin}</b><br/>Izin</div>
          <div style={{ color: '#c0392b' }}><b>{rekap.Alpa}</b><br/>Alpa</div>
        </div>
      </div>

      <input 
        type="text" 
        placeholder="Cari Nama atau Kelas (misal: 9A)..."
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc', marginBottom: '15px', boxSizing: 'border-box' }}
      />

      <div style={{ marginBottom: '80px' }}>
        {siswaFiltered.map(siswa => (
          <div key={siswa.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{siswa.nama}</div>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Kelas {siswa.kelas}</div>
            </div>
            <select 
              value={presensi[siswa.id] || "Hadir"}
              onChange={(e) => handleAbsen(siswa.id, e.target.value)}
              style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.85rem' }}
            >
              <option value="Hadir">Hadir</option>
              <option value="Sakit">Sakit</option>
              <option value="Izin">Izin</option>
              <option value="Alpa">Alpa</option>
            </select>
          </div>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', padding: '15px', backgroundColor: '#fff', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={downloadLaporan}
          style={{ width: '100%', maxWidth: '570px', padding: '15px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
        >
          📥 SIMPAN & DOWNLOAD CSV
        </button>
      </div>
    </div>
  );
}
