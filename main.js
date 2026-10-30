// Base URL for API
const API_BASE = "/api";

let currentUser = null;

function formatCurrency(val) {
    if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(2)}M`;
    } else if (val < 0.01) {
        return `$${val.toFixed(6)}`; // for penny/meme coins
    } else {
        return `$${val.toFixed(2)}`;
    }
}

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
        errorDiv.textContent = "Access Key and Password required.";
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
        errorDiv.textContent = "Terminal connection error. Please try again.";
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
        errorDiv.textContent = "Please compile all access key parameters.";
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
        errorDiv.textContent = "Failed to sync credentials.";
        errorDiv.style.display = 'block';
    }
}

function showDashboard() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('dashboard-screen').classList.remove('hidden');
    
    document.getElementById('welcome-msg').innerHTML = `Welcome back, Operator <span style="color:#00f2fe">${currentUser.name}</span>`;
    
    // Populate Profile
    document.getElementById('prof-id').textContent = currentUser.customer_id;
    document.getElementById('prof-name').textContent = currentUser.name;
    document.getElementById('prof-email').textContent = currentUser.email;
    document.getElementById('prof-phone').textContent = currentUser.phone;
    document.getElementById('prof-gender').textContent = currentUser.gender;
    document.getElementById('prof-dob').textContent = currentUser.dob;

    // Premium GSAP Reveal Animations
    gsap.fromTo(".glass-nav", {y: -100, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: "power4.out"});
    gsap.fromTo(".sidebar-catalog", {x: -150, opacity: 0}, {x: 0, opacity: 1, duration: 1, delay: 0.1, ease: "power4.out"});
    gsap.fromTo(".search-section", {y: 50, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power4.out"});
}

function logout() {
    currentUser = null;
    document.getElementById('dashboard-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('profile-menu').classList.remove('active-menu');
}

function toggleProfile() {
    document.getElementById('profile-menu').classList.toggle('active-menu');
}

// Side Catalog tab switcher
function switchCatalog(tab) {
    document.getElementById('cat-btn-bluechips').classList.remove('active');
    document.getElementById('cat-btn-memes').classList.remove('active');
    document.getElementById('cat-btn-defi').classList.remove('active');
    
    document.getElementById('cat-list-bluechips').classList.remove('active');
    document.getElementById('cat-list-memes').classList.remove('active');
    document.getElementById('cat-list-defi').classList.remove('active');

    if (tab === 'bluechips') {
        document.getElementById('cat-btn-bluechips').classList.add('active');
        document.getElementById('cat-list-bluechips').classList.add('active');
    } else if (tab === 'memes') {
        document.getElementById('cat-btn-memes').classList.add('active');
        document.getElementById('cat-list-memes').classList.add('active');
    } else if (tab === 'defi') {
        document.getElementById('cat-btn-defi').classList.add('active');
        document.getElementById('cat-list-defi').classList.add('active');
    }
}

// Select coin from catalog list card
function selectCoin(ticker) {
    document.getElementById('ticker-input').value = ticker;
    analyzeCrypto();
}

// Expandable Professional Intelligence Hub
function toggleDecoderGuide() {
    const area = document.getElementById('decoder-content-area');
    const btn = document.getElementById('decoder-toggle-icon');
    if (area.classList.contains('hidden')) {
        area.classList.remove('hidden');
        btn.textContent = "－ Collapse Intelligence";
        gsap.fromTo(area, {height: 0, opacity: 0}, {height: "auto", opacity: 1, duration: 0.5, ease: "power2.out"});
    } else {
        gsap.to(area, {height: 0, opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => {
            area.classList.add('hidden');
            btn.textContent = "＋ Expand Intelligence";
        }});
    }
}

async function analyzeCrypto() {
    const ticker = document.getElementById('ticker-input').value;
    const errorDiv = document.getElementById('dash-error');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const dashBody = document.getElementById('dash-body');
    
    errorDiv.style.display = 'none';
    
    if(!ticker) {
        errorDiv.textContent = "Please specify a ticker code.";
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
            
            // GSAP Stagger animations for bento layouts
            gsap.to(".gsap-stagger", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.12,
                ease: "back.out(1.4)"
            });

            document.getElementById('main-chart-title').textContent = `${data.ticker} Price Trajectory & Momentum Channels`;
            
            // Price metrics
            document.getElementById('val-start').textContent = formatCurrency(data.metrics.start_price);
            document.getElementById('val-current').textContent = formatCurrency(data.metrics.current_price);
            const pct = data.metrics.gain_loss_pct;
            const pctDiv = document.getElementById('val-gain-pct');
            pctDiv.textContent = `${pct > 0 ? '▲ +' : '▼ '}${pct.toFixed(2)}% (2Y)`;
            pctDiv.style.color = pct > 0 ? '#00ff88' : '#ff4d4d';
            
            // Format investment suggestion verdict
            let signalHtml = data.metrics.signal_text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            signalHtml = signalHtml.replace(/\n\n/g, "<br><br>");
            signalHtml = signalHtml.replace(/\n- /g, "<br>• ");
            document.getElementById('val-signal').innerHTML = signalHtml;
            
            // Extract real-time indices to compile professional indicators board
            
            // 1. RSI calculations
            let latestRsi = 50;
            try {
                const rsiTrace = data.charts.rsi.data[0];
                latestRsi = rsiTrace.y[rsiTrace.y.length - 1];
            } catch(e) {}
            
            const indicatorHypeVal = document.getElementById('indicator-hype-val');
            if (latestRsi > 70) {
                indicatorHypeVal.textContent = `${latestRsi.toFixed(1)} (🔴 OVERBOUGHT)`;
                indicatorHypeVal.style.color = '#ff4d4d';
            } else if (latestRsi < 30) {
                indicatorHypeVal.textContent = `${latestRsi.toFixed(1)} (🟢 OVERSOLD DISCOUNT)`;
                indicatorHypeVal.style.color = '#00ff88';
            } else {
                indicatorHypeVal.textContent = `${latestRsi.toFixed(1)} (🟡 NEUTRAL)`;
                indicatorHypeVal.style.color = '#ffbb00';
            }
            
            // 2. MACD Momentum Direction
            let latestMacdHist = 0;
            try {
                const macdHistTrace = data.charts.macd.data[2];
                latestMacdHist = macdHistTrace.y[macdHistTrace.y.length - 1];
            } catch(e) {}
            
            const indicatorEnergyVal = document.getElementById('indicator-energy-val');
            if (latestMacdHist > 0) {
                indicatorEnergyVal.textContent = "📈 ACCELERATING BULLISH";
                indicatorEnergyVal.style.color = '#00ff88';
            } else {
                indicatorEnergyVal.textContent = "📉 ACCELERATING BEARISH";
                indicatorEnergyVal.style.color = '#ff4d4d';
            }

            // 3. Volatility risk tracking
            let latestAtr = 0;
            try {
                const atrTrace = data.charts.atr.data[0];
                latestAtr = atrTrace.y[atrTrace.y.length - 1];
            } catch(e) {}
            
            const ratio = latestAtr / data.metrics.current_price;
            const indicatorRiskVal = document.getElementById('indicator-risk-val');
            if (ratio > 0.05 || ticker.toUpperCase() === 'DOGE' || ticker.toUpperCase() === 'SHIB' || ticker.toUpperCase() === 'PEPE' || ticker.toUpperCase() === 'WIF' || ticker.toUpperCase() === 'BONK' || ticker.toUpperCase() === 'FLOKI') {
                indicatorRiskVal.textContent = "⚡ HIGH DISPERSION (Meme)";
                indicatorRiskVal.style.color = '#ff007f';
            } else if (ratio > 0.02) {
                indicatorRiskVal.textContent = "⚡ MODERATE DISPERSION";
                indicatorRiskVal.style.color = '#ffbb00';
            } else {
                indicatorRiskVal.textContent = "🌊 LOW DISPERSION (Stable)";
                indicatorRiskVal.style.color = '#00f2fe';
            }

            // 4. Long-Term Trend matching
            let isUptrend = data.metrics.current_price > data.metrics.start_price;
            try {
                const priceTrace = data.charts.price.data[0]; // Candlestick
                const sma200Trace = data.charts.price.data[2]; // 200 SMA
                const lastClosePrice = priceTrace.close[priceTrace.close.length - 1];
                const lastSma200 = sma200Trace.y[sma200Trace.y.length - 1];
                isUptrend = lastClosePrice > lastSma200;
            } catch(e) {}
            
            const indicatorTrendVal = document.getElementById('indicator-trend-val');
            if (isUptrend) {
                indicatorTrendVal.textContent = "📈 STRUCTURAL UPTREND";
                indicatorTrendVal.style.color = '#00ff88';
            } else {
                indicatorTrendVal.textContent = "📉 STRUCTURAL DOWNTREND";
                indicatorTrendVal.style.color = '#ff4d4d';
            }
            
            // Plotly rendering config
            const config = {responsive: true, displayModeBar: false};
            
            const plotLayoutUpdate = {
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: { color: '#ffffff', family: 'Outfit' }
            };
            
            const pPrice = { ...data.charts.price.layout, ...plotLayoutUpdate };
            const pMacd = { ...data.charts.macd.layout, ...plotLayoutUpdate };
            const pRsi = { ...data.charts.rsi.layout, ...plotLayoutUpdate };
            const pAtr = { ...data.charts.atr.layout, ...plotLayoutUpdate };

            Plotly.newPlot('plot-price', data.charts.price.data, pPrice, config);
            Plotly.newPlot('plot-macd', data.charts.macd.data, pMacd, config);
            Plotly.newPlot('plot-rsi', data.charts.rsi.data, pRsi, config);
            Plotly.newPlot('plot-atr', data.charts.atr.data, pAtr, config);
            
            window.dispatchEvent(new Event('resize'));
            
        } else {
            errorDiv.textContent = data.error;
            errorDiv.style.display = 'block';
        }
    } catch(e) {
        errorDiv.textContent = "Terminal query timed out or failed.";
        errorDiv.style.display = 'block';
    } finally {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        
        // Signal that the page has finished loading during automated test screenshot
        document.body.classList.add('test-complete');
    }
}

// Auto-test logic for programmatic screenshot capture
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autotest') === 'true') {
        console.log("Autotest query detected. Executing auto-login...");
        setTimeout(async () => {
            document.getElementById('login-email').value = "jane@example.com";
            document.getElementById('login-password').value = "secretpassword";
            await login();
            console.log("Auto-login complete. Triggering index analysis for BTC...");
            setTimeout(async () => {
                document.getElementById('ticker-input').value = "BTC";
                await analyzeCrypto();
                console.log("Analysis successfully computed.");
            }, 1200);
        }, 1200);
    }
});
