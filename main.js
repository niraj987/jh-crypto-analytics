document.getElementById('analyze-btn').addEventListener('click', analyzeCrypto);

// Trigger on enter key
document.getElementById('ticker-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') analyzeCrypto();
});

async function analyzeCrypto() {
    const ticker = document.getElementById('ticker-input').value.trim();
    if(!ticker) return;

    // UI Loading state
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const errorMsg = document.getElementById('error-msg');
    const dashboard = document.getElementById('dashboard');

    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    errorMsg.style.display = 'none';
    dashboard.classList.add('hidden');

    try {
        // Fetch data from FastAPI backend
        // Use relative URL so it works locally and on Vercel
        const response = await fetch(`/api/analyze?ticker=${ticker}`);
        const data = await response.json();

        if(data.success) {
            // Update Metrics
            document.getElementById('val-start').innerText = `₹${data.metrics.start_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            document.getElementById('val-current').innerText = `₹${data.metrics.current_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            
            const pctElem = document.getElementById('val-gain-pct');
            pctElem.innerText = `${data.metrics.gain_loss_pct > 0 ? '+' : ''}${data.metrics.gain_loss_pct.toFixed(2)}%`;
            pctElem.style.color = data.metrics.gain_loss_pct > 0 ? '#00ff88' : '#ff4d4d';

            // Parse Markdown-like text to HTML
            let signalHtml = data.metrics.signal_text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
            document.getElementById('val-signal').innerHTML = signalHtml;

            // Render Plotly Charts
            const config = { responsive: true, displayModeBar: false };
            
            // Adjust layouts for transparency and embedding
            data.charts.price.layout.paper_bgcolor = 'rgba(0,0,0,0)';
            data.charts.price.layout.plot_bgcolor = 'rgba(0,0,0,0)';
            
            data.charts.macd.layout.paper_bgcolor = 'rgba(0,0,0,0)';
            data.charts.macd.layout.plot_bgcolor = 'rgba(0,0,0,0)';
            
            data.charts.rsi.layout.paper_bgcolor = 'rgba(0,0,0,0)';
            data.charts.rsi.layout.plot_bgcolor = 'rgba(0,0,0,0)';

            Plotly.newPlot('plot-price', data.charts.price.data, data.charts.price.layout, config);
            Plotly.newPlot('plot-macd', data.charts.macd.data, data.charts.macd.layout, config);
            Plotly.newPlot('plot-rsi', data.charts.rsi.data, data.charts.rsi.layout, config);

            // Show dashboard
            dashboard.classList.remove('hidden');
        } else {
            errorMsg.innerText = data.error;
            errorMsg.style.display = 'block';
        }

    } catch (err) {
        errorMsg.innerText = "Network error. Make sure the backend is running.";
        errorMsg.style.display = 'block';
        console.error(err);
    } finally {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
    }
}
