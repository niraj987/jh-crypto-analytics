import nbformat as nbf

nb = nbf.v4.new_notebook()

text = """\
# 2-Year Cryptocurrency Analysis
This notebook contains the complete source code for our project, running interactively.
"""

code1 = """\
import sys
sys.path.append('.')

from data_loader import fetch_crypto_data
from indicators import add_all_indicators, get_investment_signal
from visualizer import create_price_chart, create_macd_chart, create_rsi_chart

# 1. Fetch Data
print("Fetching Data...")
df = fetch_crypto_data("BTC", years=2)
print("Data Fetched!")
display(df.to_pandas().head())
"""

code2 = """\
# 2. Add Indicators
print("Calculating Indicators...")
df = add_all_indicators(df)
display(df.to_pandas().tail())
"""

code3 = """\
# 3. Investment Signal
signal = get_investment_signal(df)
print(signal)
"""

code4 = """\
# 4. Visualization
fig = create_price_chart(df, "BTC")
fig.show()
"""

nb['cells'] = [
    nbf.v4.new_markdown_cell(text),
    nbf.v4.new_code_cell(code1),
    nbf.v4.new_code_cell(code2),
    nbf.v4.new_code_cell(code3),
    nbf.v4.new_code_cell(code4),
]

with open('analysis.ipynb', 'w') as f:
    nbf.write(nb, f)
