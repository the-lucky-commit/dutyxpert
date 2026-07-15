#!/usr/bin/env python3
from __future__ import annotations

import html
import json
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT_PATH = ROOT / "src/lib/admin-manual-content.json"
OUTPUT_PATH = ROOT / "public/admin-manual-dutyxpert.pdf"
TMP_DIR = ROOT / "tmp/pdfs"
HTML_PATH = TMP_DIR / "admin-manual.html"
SARABUN_DIR = Path.home() / "Documents/Sarabun"
FONT_REGULAR = SARABUN_DIR / "Sarabun-Regular.ttf"
FONT_MEDIUM = SARABUN_DIR / "Sarabun-Medium.ttf"
FONT_BOLD = SARABUN_DIR / "Sarabun-Bold.ttf"
CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    shutil.which("google-chrome"),
    shutil.which("chromium"),
    shutil.which("chromium-browser"),
]


def e(value: str) -> str:
    return html.escape(value, quote=True)


def font_url(path: Path) -> str:
    return path.resolve().as_uri()


def chrome_path() -> str:
    for candidate in CHROME_CANDIDATES:
        if candidate and Path(candidate).exists():
            return str(candidate)
    raise RuntimeError("ไม่พบ Google Chrome หรือ Chromium สำหรับสร้าง PDF")


def list_html(items: list[str]) -> str:
    return (
        '<div class="bullet-list">'
        + "".join(
            f'<div class="bullet-row"><span class="bullet">•</span><span class="bullet-text">{e(item)}</span></div>'
            for item in items
        )
        + "</div>"
    )


def section_html(section: dict[str, object]) -> str:
    title = str(section["title"])
    page_break = '<div class="page-break"></div>' if title.startswith(("3.", "6.", "9.", "12.", "14.")) else ""
    return f"""
      {page_break}
      <section class="manual-section">
        <h2>{e(title)}</h2>
        {list_html(section["items"])}
      </section>
    """


def build_html(content: dict[str, object]) -> str:
    regular_font = FONT_REGULAR if FONT_REGULAR.exists() else FONT_MEDIUM
    medium_font = FONT_MEDIUM if FONT_MEDIUM.exists() else regular_font
    bold_font = FONT_BOLD if FONT_BOLD.exists() else medium_font
    sections = "\n".join(section_html(section) for section in content["sections"])

    return f"""<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <title>{e(str(content["title"]))}</title>
  <style>
    @font-face {{
      font-family: "SarabunManual";
      src: url("{font_url(regular_font)}") format("truetype");
      font-weight: 400;
      font-style: normal;
    }}
    @font-face {{
      font-family: "SarabunManual";
      src: url("{font_url(medium_font)}") format("truetype");
      font-weight: 500;
      font-style: normal;
    }}
    @font-face {{
      font-family: "SarabunManual";
      src: url("{font_url(bold_font)}") format("truetype");
      font-weight: 700;
      font-style: normal;
    }}
    @page {{
      size: A4;
      margin: 18mm 18mm 28mm;
    }}
    * {{
      box-sizing: border-box;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      color: #0f172a;
      background: #ffffff;
      font-family: "SarabunManual", sans-serif;
      font-size: 13px;
      line-height: 1.66;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }}
    body {{
      max-width: 100%;
    }}
    .cover {{
      text-align: center;
      border-bottom: 1px solid #dbe4ef;
      padding: 12px 0 18px;
      margin-bottom: 18px;
    }}
    h1 {{
      margin: 0 0 8px;
      font-size: 30px;
      line-height: 1.22;
      font-weight: 700;
      letter-spacing: -0.02em;
    }}
    .subtitle {{
      margin: 0;
      color: #475569;
      font-size: 14px;
      font-weight: 400;
    }}
    .version {{
      margin: 12px 0 0;
      color: #64748b;
      font-size: 11px;
    }}
    .summary {{
      margin: 0 0 22px;
      padding: 14px 18px;
      border: 1px solid #fdba74;
      background: #fff7ed;
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    .summary h2 {{
      margin-top: 0;
      font-size: 16px;
    }}
    .quick-start {{
      margin-bottom: 18px;
    }}
    .manual-section {{
      margin: 0 0 17px;
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    .page-break {{
      break-before: page;
      page-break-before: always;
      height: 0;
      overflow: hidden;
    }}
    h2 {{
      margin: 0 0 8px;
      color: #0f172a;
      font-size: 20px;
      line-height: 1.32;
      font-weight: 700;
      letter-spacing: -0.01em;
    }}
    .bullet-list {{
      margin: 0;
      padding: 0;
      color: #334155;
    }}
    .bullet-row {{
      display: flex;
      gap: 6px;
      margin: 2px 0;
      font-weight: 400;
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    .bullet {{
      flex: 0 0 14px;
      color: #334155;
      font-size: 0.82em;
      line-height: 1.85;
      text-align: center;
    }}
    .bullet-text {{
      min-width: 0;
    }}
    .handoff {{
      margin-top: 18px;
      padding: 14px 18px;
      border: 1px solid #fcd34d;
      background: #fffbeb;
      break-inside: avoid;
      page-break-inside: avoid;
    }}
    @media print {{
      body {{
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }}
      a {{
        color: inherit;
        text-decoration: none;
      }}
    }}
  </style>
</head>
<body>
  <header class="cover">
    <h1>{e(str(content["title"]))}</h1>
    <p class="subtitle">{e(str(content["subtitle"]))}</p>
    <p class="version">{e(str(content["version"]))}</p>
  </header>

  <section class="summary">
    <h2>สรุปภาพรวม</h2>
    {list_html(content["summary"])}
  </section>

  <section class="manual-section quick-start">
    <h2>เริ่มใช้งานเร็ว</h2>
    {list_html(content["quickStart"])}
  </section>

  {sections}

  <section class="handoff">
    <h2>หมายเหตุส่งมอบงาน</h2>
    {list_html(content["handoffNotes"])}
  </section>
</body>
</html>
"""


def main() -> None:
    content = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    HTML_PATH.write_text(build_html(content), encoding="utf-8")

    chrome = chrome_path()
    subprocess.run(
        [
            chrome,
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={OUTPUT_PATH}",
            HTML_PATH.resolve().as_uri(),
        ],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    print(OUTPUT_PATH)


if __name__ == "__main__":
    main()
