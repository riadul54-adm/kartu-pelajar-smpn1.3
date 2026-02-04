// ==================== KARTU PELAJAR - MAIN.JS ====================

// Data sekolah
const sekolahData = {
    nama: "SMP NEGERI 1 PAMARAYAN",
    alamat: "Jl. Pendidikan No. 123, Pamarayan, Kabupaten Serang, Banten 42178",
    telepon: "(0254) 123456",
    tahunAjaran: "2024/2025"
};

// Data siswa untuk login
const siswaDatabase = {
    "2024001": { password: "15012012", nama: "ANDI WIJAYA", kelas: "7A", ttl: "Pamarayan, 15 Januari 2012", alamat: "Jl. Merdeka No. 1" },
    "2024002": { password: "20032012", nama: "SITI AISYAH", kelas: "7B", ttl: "Pamarayan, 20 Maret 2012", alamat: "Jl. Pendidikan No. 5" },
    "2024003": { password: "10072012", nama: "BUDI SANTOSO", kelas: "8A", ttl: "Pamarayan, 10 Juli 2012", alamat: "Jl. Sudirman No. 12" }
};

// ==================== FUNGSI UTAMA ====================
function login() {
    const nis = document.getElementById('nis').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validasi
    if (!nis || !password) {
        alert("⚠️ Harap isi NIS dan Password");
        return;
    }
    
    // Cek login
    if (siswaDatabase[nis] && siswaDatabase[nis].password === password) {
        const siswa = siswaDatabase[nis];
        
        // Tampilkan kartu pelajar dalam HTML yang bisa dicetak
        showStudentCard({
            NIS: nis,
            Nama: siswa.nama,
            Kelas: siswa.kelas,
            TTL: siswa.ttl,
            Alamat: siswa.alamat,
            TahunAjaran: sekolahData.tahunAjaran
        });
        
    } else {
        alert("❌ NIS atau Password salah\n\nCoba:\nNIS: 2024001\nPassword: 15012012");
    }
}

// ==================== TAMPILKAN KARTU PELAJAR ====================
function showStudentCard(siswa) {
    // Buat konten HTML untuk kartu
    const cardHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kartu Pelajar - ${siswa.Nama}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: Arial, sans-serif; 
                    background: #f5f5f5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 20px;
                }
                .card-container {
                    width: 100%;
                    max-width: 400px;
                }
                .kartu-pelajar {
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    overflow: hidden;
                }
                .card-header {
                    background: linear-gradient(to right, #2C3E50, #4A90E2);
                    color: white;
                    padding: 25px;
                    text-align: center;
                }
                .card-header h1 {
                    font-size: 22px;
                    margin-bottom: 10px;
                }
                .card-header h2 {
                    font-size: 16px;
                    font-weight: normal;
                    margin-bottom: 5px;
                }
                .card-body {
                    padding: 25px;
                }
                .student-info {
                    margin-bottom: 20px;
                }
                .info-row {
                    display: flex;
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }
                .info-label {
                    font-weight: bold;
                    color: #2C3E50;
                    width: 120px;
                }
                .info-value {
                    color: #333;
                    flex: 1;
                }
                .photo-area {
                    background: #f8f9fa;
                    border: 2px dashed #4A90E2;
                    border-radius: 10px;
                    padding: 30px;
                    text-align: center;
                    margin: 20px 0;
                }
                .instructions {
                    background: #e8f4ff;
                    border-left: 5px solid #4A90E2;
                    padding: 15px;
                    margin-top: 20px;
                    font-size: 14px;
                    color: #2C3E50;
                }
                .print-btn {
                    background: linear-gradient(to right, #27AE60, #2ECC71);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
                .print-btn:hover {
                    background: linear-gradient(to right, #219653, #27AE60);
                }
                .back-btn {
                    background: #3498DB;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 15px;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }
                @media print {
                    body { background: white; }
                    .print-btn, .back-btn { display: none; }
                    .kartu-pelajar { box-shadow: none; }
                }
            </style>
        </head>
        <body>
            <div class="card-container">
                <div class="kartu-pelajar">
                    <!-- Header -->
                    <div class="card-header">
                        <h1>KARTU PELAJAR</h1>
                        <h2>SMP NEGERI 1 PAMARAYAN</h2>
                        <p>${sekolahData.alamat}</p>
                    </div>
                    
                    <!-- Body -->
                    <div class="card-body">
                        <!-- Area Foto -->
                        <div class="photo-area">
                            <div style="font-size: 48px; color: #4A90E2; margin-bottom: 10px;">
                                📸
                            </div>
                            <p style="color: #666; margin-bottom: 5px;">FOTO SISWA</p>
                            <p style="color: #999; font-size: 14px;">Ukuran: 3x4 cm</p>
                        </div>
                        
                        <!-- Data Siswa -->
                        <div class="student-info">
                            <div class="info-row">
                                <div class="info-label">NIS</div>
                                <div class="info-value">${siswa.NIS}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">NAMA</div>
                                <div class="info-value">${siswa.Nama}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">KELAS</div>
                                <div class="info-value">${siswa.Kelas}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">TTL</div>
                                <div class="info-value">${siswa.TTL}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">ALAMAT</div>
                                <div class="info-value">${siswa.Alamat}</div>
                            </div>
                            <div class="info-row">
                                <div class="info-label">TAHUN AJARAN</div>
                                <div class="info-value">${siswa.TahunAjaran}</div>
                            </div>
                        </div>
                        
                        <!-- QR Code Area -->
                        <div style="text-align: center; margin: 20px 0;">
                            <div style="background: #f0f0f0; padding: 15px; display: inline-block; border-radius: 8px;">
                                <div style="font-size: 24px;">📱</div>
                                <p style="color: #4A90E2; font-weight: bold; margin: 5px 0;">QR CODE VERIFIKASI</p>
                                <p style="color: #666; font-size: 12px;">Scan untuk verifikasi keaslian</p>
                            </div>
                        </div>
                        
                        <!-- Instruksi -->
                        <div class="instructions">
                            <p><strong>📋 CARA CETAK:</strong></p>
                            <p>1. Klik tombol PRINT di bawah</p>
                            <p>2. Pilih ukuran kertas: A4 atau Kartu</p>
                            <p>3. Gunakan kertas photo paper</p>
                            <p>4. Laminating untuk keawetan</p>
                        </div>
                        
                        <!-- Tombol Print -->
                        <button class="print-btn" onclick="window.print()">
                            🖨️ PRINT KARTU INI
                        </button>
                        
                        <!-- Tombol Kembali -->
                        <button class="back-btn" onclick="window.history.back()">
                            ↩️ KEMBALI KE LOGIN
                        </button>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
                    <p>© 2024 SMPN 1 Pamarayan - Sistem Anti Pungli</p>
                </div>
            </div>
            
            <script>
                // Auto print setelah 1 detik (opsional)
                setTimeout(() => {
                    // window.print();
                }, 1000);
            </script>
        </body>
        </html>
    `;
    
    // Buka kartu di window baru
    const cardWindow = window.open('', '_blank');
    cardWindow.document.write(cardHTML);
    cardWindow.document.close();
    
    // Clear form
    document.getElementById('nis').value = '';
    document.getElementById('password').value = '';
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Enter key support
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    // Auto-focus pada NIS
    document.getElementById('nis').focus();
    
    // Demo autofill untuk testing
    // document.getElementById('nis').value = '2024001';
    // document.getElementById('password').value = '15012012';
});
