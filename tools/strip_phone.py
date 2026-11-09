"""Remove the phone number from a one-page CV header and re-centre the contact line.

The phone and the separator after it are deleted (true redaction, not a white box);
the remaining characters are re-drawn at their original positions, shifted so the
line stays centred, with the font extracted from the same PDF. Links move with them.
"""
import re, sys, pymupdf

PHONE = re.compile(r"^\+212")

def main(src, dst):
    doc = pymupdf.open(src)
    page = doc[0]
    raw = page.get_text("rawdict")
    line_spans = []
    for b in raw["blocks"]:
        if b.get("type") != 0:
            continue
        for l in b["lines"]:
            for s in l["spans"]:
                txt = "".join(c["c"] for c in s["chars"])
                if any(PHONE.match(txt) for _ in [0]) or "@" in txt:
                    line_y = s["origin"][1]
    for b in raw["blocks"]:
        if b.get("type") != 0:
            continue
        for l in b["lines"]:
            for s in l["spans"]:
                if abs(s["origin"][1] - line_y) < 0.5:
                    line_spans.append(s)
    line_spans.sort(key=lambda s: s["origin"][0])
    texts = ["".join(c["c"] for c in s["chars"]) for s in line_spans]
    i_phone = next(i for i, t in enumerate(texts) if PHONE.match(t))
    i_mail = next(i for i, t in enumerate(texts) if "@" in t)
    x_phone = line_spans[i_phone]["origin"][0]
    x_mail = line_spans[i_mail]["origin"][0]
    removed = x_mail - x_phone
    x0 = min(s["bbox"][0] for s in line_spans)
    x1 = max(s["bbox"][2] for s in line_spans)
    print(f"line y={line_y:.2f} x0={x0:.2f} x1={x1:.2f} centre={(x0+x1)/2:.2f} page centre={page.rect.width/2:.2f} removed={removed:.2f}")

    font_name = line_spans[0]["font"]
    size = line_spans[0]["size"]
    color = line_spans[0]["color"]
    xref = next(f[0] for f in page.get_fonts() if f[3].split("+")[-1] == font_name)
    _, ext, _, buf = doc.extract_font(xref)

    keep = []  # (char, x, y)
    for i, s in enumerate(line_spans):
        if i_phone <= i < i_mail:
            continue
        shift = removed / 2 if i < i_phone else -removed / 2
        for c in s["chars"]:
            if c["c"].strip():
                keep.append((c["c"], c["origin"][0] + shift, c["origin"][1]))

    links = [ln for ln in page.get_links() if abs((ln["from"].y0 + ln["from"].y1) / 2 - (line_y - size / 3)) < size]
    y_top = min(s["bbox"][1] for s in line_spans)
    y_bot = max(s["bbox"][3] for s in line_spans)
    area = pymupdf.Rect(x0 - 2, y_top + 0.3, x1 + 2, y_bot - 0.3)
    page.add_redact_annot(area, fill=False)
    page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)
    for ln in page.get_links():
        if ln["from"].intersects(area):
            page.delete_link(ln)

    page.insert_font(fontname="cvcontact", fontbuffer=buf)
    rgb = tuple(((color >> k) & 255) / 255 for k in (16, 8, 0))
    for ch, x, y in keep:
        page.insert_text((x, y), ch, fontname="cvcontact", fontsize=size, color=rgb)
    for ln in links:
        r = ln["from"]
        shift = removed / 2 if r.x0 < x_phone else -removed / 2
        page.insert_link({"kind": pymupdf.LINK_URI, "from": r + (shift, 0, shift, 0), "uri": ln["uri"]})
    print("links moved:", [(ln["uri"]) for ln in links])

    # The re-embedded font maps its hyphen glyph to U+00AD (soft hyphen), so a
    # copied LinkedIn URL would lose its dashes. Map it back to U+002D.
    for f in page.get_fonts():
        if f[4] == "cvcontact":
            kind, val = doc.xref_get_key(f[0], "ToUnicode")
            tu = int(val.split()[0])
            cmap = doc.xref_stream(tu).decode("latin-1")
            fixed = re.sub(r"<00[aA][dD]>", "<002d>", cmap)
            print("ToUnicode soft hyphens fixed:", cmap != fixed)
            doc.update_stream(tu, fixed.encode("latin-1"))
    doc.save(dst, garbage=4, deflate=True)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
