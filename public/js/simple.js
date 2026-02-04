// SIMPLE KARTU PELAJAR - PASTI JALAN
console.log('Script loaded!');

function simpleLogin() {
    console.log('Login function called!');
    
    // Get values
    const nis = document.getElementById('nis').value;
    const password = document.getElementById('password').value;
    
    console.log('NIS:', nis, 'Password:', password);
    
    // Simple validation
    if (!nis || !password) {
        alert('Isi NIS dan Password!');
        return;
    }
    
    // Check credentials
    if (nis === '2024001' && password === '15012012') {
        // SUCCESS - Show card
        showSimpleCard();
    } else if (nis === '2024002' && password === '20032012') {
        showSimpleCard();
    } else {
        alert('Salah! Coba:\nNIS: 2024001\nPassword: 15012012');
    }
}

function showSimpleCard() {
    console.log('Showing card...');
    
    // Create new window with card
    const cardWindow = window.open('', '_blank');
    
    cardWindow.document.write(`
        <html>
        <head>
            <title>Kartu Pelajar</title>
            <style>
                body { 
                    font-family: Arial; 
                    padding: 20px;
                    background: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .card {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    max-width: 400px;
                    text-align: center;
                }
                h1 { color: #2C3E50; }
                .info { 
                    text-align: left;
                    margin: 20px 0;
                    border-top: 2px solid #4A90E2;
                    padding-top: 20px;
                }
                .info div {
                    margin: 10px 0;
                    padding: 10px;
                    background: #f8f9fa;
                    border-radius: 5px;
                }
                button {
                    background: #4A90E2;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    margin-top: 20px;
                }
                button:hover {
                    background: #357ae8;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>🎓 KARTU PELAJAR</h1>
                <h2>SMPN 1 PAMARAYAN</h2>
                
                <div class="info">
                    <div><strong>NIS:</strong> 2024001</div>
                    <div><strong>Nama:</strong> ANDI WIJAYA</div>
                    <div><strong>Kelas:</strong> 7A</div>
                    <div><strong>TTL:</strong> Pamarayan, 15 Jan 2012</div>
                    <div><strong>Alamat:</strong> Jl. Merdeka No. 1</div>
                </div>
                
                <p style="color: #666; font-size: 14px;">
                    📋 <strong>Cara cetak:</strong><br>
                    1. Klik tombol PRINT<br>
                    2. Pilih printer<br>
                    3. Gunakan kertas foto<br>
                    4. Laminating (optional)
                </p>
                
                <button onclick="window.print()">
                    🖨️ PRINT KARTU INI
                </button>
                
                <p style="margin-top: 20px; font-size: 12px; color: #999;">
                    © 2024 SMPN 1 Pamarayan - Sistem Anti Pungli
                </p>
            </div>
        </body>
        </html>
    `);
    
    cardWindow.document.close();
}

// Auto-attach event on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
    
    // Attach to button
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.onclick = simpleLogin;
        console.log('Button attached!');
    }
    
    // Enter key support
    const passInput = document.getElementById('password');
    if (passInput) {
        passInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                simpleLogin();
            }
        });
    }
});
