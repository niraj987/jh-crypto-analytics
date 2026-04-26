// Base URL for API
const API_BASE = "/api"; // Use relative path so Vercel handles routing automatically

let currentUser = null;

function switchTab(tab) {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('tab-btn-login').classList.remove('active');
    document.getElementById('tab-btn-register').classList.remove('active');

    if(tab === 'login') {
        document.getElementById('login-form').classList.add('active');
        document.getElementById('tab-btn-login').classList.add('active');
    } else {
        document.getElementById('register-form').classList.add('active');
        document.getElementById('tab-btn-register').classList.add('active');
    }
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    errorDiv.style.display = 'none';

    if(!email || !password) {
        errorDiv.textContent = "Please enter email and password.";
        errorDiv.style.display = 'block';
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });
        const data = await res.json();

        if(data.success) {
            currentUser = data.user;
            showDashboard();
        } else {
            errorDiv.textContent = data.error;
            errorDiv.style.display = 'block';
        }
    } catch (e) {
        errorDiv.textContent = "Server error. Please try again.";
        errorDiv.style.display = 'block';
    }
}

async function register() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const gender = document.getElementById('reg-gender').value;
    const dob = document.getElementById('reg-dob').value;
    const password = document.getElementById('reg-password').value;
    
    const errorDiv = document.getElementById('reg-error');
    const successDiv = document.getElementById('reg-success');
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    if(!name || !email || !phone || !gender || !dob || !password) {
        errorDiv.textContent = "Please fill all fields.";
        errorDiv.style.display = 'block';
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, phone, gender, dob, password})
        });
        const data = await res.json();

        if(data.success) {
            successDiv.textContent = data.message;
            successDiv.style.display = 'block';
            setTimeout(() => switchTab('login'), 2000);
        } else {
            errorDiv.textContent = data.error;
            errorDiv.style.display = 'block';
        }
    } catch (e) {
        errorDiv.textContent = "Server error.";
        errorDiv.style.display = 'block';
    }
}

function showDashboard() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('dashboard-screen').classList.remove('hidden');
    
    document.getElementById('welcome-msg').innerHTML = `Welcome back, <span style="color:#00f2fe">${currentUser.name}</span>!`;
    
    // Populate Profile
    document.getElementById('prof-id').textContent = currentUser.customer_id;
    document.getElementById('prof-name').textContent = currentUser.name;
    document.getElementById('prof-email').textContent = currentUser.email;
    document.getElementById('prof-phone').textContent = currentUser.phone;
    document.getElementById('prof-gender').textContent = currentUser.gender;
    document.getElementById('prof-dob').textContent = currentUser.dob;
}

function logout() {
    currentUser = null;
    document.getElementById('dashboard-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('profile-menu').classList.add('hidden');
}

function toggleProfile() {
    document.getElementById('profile-menu').classList.toggle('hidden');
}

async function analyzeCrypto() {
    const ticker = document.getElementById('ticker-input').value;
    const errorDiv = document.getElementById('dash-error');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const dashBody = document.getElementById('dash-body');
    
    errorDiv.style.display = 'none';
    
    if(!ticker) {
        errorDiv.textContent = "Please enter a ticker.";
        errorDiv.style.display = 'block';
        return;
    }

    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    
    try {
        const res = await fetch(`${API_BASE}/analyze?ticker=${ticker}`);
        const data = await res.json();
        
        if(data.success) {
            dashBody.classList.remove('hidden');
            document.getElementById('main-chart-title').textContent = `${data.ticker} Price Action & Moving Averages`;
            
            // Stats
            document.getElementById('val-start').textContent = `₹${data.metrics.start_price.toFixed(2)}`;
            document.getElementById('val-current').textContent = `₹${data.metrics.current_price.toFixed(2)}`;
            const pct = data.metrics.gain_loss_pct;
            const pctDiv = document.getElementById('val-gain-pct');
            pctDiv.textContent = `${pct > 0 ? '+' : ''}${pct.toFixed(2)}% (2Y)`;
            pctDiv.style.color = pct > 0 ? '#00ff88' : '#ff4d4d';
            
            // Signal Markdown parsing manually
            let signalHtml = data.metrics.signal_text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            signalHtml = signalHtml.replace(/\n\n/g, "<br><br>");
            signalHtml = signalHtml.replace(/\n- /g, "<br>• ");
            document.getElementById('val-signal').innerHTML = signalHtml;
            
            // Apply responsive layout config for plotly so they stretch correctly
            const config = {responsive: true, displayModeBar: false};
            
            // Render Plotly charts
            Plotly.newPlot('plot-price', data.charts.price.data, data.charts.price.layout, config);
            Plotly.newPlot('plot-macd', data.charts.macd.data, data.charts.macd.layout, config);
            Plotly.newPlot('plot-rsi', data.charts.rsi.data, data.charts.rsi.layout, config);
            
            // Force resize event just in case
            window.dispatchEvent(new Event('resize'));
            
        } else {
            errorDiv.textContent = data.error;
            errorDiv.style.display = 'block';
        }
    } catch(e) {
        errorDiv.textContent = "Failed to fetch data from server.";
        errorDiv.style.display = 'block';
    } finally {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
    }
}
