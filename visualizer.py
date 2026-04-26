import plotly.graph_objects as go
from plotly.subplots import make_subplots
import polars as pl

def create_price_chart(df: pl.DataFrame, coin_name: str) -> go.Figure:
    fig = make_subplots(rows=2, cols=1, shared_xaxes=True, 
                        vertical_spacing=0.03, subplot_titles=(f'{coin_name} Price & Indicators', 'Volume'),
                        row_width=[0.25, 0.75])
                        
    # Candlestick
    fig.add_trace(go.Candlestick(x=df["Date"],
                open=df["Open"],
                high=df["High"],
                low=df["Low"],
                close=df["Close"],
                name='Price'),
                row=1, col=1)
                
    # Moving Averages
    if "SMA_50" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["SMA_50"], line=dict(color='cyan', width=1.5), name='50 SMA'), row=1, col=1)
    if "SMA_200" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["SMA_200"], line=dict(color='yellow', width=1.5), name='200 SMA'), row=1, col=1)
        
    # Bollinger Bands
    if "BB_Upper" in df.columns and "BB_Lower" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["BB_Upper"], line=dict(color='rgba(173,216,230,0.3)', width=1), name='BB Upper'), row=1, col=1)
        fig.add_trace(go.Scatter(x=df["Date"], y=df["BB_Lower"], line=dict(color='rgba(173,216,230,0.3)', width=1), fill='tonexty', name='BB Lower'), row=1, col=1)

    # Volume
    colors = ['rgba(0, 255, 0, 0.5)' if row['Close'] >= row['Open'] else 'rgba(255, 0, 0, 0.5)' for row in df.iter_rows(named=True)]
    fig.add_trace(go.Bar(x=df["Date"], y=df["Volume"], marker_color=colors, name='Volume'), row=2, col=1)
    
    fig.update_layout(xaxis_rangeslider_visible=False, template="plotly_dark", height=700, showlegend=True, margin=dict(l=20, r=20, t=40, b=20))
    return fig

def create_macd_chart(df: pl.DataFrame) -> go.Figure:
    fig = go.Figure()
    if "MACD" in df.columns and "MACD_Signal" in df.columns and "MACD_Hist" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["MACD"], line=dict(color='cyan', width=1.5), name='MACD'))
        fig.add_trace(go.Scatter(x=df["Date"], y=df["MACD_Signal"], line=dict(color='orange', width=1.5), name='Signal'))
        
        colors = ['rgba(0, 255, 0, 0.6)' if val >= 0 else 'rgba(255, 0, 0, 0.6)' for val in df["MACD_Hist"]]
        fig.add_trace(go.Bar(x=df["Date"], y=df["MACD_Hist"], marker_color=colors, name='Histogram'))
        
    fig.update_layout(title="MACD", template="plotly_dark", height=350, margin=dict(l=20, r=20, t=40, b=20))
    return fig

def create_rsi_chart(df: pl.DataFrame) -> go.Figure:
    fig = go.Figure()
    if "RSI" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["RSI"], line=dict(color='magenta', width=1.5), name='RSI'))
        # Add Overbought/Oversold lines
        fig.add_hline(y=70, line_dash="dash", line_color="red", annotation_text="Overbought")
        fig.add_hline(y=30, line_dash="dash", line_color="green", annotation_text="Oversold")
        
    fig.update_layout(title="RSI (Relative Strength Index)", template="plotly_dark", height=350, yaxis=dict(range=[0, 100]), margin=dict(l=20, r=20, t=40, b=20))
    return fig
