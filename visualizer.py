import plotly.graph_objects as go
from plotly.subplots import make_subplots
import polars as pl

def create_price_chart(df: pl.DataFrame, coin_name: str) -> go.Figure:
    fig = make_subplots(rows=2, cols=1, shared_xaxes=True, 
                        vertical_spacing=0.03,
                        row_width=[0.25, 0.75])
                        
    # Candlestick
    fig.add_trace(go.Candlestick(
                x=df["Date"], open=df["Open"], high=df["High"],
                low=df["Low"], close=df["Close"], name='Market Price',
                increasing_line_color='#00ff88', decreasing_line_color='#ff4d4d'
                ), row=1, col=1)
                
    # Moving Averages (Smooth Splines)
    if "SMA_50" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["SMA_50"], 
                                 line=dict(color='#00f2fe', width=2, shape='spline'), 
                                 name='Short-Term Trend (50 SMA)'), row=1, col=1)
    if "SMA_200" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["SMA_200"], 
                                 line=dict(color='#f6d365', width=2, shape='spline'), 
                                 name='Long-Term Trend (200 SMA)'), row=1, col=1)
        
    # Bollinger Bands
    if "BB_Upper" in df.columns and "BB_Lower" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["BB_Upper"], 
                                 line=dict(color='rgba(0, 242, 254, 0.15)', width=1), 
                                 name='Upper Band (Overpriced Limit)', showlegend=False), row=1, col=1)
        fig.add_trace(go.Scatter(x=df["Date"], y=df["BB_Lower"], 
                                 line=dict(color='rgba(0, 242, 254, 0.15)', width=1), 
                                 fill='tonexty', fillcolor='rgba(0, 242, 254, 0.03)', 
                                 name='Normal Price Channel (Bollinger Bands)'), row=1, col=1)

    # Volume
    colors = ['#00ff88' if row['Close'] >= row['Open'] else '#ff4d4d' for row in df.iter_rows(named=True)]
    fig.add_trace(go.Bar(x=df["Date"], y=df["Volume"], marker_color=colors, name='Volume (Trading Activity)'), row=2, col=1)
    
    fig.update_layout(
        template="plotly_dark", 
        height=500,
        showlegend=True, 
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1, font=dict(family="Outfit", size=11)),
        margin=dict(l=40, r=40, t=40, b=40),
        xaxis_rangeslider_visible=False,
        hovermode="x unified",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)'
    )
    
    fig.update_xaxes(rangeslider_visible=True, row=2, col=1)
    fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.04)')
    fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.04)')
    return fig

def create_macd_chart(df: pl.DataFrame) -> go.Figure:
    fig = go.Figure()
    if "MACD" in df.columns and "MACD_Signal" in df.columns and "MACD_Hist" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["MACD"], 
                                 line=dict(color='#00f2fe', width=2, shape='spline'), 
                                 name='Momentum (MACD)'))
        fig.add_trace(go.Scatter(x=df["Date"], y=df["MACD_Signal"], 
                                 line=dict(color='#ff007f', width=2, shape='spline'), 
                                 name='Trigger line (Signal)'))
        
        # Vibrant colors for Layman Momentum Bars
        colors = ['rgba(0, 255, 136, 0.75)' if val >= 0 else 'rgba(255, 77, 77, 0.75)' for val in df["MACD_Hist"]]
        fig.add_trace(go.Bar(x=df["Date"], y=df["MACD_Hist"], marker_color=colors, name='Momentum Bars'))
        
    fig.update_layout(
        title=dict(text="MACD Market Speed (Buy vs Sell Force)", font=dict(family="Outfit", size=14, color="#ffffff")),
        template="plotly_dark", 
        height=250,
        margin=dict(l=40, r=40, t=40, b=40),
        hovermode="x unified",
        paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)',
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1, font=dict(family="Outfit", size=10))
    )
    fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.04)')
    fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.04)')
    return fig

def create_rsi_chart(df: pl.DataFrame) -> go.Figure:
    fig = go.Figure()
    if "RSI" in df.columns:
        # Render clean line
        fig.add_trace(go.Scatter(x=df["Date"], y=df["RSI"], 
                                 line=dict(color='#b330ff', width=2, shape='spline'), 
                                 name='RSI Score', fill='tozeroy', fillcolor='rgba(179, 48, 255, 0.05)'))
        
        # Color-coded Layman Hype/Discount bands
        fig.add_hrect(y0=0, y1=30, fillcolor="rgba(0, 255, 136, 0.08)", line_width=0,
                      annotation_text="🟢 BARGAIN ZONE (Oversold - Good Entry)", annotation_position="inside bottom left",
                      annotation_font=dict(color="#00ff88", size=10, family="Outfit", weight="bold"))
                      
        fig.add_hrect(y0=70, y1=100, fillcolor="rgba(255, 77, 77, 0.08)", line_width=0,
                      annotation_text="🔴 HYPED ZONE (Overbought - High Risk)", annotation_position="inside top left",
                      annotation_font=dict(color="#ff4d4d", size=10, family="Outfit", weight="bold"))
                      
        fig.add_hline(y=70, line_dash="dash", line_color="rgba(255, 77, 77, 0.4)")
        fig.add_hline(y=30, line_dash="dash", line_color="rgba(0, 255, 136, 0.4)")
        
    fig.update_layout(
        title=dict(text="RSI Hype Index (Hyped vs Bargain Scale)", font=dict(family="Outfit", size=14, color="#ffffff")),
        template="plotly_dark", 
        height=250,
        yaxis=dict(range=[0, 100]), 
        margin=dict(l=40, r=40, t=40, b=40),
        hovermode="x unified",
        paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)'
    )
    fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.04)')
    fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.04)')
    return fig

def create_atr_chart(df: pl.DataFrame) -> go.Figure:
    fig = go.Figure()
    if "ATR" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["ATR"], 
                                 line=dict(color='#ffaa00', width=2, shape='spline'), 
                                 name='ATR (Volatility)', fill='tozeroy', fillcolor='rgba(255, 170, 0, 0.05)'))
        
    fig.update_layout(
        title=dict(text="Market Turbulence Index (ATR Volatility Risk)", font=dict(family="Outfit", size=14, color="#ffffff")),
        template="plotly_dark", 
        height=250,
        margin=dict(l=40, r=40, t=40, b=40),
        hovermode="x unified",
        paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)'
    )
    fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.04)')
    fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.04)')
    return fig
