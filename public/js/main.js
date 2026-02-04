// Base URL untuk GitHub Pages
const BASE_URL = window.location.origin;
let currentSiswa = null;

// Inisialisasi jsPDF
const { jsPDF } = window.jspdf;

// Data sekolah (bisa diambil dari settings nanti)
const sekolahData = {
    nama: "SMP NEGERI 1 PAMARAYAN",
    alamat: "Jl. Pendidikan No. 123, Pamarayan, Kabupaten Serang, Banten 42178",
    telepon: "(0254) 123456",
    website: "https://riadul54-adm.github.io/kartu-pelajar-smpn1/",
    tahunAjaran: "2024/2025"
};

// Data siswa dummy untuk demo (nanti akan diambil dari database)
const demoData = {
    "2024001": {
        NIS: "2024001",
        Nama: "ANDI WIJAYA",
        Kelas: "7A",
        JenisKelamin: "L",
        TTL: "Pamarayan, 15 Januari 2012",
        Alamat: "Jl. Merdeka No. 1, Pamarayan",
        Foto: "",
        TahunAjaran: "2024/2025"
    },
    "2024002": {
        NIS: "2024002",
        Nama: "SITI AISYAH",
        Kelas: "7B",
        JenisKelamin: "P",
        TTL: "Pamarayan, 20 Maret 2012",
        Alamat: "Jl. Pendidikan No. 5, Pamarayan",
        Foto: "",
        TahunAjaran: "2024/2025"
    }
};

// Login siswa
async function login() {
    const nis = document.getElementById('nis').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!nis || !password) {
        alert('Harap isi NIS dan Password');
        return;
    }
    
    // Validasi format password (DDMMYYYY)
    if (password.length !== 8 || isNaN(password)) {
        alert('Password harus 8 digit angka (DDMMYYYY)');
        return;
    }
    
    try {
        // Simulasi login - nanti akan diganti dengan API
        showLoading();
        
        // Check demo data
        if (demoData[nis] && password === nis.slice(4) + "2012") {
            // Password benar (untuk demo: 15012012 untuk 2024001)
            currentSiswa = demoData[nis];
            
            // Generate dan download kartu
            await generateKartuPelajar(currentSiswa);
            
            // Simpan log download
            saveDownloadLog(nis);
            
        } else {
            // Coba cek localStorage (data dari admin panel)
            const siswaData = JSON.parse(localStorage.getItem('siswaData') || '[]');
            const siswa = siswaData.find(s => s.NIS === nis && s.Password === password);
            
            if (siswa) {
                currentSiswa = siswa;
                await generateKartuPelajar(currentSiswa);
                saveDownloadLog(nis);
            } else {
                throw new Error('NIS atau password salah');
            }
        }
        
    } catch (error) {
        alert('Login gagal: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Generate kartu pelajar PDF
function generateKartuPelajar(siswa) {
    return new Promise((resolve) => {
        // Buat PDF baru - Ukuran kartu (86mm x 54mm)
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [86, 54]
        });
        
        // ============= BACKGROUND & DESIGN =============
        
        // Background utama
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 0, 86, 54, 'F');
        
        // Header biru
        doc.setFillColor(41, 128, 185); // Biru SMP
        doc.rect(0, 0, 86, 12, 'F');
        
        // ============= LOGO & JUDUL =============
        
        // Judul KARTU PELAJAR
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('KARTU PELAJAR', 43, 7, { align: 'center' });
        
        // Nama Sekolah
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(sekolahData.nama, 43, 17, { align: 'center' });
        
        // Alamat Sekolah
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.text(sekolahData.alamat, 43, 20, { align: 'center' });
        
        // Tahun Ajaran
        doc.text(`TAHUN AJARAN: ${siswa.TahunAjaran || sekolahData.tahunAjaran}`, 43, 23, { align: 'center' });
        
        // ============= FOTO SISWA =============
        
        // Kotak foto (jika ada foto)
        doc.setDrawColor(150, 150, 150);
        doc.setLineWidth(0.5);
        doc.rect(5, 26, 20, 25);
        
        // Text placeholder foto
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(6);
        doc.text('FOTO', 15, 35, { align: 'center' });
        doc.text('3x4', 15, 38, { align: 'center' });
        
        // ============= DATA SISWA =============
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        
        let yPos = 28;
        const lineHeight = 4;
        
        // NIS
        doc.setFont('helvetica', 'bold');
        doc.text('NIS:', 27, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(siswa.NIS, 35, yPos);
        yPos += lineHeight;
        
        // NAMA
        doc.setFont('helvetica', 'bold');
        doc.text('NAMA:', 27, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(siswa.Nama, 38, yPos);
        yPos += lineHeight;
        
        // KELAS
        doc.setFont('helvetica', 'bold');
        doc.text('KELAS:', 27, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(siswa.Kelas, 38, yPos);
        yPos += lineHeight;
        
        // JENIS KELAMIN
        doc.setFont('helvetica', 'bold');
        doc.text('JK:', 27, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(siswa.JenisKelamin === 'L' ? 'LAKI-LAKI' : 'PEREMPUAN', 35, yPos);
        yPos += lineHeight;
        
        // TTL
        doc.setFont('helvetica', 'bold');
        doc.text('TTL:', 27, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(siswa.TTL, 35, yPos);
        yPos += lineHeight;
        
        // ALAMAT
        doc.setFont('helvetica', 'bold');
        doc.text('ALAMAT:', 27, yPos);
        doc.setFont('helvetica', 'normal');
        
        // Potong alamat jika terlalu panjang
        const alamat = siswa.Alamat.length > 30 ? siswa.Alamat.substring(0, 30) + '...' : siswa.Alamat;
        doc.text(alamat, 40, yPos);
        
        // ============= QR CODE AREA =============
        
        // Kotak QR Code
        doc.setDrawColor(41, 128, 185);
        doc.setLineWidth(0.5);
        doc.rect(60, 26, 20, 20);
        
        // Text QR Code
        doc.setTextColor(41, 128, 185);
        doc.setFontSize(6);
        doc.text('SCAN UNTUK', 70, 48, { align: 'center' });
        doc.text('VERIFIKASI', 70, 51, { align: 'center' });
        
        // ============= FOOTER & INFO =============
        
        // Garis pemisah
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.2);
        doc.line(5, 52, 81, 52);
        
        // Info penting
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(5);
        doc.text('Kartu ini berlaku selama menjadi siswa di ' + sekolahData.nama, 43, 54, { align: 'center' });
        
        // ============= SAVE PDF =============
        
        // Generate nama file
        const fileName = `KARTU_PELAJAR_${siswa.NIS}_${siswa.Nama.replace(/\s+/g, '_')}.pdf`;
        
        // Save PDF
        doc.save(fileName);
        
        // Tampilkan pesan sukses
        setTimeout(() => {
            alert(`✅ KARTU PELAJAR BERHASIL DI-GENERATE!\n\nFile: ${fileName}\n\nSilakan cetak dengan:\n• Ukuran: Kartu (86x54mm)\n• Kertas: Photo paper atau kartu\n• Warna: Full color`);
            resolve();
        }, 500);
    });
}

// Generate kartu sederhana (versi alternatif)
function generateSimpleCard(siswa) {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Header
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Logo/title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('KARTU PELAJAR', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(sekolahData.nama, 105, 30, { align: 'center' });
    
    // Student photo area
    doc.setDrawColor(0, 0, 0);
    doc.rect(20, 60, 40, 50);
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text('FOTO', 40, 85, { align: 'center' });
    doc.text('3x4 cm', 40, 90, { align: 'center' });
    
    // Student data
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`NIS: ${siswa.NIS}`, 80, 60);
    doc.text(`Nama: ${siswa.Nama}`, 80, 70);
    doc.text(`Kelas: ${siswa.Kelas}`, 80, 80);
    doc.text(`TTL: ${siswa.TTL}`, 80, 90);
    doc.text(`Alamat: ${siswa.Alamat.substring(0, 50)}`, 80, 100);
    
    // QR Code placeholder
    doc.setDrawColor(41, 128, 185);
    doc.rect(150, 60, 40, 40);
    doc.setTextColor(41, 128, 185);
    doc.setFontSize(10);
    doc.text('QR CODE', 170, 85, { align: 'center' });
    doc.text('VERIFIKASI', 170, 90, { align: 'center' });
    
    // Footer
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Tahun Ajaran: ${siswa.TahunAjaran}`, 105, 150, { align: 'center' });
    doc.text('Kartu ini sah dan berlaku selama menjadi siswa', 105, 160, { align: 'center' });
    
    doc.save(`kartu-pelajar-${siswa.NIS}.pdf`);
}

// Simpan log download
function saveDownloadLog(nis) {
    let logs = JSON.parse(localStorage.getItem('downloadLogs') || '[]');
    logs.push({
        nis: nis,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
    localStorage.setItem('downloadLogs', JSON.stringify(logs));
    
    // Update counter di admin panel
    let count = parseInt(localStorage.getItem('totalDownload') || '0');
    localStorage.setItem('totalDownload', (count + 1).toString());
}

// Loading functions
function showLoading() {
    document.getElementById('nis').disabled = true;
    document.getElementById('password').disabled = true;
    document.querySelector('.btn-login').innerHTML = '<i class="fas fa-spinner fa-spin"></i> MEMBUAT KARTU...';
    document.querySelector('.btn-login').disabled = true;
}

function hideLoading() {
    document.getElementById('nis').disabled = false;
    document.getElementById('password').disabled = false;
    document.querySelector('.btn-login').innerHTML = '<i class="fas fa-download"></i> LOGIN & DOWNLOAD KARTU';
    document.querySelector('.btn-login').disabled = false;
}

// Event listener untuk Enter key
document.addEventListener('DOMContentLoaded', function() {
    // Enter key support
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    // Auto-focus pada NIS field
    document.getElementById('nis').focus();
    
    // Check jika ada parameter NIS di URL (untuk testing)
    const urlParams = new URLSearchParams(window.location.search);
    const nisParam = urlParams.get('nis');
    if (nisParam) {
        document.getElementById('nis').value = nisParam;
        document.getElementById('password').focus();
    }
});
