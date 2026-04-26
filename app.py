import streamlit as st
import polars as pl
from data_loader import fetch_crypto_data
from indicators import add_all_indicators, get_investment_signal
from visualizer import create_price_chart, create_macd_chart, create_rsi_chart
from reporter import get_csv_bytes, get_excel_bytes, get_html_chart_bytes

st.set_page_config(page_title="Crypto Analysis Dashboard", layout="wide", page_icon="📈")

st.title("🚀 2-Year Cryptocurrency Analysis & Investment Dashboard")

# Sidebar
st.sidebar.header("Configuration")
ticker = st.sidebar.text_input("Enter Coin Ticker (e.g., BTC, ETH, SOL)", "BTC")
fetch_btn = st.sidebar.button("Analyze")

if "data" not in st.session_state:
    st.session_state.data = None
    st.session_state.ticker = ""

if fetch_btn or st.session_state.data is not None:
    if fetch_btn:
        st.session_state.ticker = ticker
    
    current_ticker = st.session_state.ticker
    
    with st.spinner(f"Fetching 2-year data for {current_ticker}..."):
        try:
            if fetch_btn:
                df = fetch_crypto_data(current_ticker, years=2)
                df = add_all_indicators(df)
                st.session_state.data = df
            else:
                df = st.session_state.data
                
            st.success("Data loaded successfully!")
            
            # --- OVERVIEW STATS ---
            first_close = df.head(1).select("Close").item()
            last_close = df.tail(1).select("Close").item()
            gain_loss_pct = ((last_close - first_close) / first_close) * 100
            
            col1, col2, col3 = st.columns(3)
            col1.metric("Start Price (2 Yrs Ago)", f"₹{first_close:,.2f}")
            col2.metric("Current Price", f"₹{last_close:,.2f}", f"{gain_loss_pct:.2f}%")
            
            status = "Gain" if gain_loss_pct > 0 else "Loss"
            col3.metric("Overall 2-Year Status", status, f"₹{last_close - first_close:,.2f}")
            
            st.divider()
            
            # --- INVESTMENT SIGNAL ---
            st.subheader("💡 Investment Outlook")
            signal_text = get_investment_signal(df)
            st.info(signal_text)
            
            # --- CHARTS ---
            st.subheader("📊 Technical Charts")
            
            price_fig = create_price_chart(df, current_ticker)
            macd_fig = create_macd_chart(df)
            rsi_fig = create_rsi_chart(df)
            
            st.plotly_chart(price_fig, use_container_width=True)
            
            col_chart1, col_chart2 = st.columns(2)
            with col_chart1:
                st.plotly_chart(macd_fig, use_container_width=True)
            with col_chart2:
                st.plotly_chart(rsi_fig, use_container_width=True)
                
            st.divider()
            
            # --- EXPORT REPORTS ---
            st.subheader("📥 Export & Reports")
            st.write("Download the processed dataset with all indicators or save the charts.")
            
            export_col1, export_col2, export_col3 = st.columns(3)
            
            with export_col1:
                st.download_button(
                    label="Download Data as CSV",
                    data=get_csv_bytes(df),
                    file_name=f"{current_ticker}_2yr_data.csv",
                    mime="text/csv"
                )
            
            with export_col2:
                st.download_button(
                    label="Download Data as Excel",
                    data=get_excel_bytes(df),
                    file_name=f"{current_ticker}_2yr_data.xlsx",
                    mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                )
                
            with export_col3:
                st.download_button(
                    label="Download Price Chart (HTML)",
                    data=get_html_chart_bytes(price_fig),
                    file_name=f"{current_ticker}_price_chart.html",
                    mime="text/html"
                )
                
            # --- DATA PREVIEW ---
            with st.expander("Preview Raw Polars DataFrame"):
                # Streamlit displays pandas DataFrames very well natively.
                st.dataframe(df.to_pandas().tail(50))
                
        except Exception as e:
            st.error(f"Error analyzing data: {e}")
