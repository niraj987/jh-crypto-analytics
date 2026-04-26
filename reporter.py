import io
import polars as pl
import plotly.graph_objects as go

def get_csv_bytes(df: pl.DataFrame) -> bytes:
    """Returns the Polars DataFrame as a CSV byte string."""
    return df.write_csv().encode('utf-8')

def get_excel_bytes(df: pl.DataFrame) -> bytes:
    """Returns the Polars DataFrame as an Excel byte string."""
    output = io.BytesIO()
    # write_excel handles file-like objects natively
    df.write_excel(output)
    return output.getvalue()

def get_html_chart_bytes(fig: go.Figure) -> bytes:
    """Returns the Plotly Figure as an interactive HTML byte string."""
    html_str = fig.to_html(include_plotlyjs='cdn', full_html=True)
    return html_str.encode('utf-8')
