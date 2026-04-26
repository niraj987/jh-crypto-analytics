import streamlit as st
import polars as pl
import os
from data_loader import fetch_crypto_data
from indicators import add_all_indicators, get_investment_signal
from visualizer import create_price_chart, create_macd_chart, create_rsi_chart
from reporter import get_csv_bytes, get_excel_bytes, get_html_chart_bytes
import auth_db

st.set_page_config(page_title="JH Crypto Analytics", layout="wide", page_icon="📈")

# Initialize DB
auth_db.init_db()

if "logged_in" not in st.session_state:
    st.session_state.logged_in = False
    st.session_state.user_name = ""

if "data" not in st.session_state:
    st.session_state.data = None
    st.session_state.ticker = ""

# --- AUTHENTICATION FLOW ---
if not st.session_state.logged_in:
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        if os.path.exists("JH Analysis Logo.png"):
            st.image("JH Analysis Logo.png", use_container_width=True)
            
        st.title("Welcome to JH Crypto Analytics")
        st.markdown("Please log in or register to access the professional trading terminal.")
        
        tab1, tab2 = st.tabs(["Login", "Register"])
        
        with tab1:
            with st.form("login_form"):
                st.subheader("Login")
                email = st.text_input("Email")
                password = st.text_input("Password", type="password")
                submit_login = st.form_submit_button("Login")
                
                if submit_login:
                    success, msg = auth_db.verify_login(email, password)
                    if success:
                        st.session_state.logged_in = True
                        st.session_state.user_name = msg
                        st.rerun()
                    else:
                        st.error(msg)
                        
        with tab2:
            with st.form("register_form"):
                st.subheader("Create a New Account")
                reg_name = st.text_input("Full Name")
                reg_email = st.text_input("Email Address")
                reg_password = st.text_input("Password", type="password")
                reg_dob = st.date_input("Date of Birth")
                submit_reg = st.form_submit_button("Register")
                
                if submit_reg:
                    if reg_name and reg_email and reg_password:
                        success, msg = auth_db.register_user(reg_name, reg_email, reg_password, str(reg_dob))
                        if success:
                            st.success(msg)
                        else:
                            st.error(msg)
                    else:
                        st.error("Please fill all fields.")
                        
    st.stop() # Stop execution of the rest of the app if not logged in

# --- MAIN DASHBOARD (If Logged In) ---

st.title("📈 JH Crypto Analytics Terminal")
st.markdown(f"Welcome back, **{st.session_state.user_name}**! Professional 2-year analysis engine powered by Polars.")

# Sidebar configuration
with st.sidebar:
    if os.path.exists("JH Analysis Logo.png"):
        st.image("JH Analysis Logo.png", use_container_width=True)
        
    st.header("⚙️ Configuration")
    ticker = st.text_input("Enter Coin Ticker", value="BTC", help="E.g., BTC, ETH, SOL, DOGE")
    fetch_btn = st.button("Run Analysis", use_container_width=True, type="primary")
    
    with st.expander("Popular Supported Coins"):
        st.markdown("You can search essentially any coin! Here is a scrollable list of popular ones:")
        coin_data = {
            "Coin Name": ["Bitcoin", "Ethereum", "Tether", "BNB", "Solana", "USDC", "XRP", "Dogecoin", "Toncoin", "Cardano", "Shiba Inu", "Avalanche", "TRON", "Polkadot", "Bitcoin Cash", "Chainlink", "Polygon", "Litecoin", "Internet Computer", "NEAR Protocol", "UNUS SED LEO", "Dai", "Aptos", "Pepe", "Ethereum Classic", "Mantle", "Stacks", "Cronos", "Kaspa", "Render", "Cosmos", "Stellar", "Arbitrum", "OKB", "Filecoin", "Maker", "First Digital USD", "Immutable", "Injective", "Soros", "VeChain", "Optimism", "The Graph", "Fantom", "Theta Network", "Aave", "Arweave", "ThorChain", "Bitget Token", "Floki"],
            "Ticker": ["BTC", "ETH", "USDT", "BNB", "SOL", "USDC", "XRP", "DOGE", "TON", "ADA", "SHIB", "AVAX", "TRX", "DOT", "BCH", "LINK", "MATIC", "LTC", "ICP", "NEAR", "LEO", "DAI", "APT", "PEPE", "ETC", "MNT", "STX", "CRO", "KAS", "RNDR", "ATOM", "XLM", "ARB", "OKB", "FIL", "MKR", "FDUSD", "IMX", "INJ", "SUI", "VET", "OP", "GRT", "FTM", "THETA", "AAVE", "AR", "RUNE", "BGB", "FLOKI"]
        }
        st.dataframe(coin_data, use_container_width=True, hide_index=True, height=250)
        
    st.divider()
    if st.button("Logout", use_container_width=True):
        st.session_state.logged_in = False
        st.session_state.user_name = ""
        st.session_state.data = None
        st.rerun()

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
                
            # --- OVERVIEW STATS ---
            first_close = df.head(1).select("Close").item()
            last_close = df.tail(1).select("Close").item()
            gain_loss_pct = ((last_close - first_close) / first_close) * 100
            
            st.markdown("### 📊 Market Overview")
            metric_col1, metric_col2, metric_col3, metric_col4 = st.columns(4)
            
            with metric_col1:
                st.metric("Current Price", f"₹{last_close:,.2f}", f"{gain_loss_pct:.2f}% (2Y)")
            with metric_col2:
                st.metric("Start Price (2 Yrs Ago)", f"₹{first_close:,.2f}")
            with metric_col3:
                status = "Gain" if gain_loss_pct > 0 else "Loss"
                st.metric("Overall 2-Year Status", status, f"₹{last_close - first_close:,.2f}")
            with metric_col4:
                # Calculate 24h change
                prev_close = df.tail(2).head(1).select("Close").item()
                daily_pct = ((last_close - prev_close) / prev_close) * 100
                st.metric("24h Change", f"₹{last_close - prev_close:,.2f}", f"{daily_pct:.2f}%")
            
            st.divider()
            
            # --- CHARTS SECTION ---
            chart_col, signal_col = st.columns([3, 1])
            
            with chart_col:
                st.markdown(f"### 📈 {current_ticker} Price Action & Moving Averages")
                price_fig = create_price_chart(df, current_ticker)
                st.plotly_chart(price_fig, use_container_width=True, config={'displayModeBar': True})
                
                # Secondary Indicators
                st.markdown("### 🔍 Technical Indicators")
                ind_col1, ind_col2 = st.columns(2)
                with ind_col1:
                    macd_fig = create_macd_chart(df)
                    st.plotly_chart(macd_fig, use_container_width=True)
                with ind_col2:
                    rsi_fig = create_rsi_chart(df)
                    st.plotly_chart(rsi_fig, use_container_width=True)

            with signal_col:
                st.markdown("### 💡 AI Investment Signal")
                signal_text = get_investment_signal(df)
                st.info(signal_text)
                
                st.markdown("### 📥 Export & Reports")
                st.write("Download the processed dataset with all indicators or save the charts.")
                
                st.download_button(
                    label="Download CSV",
                    data=get_csv_bytes(df),
                    file_name=f"{current_ticker}_2yr_data.csv",
                    mime="text/csv",
                    use_container_width=True
                )
                
                st.download_button(
                    label="Download Excel",
                    data=get_excel_bytes(df),
                    file_name=f"{current_ticker}_2yr_data.xlsx",
                    mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    use_container_width=True
                )
                
                st.download_button(
                    label="Download Chart (HTML)",
                    data=get_html_chart_bytes(price_fig),
                    file_name=f"{current_ticker}_price_chart.html",
                    mime="text/html",
                    use_container_width=True
                )
                
            # --- DATA PREVIEW ---
            with st.expander("Preview Raw Data (Advanced Polars Backend)"):
                st.dataframe(df.to_pandas().tail(100), use_container_width=True)
                
            # --- DISCLAIMER ---
            st.divider()
            st.markdown("> **Disclaimer:** This website uses historical data and Machine Learning models to predict and provide automated trading signals. It is designed for educational purposes and to give laymen an understanding of market trends. **Any buying, selling, or holding is strictly at your own risk.** The maker of this website and its authors are not responsible for any financial losses or faults. Please verify all information independently before making financial decisions.")
                
        except Exception as e:
            st.error(f"Error analyzing data: {e}")
