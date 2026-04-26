import polars as pl

def add_all_indicators(df: pl.DataFrame) -> pl.DataFrame:
    """Convenience function to add all indicators at once."""
    df = calculate_sma(df, "Close", 50)
    df = calculate_sma(df, "Close", 200)
    df = calculate_rsi(df, "Close", 14)
    df = calculate_macd(df, "Close", 12, 26, 9)
    df = calculate_bollinger_bands(df, "Close", 20, 2.0)
    df = calculate_atr(df, 14)
    return df

def calculate_sma(df: pl.DataFrame, column: str, window: int) -> pl.DataFrame:
    return df.with_columns(
        pl.col(column).rolling_mean(window_size=window).alias(f"SMA_{window}")
    )

def calculate_rsi(df: pl.DataFrame, column: str = "Close", window: int = 14) -> pl.DataFrame:
    alpha = 1.0 / window
    
    df = df.with_columns(
        (pl.col(column) - pl.col(column).shift(1)).alias("diff")
    )
    
    df = df.with_columns([
        pl.when(pl.col("diff") > 0).then(pl.col("diff")).otherwise(0).alias("gain"),
        pl.when(pl.col("diff") < 0).then(pl.col("diff").abs()).otherwise(0).alias("loss")
    ])
    
    df = df.with_columns([
        pl.col("gain").ewm_mean(alpha=alpha, adjust=False).alias("avg_gain"),
        pl.col("loss").ewm_mean(alpha=alpha, adjust=False).alias("avg_loss")
    ])
    
    df = df.with_columns(
        (pl.col("avg_gain") / pl.col("avg_loss")).alias("rs")
    )
    
    df = df.with_columns(
        (100 - (100 / (1 + pl.col("rs")))).alias("RSI")
    )
    
    return df.drop(["diff", "gain", "loss", "avg_gain", "avg_loss", "rs"])

def calculate_macd(df: pl.DataFrame, column: str = "Close", fast: int = 12, slow: int = 26, signal: int = 9) -> pl.DataFrame:
    df = df.with_columns([
        pl.col(column).ewm_mean(span=fast, adjust=False).alias("EMA_fast"),
        pl.col(column).ewm_mean(span=slow, adjust=False).alias("EMA_slow")
    ])
    
    df = df.with_columns(
        (pl.col("EMA_fast") - pl.col("EMA_slow")).alias("MACD")
    )
    
    df = df.with_columns(
        pl.col("MACD").ewm_mean(span=signal, adjust=False).alias("MACD_Signal")
    )
    
    df = df.with_columns(
        (pl.col("MACD") - pl.col("MACD_Signal")).alias("MACD_Hist")
    )
    
    return df.drop(["EMA_fast", "EMA_slow"])

def calculate_bollinger_bands(df: pl.DataFrame, column: str = "Close", window: int = 20, num_std: float = 2.0) -> pl.DataFrame:
    df = df.with_columns([
        pl.col(column).rolling_mean(window_size=window).alias("BB_Mid"),
        pl.col(column).rolling_std(window_size=window).alias("BB_Std")
    ])
    
    df = df.with_columns([
        (pl.col("BB_Mid") + (pl.col("BB_Std") * num_std)).alias("BB_Upper"),
        (pl.col("BB_Mid") - (pl.col("BB_Std") * num_std)).alias("BB_Lower")
    ])
    
    return df.drop(["BB_Std"])

def calculate_atr(df: pl.DataFrame, window: int = 14) -> pl.DataFrame:
    df = df.with_columns(
        pl.col("Close").shift(1).alias("prev_close")
    )
    
    df = df.with_columns([
        (pl.col("High") - pl.col("Low")).alias("hl"),
        (pl.col("High") - pl.col("prev_close")).abs().alias("hpc"),
        (pl.col("Low") - pl.col("prev_close")).abs().alias("lpc")
    ])
    
    df = df.with_columns(
        pl.max_horizontal(["hl", "hpc", "lpc"]).alias("TR")
    )
    
    alpha = 1.0 / window
    df = df.with_columns(
        pl.col("TR").ewm_mean(alpha=alpha, adjust=False).alias("ATR")
    )
    
    return df.drop(["prev_close", "hl", "hpc", "lpc", "TR"])

def get_investment_signal(df: pl.DataFrame) -> str:
    if len(df) < 200:
        return "Not enough data for a strong ML prediction (needs 200 days)."
        
    latest = df.tail(1).to_dicts()[0]
    
    score = 0
    reasons = []
    
    # Layman explanations
    if "SMA_200" in latest and latest["SMA_200"] is not None:
        if latest["Close"] > latest["SMA_200"]:
            score += 1
            reasons.append("📈 **Long-Term Trend:** The current price is higher than the 200-day average. This means the coin is generally in an 'Uptrend' over the past year. Holding for the long term (1+ years) is generally favorable.")
        else:
            score -= 1
            reasons.append("📉 **Long-Term Trend:** The current price is below the 200-day average. This means the coin is in a 'Downtrend'. Buying for the long term is risky right now.")
            
    if "RSI" in latest and latest["RSI"] is not None:
        if latest["RSI"] < 30:
            score += 2
            reasons.append(f"🟢 **Short-Term Momentum:** RSI is {latest['RSI']:.2f}. The coin has been heavily sold recently and is 'Oversold'. This often means a short-term price bounce is coming. Good time for short-term buying.")
        elif latest["RSI"] > 70:
            score -= 2
            reasons.append(f"🔴 **Short-Term Momentum:** RSI is {latest['RSI']:.2f}. The coin has been heavily bought and is 'Overbought'. A short-term price drop is likely. Good time for short-term selling or taking profits.")
        else:
            reasons.append(f"🟡 **Short-Term Momentum:** RSI is neutral ({latest['RSI']:.2f}). No extreme buying or selling pressure right now.")
            
    if "MACD_Hist" in latest and latest["MACD_Hist"] is not None:
        if latest["MACD_Hist"] > 0:
            score += 1
            reasons.append("🟢 **Market Energy:** MACD shows positive momentum. More buyers are entering the market.")
        else:
            score -= 1
            reasons.append("🔴 **Market Energy:** MACD shows negative momentum. Sellers are currently in control.")
            
    if score >= 2:
        signal = "🟢 STRONG BUY"
        summary = "Our ML-based models suggest this is a very good time to **BUY** and **HOLD**. The market energy is highly positive for this coin."
    elif score == 1:
        signal = "📈 BUY / ACCUMULATE"
        summary = "Conditions are generally favorable. It's a good time to slowly **BUY** (accumulate) this coin for the future."
    elif score == 0:
        signal = "🟡 HOLD / NEUTRAL"
        summary = "The market is undecided. If you own the coin, **HOLD** it. If you don't, wait for a clearer signal before buying."
    elif score == -1:
        signal = "📉 SELL / REDUCE"
        summary = "Conditions are turning negative. It might be wise to **SELL** some of your holdings or avoid buying right now."
    else:
        signal = "🔴 STRONG SELL"
        summary = "Our models detect strong negative pressure. **SELLING** or avoiding this coin is highly recommended to prevent losses."
        
    final_text = f"## {signal}\n\n**Layman Summary:**\n{summary}\n\n**Detailed Technical Breakdown:**\n" + "\n\n".join([f"{r}" for r in reasons])
    return final_text
