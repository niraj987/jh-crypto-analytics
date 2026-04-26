import plotly.graph_objects as go
from plotly.subplots import make_subplots
import polars as pl

def create_price_chart(df: pl.DataFrame, coin_name: str) -> go.Figure:
    fig = make_subplots(rows=2, cols=1, shared_xaxes=True, 
                        vertical_spacing=0.03, subplot_titles=(f'{coin_name} Price & Moving Averages', 'Volume'),
                        row_width=[0.2, 0.8])
                        
    # Candlestick
    fig.add_trace(go.Candlestick(
                x=df["Date"],
                open=df["Open"],
                high=df["High"],
                low=df["Low"],
                close=df["Close"],
                name='Price',
                increasing_line_color='#00ff88', decreasing_line_color='#ff4d4d'
                ),
                row=1, col=1)
                
    # Moving Averages
    if "SMA_50" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["SMA_50"], line=dict(color='#00f2fe', width=2), name='50 SMA'), row=1, col=1)
    if "SMA_200" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["SMA_200"], line=dict(color='#f6d365', width=2), name='200 SMA'), row=1, col=1)
        
    # Bollinger Bands
    if "BB_Upper" in df.columns and "BB_Lower" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["BB_Upper"], line=dict(color='rgba(173,216,230,0.2)', width=1), name='BB Upper', showlegend=False), row=1, col=1)
        fig.add_trace(go.Scatter(x=df["Date"], y=df["BB_Lower"], line=dict(color='rgba(173,216,230,0.2)', width=1), fill='tonexty', fillcolor='rgba(173,216,230,0.05)', name='Bollinger Bands'), row=1, col=1)

    # Volume
    colors = ['#00ff88' if row['Close'] >= row['Open'] else '#ff4d4d' for row in df.iter_rows(named=True)]
    fig.add_trace(go.Bar(x=df["Date"], y=df["Volume"], marker_color=colors, name='Volume'), row=2, col=1)
    
    fig.update_layout(
        template="plotly_dark", 
        height=800, 
        showlegend=True, 
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
        margin=dict(l=40, r=40, t=60, b=40),
        xaxis_rangeslider_visible=False,
        hovermode="x unified",
        paper_bgcolor='#0e1117',
        plot_bgcolor='#0e1117'
    )
    
    # Add an interactive range slider specifically to the volume chart (bottom) so it controls both
    fig.update_xaxes(rangeslider_visible=True, row=2, col=1)
    
    # Clean grid lines
    fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.05)')
    fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.05)')
    
    return fig

def create_macd_chart(df: pl.DataFrame) -> go.Figure:
    fig = go.Figure()
    if "MACD" in df.columns and "MACD_Signal" in df.columns and "MACD_Hist" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["MACD"], line=dict(color='#00f2fe', width=1.5), name='MACD'))
        fig.add_trace(go.Scatter(x=df["Date"], y=df["MACD_Signal"], line=dict(color='#f6d365', width=1.5), name='Signal'))
        
        colors = ['rgba(0, 255, 136, 0.7)' if val >= 0 else 'rgba(255, 77, 77, 0.7)' for val in df["MACD_Hist"]]
        fig.add_trace(go.Bar(x=df["Date"], y=df["MACD_Hist"], marker_color=colors, name='Histogram'))
        
    fig.update_layout(
        title="MACD Momentum Indicator", 
        template="plotly_dark", 
        height=350, 
        margin=dict(l=40, r=40, t=50, b=40),
        hovermode="x unified",
        paper_bgcolor='#0e1117',
        plot_bgcolor='#0e1117',
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
    )
    fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.05)')
    fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.05)')
    return fig

def create_rsi_chart(df: pl.DataFrame) -> go.Figure:
    fig = go.Figure()
    if "RSI" in df.columns:
        fig.add_trace(go.Scatter(x=df["Date"], y=df["RSI"], line=dict(color='#b330ff', width=2), name='RSI', fill='tozeroy', fillcolor='rgba(179, 48, 255, 0.1)'))
        # Add Overbought/Oversold lines
        fig.add_hline(y=70, line_dash="dash", line_color="#ff4d4d", annotation_text="Overbought (70)", annotation_position="top right")
        fig.add_hline(y=30, line_dash="dash", line_color="#00ff88", annotation_text="Oversold (30)", annotation_position="bottom right")
        
    fig.update_layout(
        title="RSI (Relative Strength Index)", 
        template="plotly_dark", 
        height=350, 
        yaxis=dict(range=[0, 100]), 
        margin=dict(l=40, r=40, t=50, b=40),
        hovermode="x unified",
        paper_bgcolor='#0e1117',
        plot_bgcolor='#0e1117'
    )
    fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.05)')
    fig.update_xaxes(showgrid=True, gridwidth=1, gridcolor='rgba(255,255,255,0.05)')
    return fig
