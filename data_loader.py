import yfinance as yf
import polars as pl
from datetime import datetime, timedelta
import pandas as pd

def fetch_crypto_data(ticker: str, years: int = 2) -> pl.DataFrame:
    """
    Fetches historical OHLCV data for a given cryptocurrency in USD.
    Returns a Polars DataFrame.
    """
    end_date = datetime.now()
    start_date = end_date - timedelta(days=years * 365)
    
    base_ticker = ticker.upper().replace('-INR', '').replace('-USD', '')
    symbol_usd = f"{base_ticker}-USD"
    
    df_pd = yf.download(symbol_usd, start=start_date.strftime('%Y-%m-%d'), end=end_date.strftime('%Y-%m-%d'))
    
    if df_pd.empty:
        # Fallback to standard ticker if it's not a crypto format
        df_pd = yf.download(base_ticker, start=start_date.strftime('%Y-%m-%d'), end=end_date.strftime('%Y-%m-%d'))
        if df_pd.empty:
            raise ValueError(f"No data found for symbol {base_ticker}. Please check the ticker name.")

    if isinstance(df_pd.columns, pd.MultiIndex):
        df_pd.columns = df_pd.columns.get_level_values(0)
        
    df_pd = df_pd.reset_index()
    if "index" in df_pd.columns:
        df_pd = df_pd.rename(columns={"index": "Date"})
    elif "Date" not in df_pd.columns and len(df_pd.columns) > 0:
        df_pd = df_pd.rename(columns={df_pd.columns[0]: "Date"})
    
    # Rename columns explicitly just in case
    df_pd = df_pd.rename(columns={
        "Date": "Date", "Open": "Open", "High": "High", 
        "Low": "Low", "Close": "Close", "Volume": "Volume"
    })
    
    cols_to_keep = ["Date", "Open", "High", "Low", "Close", "Volume"]
    df_pd = df_pd[[col for col in cols_to_keep if col in df_pd.columns]]
    
    for col in ["Open", "High", "Low", "Close", "Volume"]:
        if col in df_pd.columns:
            df_pd[col] = pd.to_numeric(df_pd[col], errors='coerce')
    
    df_pl = pl.from_dicts(df_pd.to_dict('records'))
    
    if df_pl.dtypes[0] != pl.Datetime:
        try:
            df_pl = df_pl.with_columns(pl.col("Date").cast(pl.Datetime))
        except:
            df_pl = df_pl.with_columns(pl.col("Date").cast(pl.Utf8).str.to_datetime("%Y-%m-%d %H:%M:%S", strict=False))

    df_pl = df_pl.sort("Date")
    return df_pl
