// ==================== KARTU PELAJAR ONLINE - MAIN.JS ====================

// Data sekolah
const sekolahData = {
    nama: "SMP NEGERI 1 PAMARAYAN",
    alamat: "Jl. Pendidikan No. 123, Pamarayan, Kabupaten Serang, Banten 42178",
    telepon: "(0254) 123456",
    tahunAjaran: "2024/2025"
};

// Data siswa untuk demo
const demoStudents = {
    "2024001": {
        NIS: "2024001",
        Nama: "ANDI WIJAYA",
        Kelas: "7A",
        JenisKelamin: "L",
        TTL: "Pamarayan, 15 Januari 2012",
        Alamat: "Jl. Merdeka No. 1",
        Password: "15012012",
        TahunAjaran: "2024/2025"
    },
    "2024002": {
        NIS: "2024002",
        Nama: "SITI AISYAH",
        Kelas: "7B",
        JenisKelamin: "P",
        TTL: "Pamarayan, 20 Maret 2012",
        Alamat: "Jl. Pendidikan No. 5",
        Password: "20032012",
        TahunAjaran: "2024/2025"
    }
};

// ==================== LOGIN FUNCTION ====================
async function login() {
    const nis = document.getElementById('nis').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validasi input
    if (!nis || !password) {
        alert('Harap isi NIS dan Password');
        return;
    }
    
    // Tampilkan loading
    const loginBtn = document.querySelector('.btn-login');
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MEMPROSES...';
    loginBtn.disabled = true;
    
    try {
        // Cari siswa
        let siswa = null;
        
        // Cek di data demo dulu
        if (demoStudents[nis] && demoStudents[nis].Password === password) {
            siswa = demoStudents[nis];
        } 
        // Cek di localStorage (data dari admin)
        else {
            const storedData = localStorage.getItem('siswaData');
            if (storedData) {
                const allStudents = JSON.parse(storedData);
                const found = allStudents.find(s => s.NIS === nis && s.Password === password);
                if (found) siswa = found;
            }
        }
        
        if (siswa) {
            // LOGIN BERHASIL - Generate kartu
            alert(`✅ LOGIN BERHASIL!\n\nSelamat datang ${siswa.Nama}\nMembuat kartu pelajar...`);
            
            // Generate dan download PDF
            await generatePDF(siswa);
            
            // Simpan log
            saveDownloadLog(nis);
            
        } else {
            alert('❌ LOGIN GAGAL\nNIS atau Password salah');
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi error: ' + error.message);
    } finally {
        // Reset button
        loginBtn.innerHTML = '<i class="fas fa-download"></i> LOGIN & DOWNLOAD KARTU';
        loginBtn.disabled = false;
    }
}

// ==================== GENERATE PDF FUNCTION ====================
function generatePDF(siswa) {
    return new Promise((resolve, reject) => {
        try {
            // Buat PDF dengan jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [86, 54] // Ukuran kartu
            });
            
            // ===== DESIGN KARTU =====
            
            // Background
            doc.setFillColor(245, 245, 245);
            doc.rect(0, 0, 86, 54, 'F');
            
            // Header biru
            doc.setFillColor(41, 128, 185);
            doc.rect(0, 0, 86, 12, 'F');
            
            // Judul
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('KARTU PELAJAR', 43, 7, { align: 'center' });
            
            // Nama sekolah
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);
            doc.text(sekolahData.nama, 43, 17, { align: 'center' });
            
            // Alamat sekolah
            doc.setFontSize(6);
            doc.text(sekolahData.alamat, 43, 21, { align: 'center' });
            
            // Garis pemisah
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.5);
            doc.line(5, 24, 81, 24);
            
            // ===== DATA SISWA =====
            
            let yPos = 28;
            
            // NIS
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.text('NIS:', 10, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(siswa.NIS, 25, yPos);
            
            // Nama
            yPos += 6;
            doc.setFont('helvetica', 'bold');
            doc.text('NAMA:', 10, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(siswa.Nama, 25, yPos);
            
            // Kelas
            yPos += 6;
            doc.setFont('helvetica', 'bold');
            doc.text('KELAS:', 10, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(siswa.Kelas, 25, yPos);
            
            // TTL
            yPos += 6;
            doc.setFont('helvetica', 'bold');
            doc.text('TTL:', 10, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(siswa.TTL, 25, yPos);
            
            // ===== FOTO & QR AREA =====
            
            // Kotak foto
            doc.setDrawColor(150, 150, 150);
            doc.rect(55, 28, 25, 30);
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(7);
            doc.text('FOTO', 67.5, 40, { align: 'center' });
            doc.text('3x4 cm', 67.5, 44, { align: 'center' });
            
            // QR Code area
            doc.setDrawColor(41, 128, 185);
            doc.rect(55, 45, 25, 8);
            doc.setTextColor(41, 128, 185);
            doc.setFontSize(5);
            doc.text('SCAN QR CODE', 67.5, 48, { align: 'center' });
            doc.text('UNTUK VERIFIKASI', 67.5, 51, { align: 'center' });
            
            // ===== FOOTER =====
            
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(5);
            doc.text(`Tahun Ajaran: ${siswa.TahunAjaran}`, 43, 52, { align: 'center' });
            
            // ===== SAVE PDF =====
            
            const fileName = `KARTU_PELAJAR_${siswa.NIS}_${siswa.Nama.replace(/\s/g, '_')}.pdf`;
            doc.save(fileName);
            
            // Selesai
            setTimeout(() => {
                alert(`📄 KARTU BERHASIL DI-DOWNLOAD!\n\nFile: ${fileName}\n\nInstruksi cetak:\n1. Print pada kertas foto/kartu\n2. Ukuran: Kartu (86x54mm)\n3. Laminating untuk keawetan`);
                resolve();
            }, 1000);
            
        } catch (error) {
            console.error('PDF Error:', error);
            
            // Fallback: Tampilkan data saja
            alert(`Login berhasil tetapi PDF gagal dibuat.\n\nDATA SISWA:\nNIS: ${siswa.NIS}\nNama: ${siswa.Nama}\nKelas: ${siswa.Kelas}\n\nSilakan hubungi admin untuk kartu fisik.`);
            
            reject(error);
        }
    });
}

// ==================== HELPER FUNCTIONS ====================
function saveDownloadLog(nis) {
    try {
        let logs = JSON.parse(localStorage.getItem('downloadLogs') || '[]');
        logs.push({
            nis: nis,
            date: new Date().toLocaleDateString('id-ID'),
            time: new Date().toLocaleTimeString('id-ID')
        });
        localStorage.setItem('downloadLogs', JSON.stringify(logs));
        
        // Update counter
        let count = parseInt(localStorage.getItem('totalDownloads') || '0');
        localStorage.setItem('totalDownloads', (count + 1).toString());
    } catch (e) {
        console.log('Gagal simpan log:', e);
    }
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Enter key support
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    // Auto-focus
    document.getElementById('nis').focus();
});
