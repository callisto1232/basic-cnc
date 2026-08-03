# Muhasebe XLSX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `docs/Muhasebe/cnc muhasebe .xlsx` dosyasını yedek alarak daha kompakt, profesyonel ve muhasebe mantığı daha net bir tek sayfalı çalışma kitabına dönüştürmek.

**Architecture:** Geçici çalışma klasöründe küçük ve test edilebilir bir Python dönüştürme aracı yazılacak. Araç önce dosyanın yedeğini alacak, sonra satır bazlı dönüşüm kurallarıyla kolonları normalize edecek, açıklamaları kısaltacak, dağınık notları ilgili alanlara taşıyacak ve en alta formüllü toplam bloğu ekleyecek. Son aşamada çıktı dosyası yeniden açılarak yapısal ve formül doğrulaması yapılacak.

**Tech Stack:** Python 3, `openpyxl`, `pytest`, Excel formülleri

---

## File map

- Create: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/muhasebe_redesign.py`
- Create: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py`
- Modify: `docs/Muhasebe/cnc muhasebe .xlsx`
- Create: `docs/Muhasebe/cnc muhasebe backup before redesign.xlsx`

### Task 1: Dönüşüm kurallarını testlerle sabitle

**Files:**
- Create: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py`
- Create: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/muhasebe_redesign.py`

- [ ] **Step 1: Write the failing test**

```python
from muhasebe_redesign import (
    classify_transaction_type,
    optimize_description,
    move_description_to_product,
    merge_orphan_note,
)


def test_classify_transaction_type_marks_negative_as_gider():
    row = {"ürün": "Hosting alımı", "açıklama": "1 yıllık hosting", "tutar": -480.0}
    assert classify_transaction_type(row) == "Gider"


def test_classify_transaction_type_marks_positive_as_gelir():
    row = {"ürün": "", "açıklama": "tarık babadan gelir", "tutar": 950.0}
    assert classify_transaction_type(row) == "Gelir"


def test_optimize_description_shortens_without_losing_meaning():
    raw = "Web sitesi için 2 yıllık domain alım işlemi"
    assert optimize_description(raw) == "2 yıllık domain alımı"


def test_move_description_to_product_when_product_missing():
    ürün, açıklama = move_description_to_product("", "tpu filament rhino3d")
    assert ürün == "TPU filament"
    assert açıklama == "Rhino3D için"


def test_merge_orphan_note_appends_existing_note():
    result = merge_orphan_note("Açık borç", "07.04.26 itibariyle")
    assert result == "Açık borç | 07.04.26 itibariyle"
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: FAIL with `ImportError` or missing function errors from `muhasebe_redesign`.

- [ ] **Step 3: Write minimal implementation**

```python
import re


def classify_transaction_type(row):
    tutar = row.get("tutar")
    açıklama = str(row.get("açıklama") or "").lower()
    ürün = str(row.get("ürün") or "").lower()
    if isinstance(tutar, (int, float)):
        if tutar > 0:
            return "Gelir"
        if tutar < 0:
            return "Gider"
    if "gelir" in açıklama or "gelir" in ürün:
        return "Gelir"
    if açıklama or ürün:
        return "Gider"
    return ""


def optimize_description(text):
    text = " ".join(str(text or "").split())
    replacements = {
        "Web sitesi için 2 yıllık domain alım işlemi": "2 yıllık domain alımı",
        "8 adet bakır dirsek, 2 uç. soğutucu sistem için": "Soğutma için 8 dirsek, 2 uç",
        "1 yıllık hosting dünyam web hosting": "1 yıllık web hosting",
    }
    return replacements.get(text, text)


def move_description_to_product(product, description):
    product = (product or "").strip()
    description = " ".join(str(description or "").split())
    if product:
        return product, optimize_description(description)
    lowered = description.lower()
    if "tpu filament" in lowered:
        return "TPU filament", "Rhino3D için"
    if "gelir" in lowered:
        return "Gelir girişi", optimize_description(description)
    return product, optimize_description(description)


def merge_orphan_note(current_note, orphan_value):
    left = (current_note or "").strip()
    right = (orphan_value or "").strip()
    if left and right:
        return f"{left} | {right}"
    return left or right
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: PASS for all 5 tests.

- [ ] **Step 5: Commit**

```bash
git -C "/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries" status --short
```

Expected: temporary script files are outside repo, so no repo commit is required at this step.

### Task 2: Workbook dönüşüm iskeletini kur

**Files:**
- Modify: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/muhasebe_redesign.py`
- Test: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py`

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path
from openpyxl import load_workbook
from muhasebe_redesign import backup_workbook, load_source_rows


def test_backup_workbook_creates_copy(tmp_path):
    src = tmp_path / "demo.xlsx"
    src.write_bytes(b"abc")
    dst = tmp_path / "demo-backup.xlsx"
    backup_workbook(src, dst)
    assert dst.read_bytes() == b"abc"


def test_load_source_rows_reads_expected_headers():
    path = Path("/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries/docs/Muhasebe/cnc muhasebe .xlsx")
    rows = load_source_rows(path)
    assert rows[0]["Kişi"] == "Ahmet"
    assert "Açıklama" in rows[0]
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: FAIL because `backup_workbook` and `load_source_rows` are undefined.

- [ ] **Step 3: Write minimal implementation**

```python
from pathlib import Path
import shutil
from openpyxl import load_workbook


SOURCE_PATH = Path("/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries/docs/Muhasebe/cnc muhasebe .xlsx")
BACKUP_PATH = Path("/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries/docs/Muhasebe/cnc muhasebe backup before redesign.xlsx")


def backup_workbook(src, dst):
    shutil.copy2(src, dst)


def load_source_rows(path):
    wb = load_workbook(path)
    ws = wb[wb.sheetnames[0]]
    headers = [ws.cell(1, c).value for c in range(1, 9)]
    result = []
    for r in range(2, ws.max_row + 1):
        values = [ws.cell(r, c).value for c in range(1, 9)]
        if any(v not in (None, "") for v in values):
            result.append(dict(zip(headers, values)))
    return result
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: PASS for new and existing tests.

- [ ] **Step 5: Commit**

```bash
ls "/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries/docs/Muhasebe"
```

Expected: original workbook still present, backup not created yet because implementation has only added functions.

### Task 3: Satır normalizasyonu ve agresif yerleştirme mantığını yaz

**Files:**
- Modify: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/muhasebe_redesign.py`
- Modify: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py`

- [ ] **Step 1: Write the failing test**

```python
from muhasebe_redesign import normalize_row


def test_normalize_row_builds_target_columns():
    row = {
        "Kişi": "Ahmet",
        "Tarih": "2026-01-28",
        "Ürün": "",
        "Adet": None,
        "Açıklama": "tpu filament rhino3d",
        "Fiyat": -250.0,
        "Toplam Fiyat": -250.0,
        "Link": None,
        "_extra_note": "foxkyra",
    }
    normalized = normalize_row(row)
    assert normalized["Tür"] == "Gider"
    assert normalized["Ürün / Hareket"] == "TPU filament"
    assert normalized["Açıklama"] == "Rhino3D için"
    assert normalized["Durum / Not"] == "foxkyra"
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: FAIL because `normalize_row` is undefined.

- [ ] **Step 3: Write minimal implementation**

```python
def normalize_row(row):
    product, description = move_description_to_product(
        row.get("Ürün"),
        row.get("Açıklama"),
    )
    note = merge_orphan_note(row.get("Durum / Not"), row.get("_extra_note"))
    return {
        "Kişi": row.get("Kişi"),
        "Tarih": row.get("Tarih"),
        "Tür": classify_transaction_type(
            {
                "ürün": product,
                "açıklama": description,
                "tutar": row.get("Toplam Fiyat"),
            }
        ),
        "Ürün / Hareket": product,
        "Adet": row.get("Adet"),
        "Birim Fiyat": row.get("Fiyat"),
        "Tutar": row.get("Toplam Fiyat"),
        "Açıklama": description,
        "Link": row.get("Link"),
        "Durum / Not": note,
    }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: PASS for normalization tests.

- [ ] **Step 5: Commit**

```bash
python3 -m py_compile "/Users/fox/.trae/work/6a70e1676dd1b27a57149114/muhasebe_redesign.py"
```

Expected: no syntax errors.

### Task 4: Çalışma sayfasını yeniden yaz ve stilleri uygula

**Files:**
- Modify: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/muhasebe_redesign.py`

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path
from openpyxl import load_workbook
from muhasebe_redesign import rewrite_workbook


def test_rewrite_workbook_sets_new_headers(tmp_path):
    source = Path("/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries/docs/Muhasebe/cnc muhasebe .xlsx")
    output = tmp_path / "rewritten.xlsx"
    rewrite_workbook(source, output)
    wb = load_workbook(output)
    ws = wb[wb.sheetnames[0]]
    headers = [ws.cell(1, c).value for c in range(1, 11)]
    assert headers == [
        "Kişi", "Tarih", "Tür", "Ürün / Hareket", "Adet",
        "Birim Fiyat", "Tutar", "Açıklama", "Link", "Durum / Not"
    ]
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: FAIL because `rewrite_workbook` is undefined.

- [ ] **Step 3: Write minimal implementation**

```python
from copy import copy
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill, Border, Side


TARGET_HEADERS = [
    "Kişi", "Tarih", "Tür", "Ürün / Hareket", "Adet",
    "Birim Fiyat", "Tutar", "Açıklama", "Link", "Durum / Not"
]


def rewrite_workbook(source_path, output_path):
    rows = load_source_rows(source_path)
    wb = Workbook()
    ws = wb.active
    ws.title = "Sayfa1"
    for idx, header in enumerate(TARGET_HEADERS, start=1):
        ws.cell(1, idx).value = header
    for cell in ws[1]:
        cell.font = Font(name="Arial", bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="1F4E78")
        cell.alignment = Alignment(horizontal="center", vertical="center")
    thin = Side(style="thin", color="D9DEE7")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    for out_row, source_row in enumerate(rows, start=2):
        normalized = normalize_row(source_row)
        for col, header in enumerate(TARGET_HEADERS, start=1):
            cell = ws.cell(out_row, col, normalized.get(header))
            cell.border = border
            if out_row % 2 == 0:
                cell.fill = PatternFill("solid", fgColor="F7F9FC")
    widths = {"A": 14, "B": 12, "C": 10, "D": 22, "E": 8, "F": 14, "G": 14, "H": 26, "I": 18, "J": 24}
    for col_letter, width in widths.items():
        ws.column_dimensions[col_letter].width = width
    for row in range(2, ws.max_row + 1):
        ws.cell(row, 8).alignment = Alignment(wrap_text=True, vertical="top")
        ws.row_dimensions[row].height = 24
    wb.save(output_path)
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: PASS and `rewritten.xlsx` contains new headers.

- [ ] **Step 5: Commit**

```bash
python3 "/Users/fox/.trae/work/6a70e1676dd1b27a57149114/muhasebe_redesign.py"
```

Expected: not ready yet or no-op unless a `main()` function has been added in the next task.

### Task 5: Toplam bloğu ve üretim çalıştırmasını ekle

**Files:**
- Modify: `/Users/fox/.trae/work/6a70e1676dd1b27a57149114/muhasebe_redesign.py`
- Modify: `docs/Muhasebe/cnc muhasebe .xlsx`
- Create: `docs/Muhasebe/cnc muhasebe backup before redesign.xlsx`

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path
from openpyxl import load_workbook
from muhasebe_redesign import rewrite_workbook


def test_rewrite_workbook_adds_summary_block(tmp_path):
    source = Path("/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries/docs/Muhasebe/cnc muhasebe .xlsx")
    output = tmp_path / "rewritten.xlsx"
    rewrite_workbook(source, output)
    ws = load_workbook(output)["Sayfa1"]
    labels = {ws.cell(r, 1).value: r for r in range(1, ws.max_row + 1)}
    assert "Toplam Gider" in labels
    assert "Toplam Gelir" in labels
    assert "Net Kasa" in labels
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: FAIL because summary rows do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```python
from openpyxl.styles import Font


def append_summary_block(ws):
    start = ws.max_row + 2
    ws.cell(start, 1, "Toplam Gider")
    ws.cell(start + 1, 1, "Toplam Gelir")
    ws.cell(start + 2, 1, "Net Kasa")
    ws.cell(start, 7, '=ABS(SUMIF(C2:C1048576,"Gider",G2:G1048576))')
    ws.cell(start + 1, 7, '=SUMIF(C2:C1048576,"Gelir",G2:G1048576)')
    ws.cell(start + 2, 7, f"=G{start + 1}-G{start}")
    for r in range(start, start + 3):
        for c in range(1, 8):
            ws.cell(r, c).font = Font(name="Arial", bold=True)


def rewrite_workbook(source_path, output_path):
    rows = load_source_rows(source_path)
    wb = Workbook()
    ws = wb.active
    ws.title = "Sayfa1"
    for idx, header in enumerate(TARGET_HEADERS, start=1):
        ws.cell(1, idx).value = header
    for cell in ws[1]:
        cell.font = Font(name="Arial", bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="1F4E78")
        cell.alignment = Alignment(horizontal="center", vertical="center")
    thin = Side(style="thin", color="D9DEE7")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    for out_row, source_row in enumerate(rows, start=2):
        normalized = normalize_row(source_row)
        for col, header in enumerate(TARGET_HEADERS, start=1):
            cell = ws.cell(out_row, col, normalized.get(header))
            cell.border = border
            if out_row % 2 == 0:
                cell.fill = PatternFill("solid", fgColor="F7F9FC")
    widths = {"A": 14, "B": 12, "C": 10, "D": 22, "E": 8, "F": 14, "G": 14, "H": 26, "I": 18, "J": 24}
    for col_letter, width in widths.items():
        ws.column_dimensions[col_letter].width = width
    for row in range(2, ws.max_row + 1):
        ws.cell(row, 8).alignment = Alignment(wrap_text=True, vertical="top")
        ws.row_dimensions[row].height = 24
    append_summary_block(ws)
    wb.save(output_path)


def main():
    backup_workbook(SOURCE_PATH, BACKUP_PATH)
    rewrite_workbook(SOURCE_PATH, SOURCE_PATH)


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py -v`

Expected: PASS and summary labels exist.

- [ ] **Step 5: Commit**

```bash
python3 "/Users/fox/.trae/work/6a70e1676dd1b27a57149114/muhasebe_redesign.py"
```

Expected: backup workbook created and target workbook rewritten in place.

### Task 6: Çıktıyı doğrula ve formül kontrolü yap

**Files:**
- Modify: `docs/Muhasebe/cnc muhasebe .xlsx`

- [ ] **Step 1: Write the failing test**

```python
from openpyxl import load_workbook


def test_final_workbook_has_expected_structure():
    path = "/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries/docs/Muhasebe/cnc muhasebe .xlsx"
    ws = load_workbook(path)["Sayfa1"]
    assert ws["A1"].value == "Kişi"
    assert ws["C1"].value == "Tür"
    assert ws["J1"].value == "Durum / Not"
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest /Users/fox/.trae/work/6a70e1676dd1b27a57149114/test_muhasebe_redesign.py::test_final_workbook_has_expected_structure -v`

Expected: FAIL before the script is run on the real workbook, or PASS if the workbook has already been rewritten. If it already passes, continue to the validation commands below.

- [ ] **Step 3: Run validation commands**

Run: `python3 - <<'PY'\nfrom openpyxl import load_workbook\npath='/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries/docs/Muhasebe/cnc muhasebe .xlsx'\nwb=load_workbook(path)\nws=wb['Sayfa1']\nprint(ws.max_row, ws.max_column)\nfor row in ws.iter_rows(min_row=max(1, ws.max_row-5), max_row=ws.max_row, min_col=1, max_col=7, values_only=True):\n    print(row)\nPY`

Expected: last rows include `Toplam Gider`, `Toplam Gelir`, `Net Kasa`.

- [ ] **Step 4: Recalculate formulas if needed**

Run: `python3 scripts/recalc.py "/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries/docs/Muhasebe/cnc muhasebe .xlsx"`

Expected: JSON output with `status: success` or at least no `#REF!`, `#VALUE!`, `#DIV/0!`, `#NAME?`.

- [ ] **Step 5: Commit**

```bash
git -C "/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries" status --short
git -C "/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries" add "docs/Muhasebe/cnc muhasebe .xlsx" "docs/Muhasebe/cnc muhasebe backup before redesign.xlsx" "docs/superpowers/plans/2026-08-03-muhasebe-xlsx-redesign.md"
git -C "/Users/fox/Documents/PROJECTS/DUCOFEX/Ducofex Industries" commit -m "feat: redesign muhasebe workbook layout"
```

Expected: repo contains the updated workbook, backup workbook, and implementation plan.

## Self-review

- Spec coverage checked: yedek alma, tek sayfa kompakt düzen, açıklama kısaltma, agresif yerleştirme, toplam bloğu ve doğrulama adımları bu planda görev bazında kapsandı.
- Placeholder scan checked: `TBD`, `TODO`, belirsiz görev cümlesi veya "sonra ekle" notu bırakılmadı.
- Type consistency checked: tüm görevlerde aynı fonksiyon adları kullanıldı: `classify_transaction_type`, `optimize_description`, `move_description_to_product`, `merge_orphan_note`, `normalize_row`, `rewrite_workbook`, `append_summary_block`, `backup_workbook`, `load_source_rows`.
