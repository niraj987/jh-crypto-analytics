from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import sys
import os

# Allow importing local modules from the parent directory (d:\crypto2)
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from data_loader import fetch_crypto_data
from indicators import add_all_indicators, get_investment_signal
from visualizer import create_price_chart, create_macd_chart, create_rsi_chart

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/analyze")
def analyze(ticker: str):
    try:
        df = fetch_crypto_data(ticker, years=2)
        df = add_all_indicators(df)
        
        signal = get_investment_signal(df)
        
        first_close = df.head(1).select("Close").item()
        last_close = df.tail(1).select("Close").item()
        gain_loss_pct = ((last_close - first_close) / first_close) * 100
        
        price_fig = create_price_chart(df, ticker.upper())
        macd_fig = create_macd_chart(df)
        rsi_fig = create_rsi_chart(df)
        
        # Strip some padding/margins for web embedding
        price_fig.update_layout(margin=dict(l=0, r=0, t=30, b=0), paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)')
        macd_fig.update_layout(margin=dict(l=0, r=0, t=30, b=0), paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)')
        rsi_fig.update_layout(margin=dict(l=0, r=0, t=30, b=0), paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)')
        
        # Serialize to JSON
        price_json = json.loads(price_fig.to_json())
        macd_json = json.loads(macd_fig.to_json())
        rsi_json = json.loads(rsi_fig.to_json())
        
        return {
            "success": True,
            "ticker": ticker.upper(),
            "metrics": {
                "start_price": first_close,
                "current_price": last_close,
                "gain_loss_pct": gain_loss_pct,
                "signal_text": signal
            },
            "charts": {
                "price": price_json,
                "macd": macd_json,
                "rsi": rsi_json
            }
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# Serve static files for local testing
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Check if we are running locally (not in Vercel)
if os.path.exists("index.html"):
    app.mount("/assets", StaticFiles(directory=".", html=False), name="assets")
    
    @app.get("/")
    def read_root():
        return FileResponse("index.html")
    @app.get("/style.css")
    def read_style():
        return FileResponse("style.css")
    @app.get("/main.js")
    def read_main():
        return FileResponse("main.js")
    @app.get("/three-bg.js")
    def read_three():
        return FileResponse("three-bg.js")
