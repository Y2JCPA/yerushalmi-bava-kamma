# Yerushalmi Bava Kamma — Build Spec

## Goal
Create a Daf Yomi-style interactive visual learning tool for **Talmud Yerushalmi Bava Kamma**, starting with a reviewable prototype for daf ב.

## Source
Primary source is Sefaria:

- Index: `Jerusalem Talmud Bava Kamma`
- API shape: chapter / halakhah / segment, not Bavli-style daf/amud pagination
- Daf ב prototype uses the opening sugya around the first Mishnah and Halakhah, especially the Venice column marker `2a` in Sefaria’s Yerushalmi edition.

Important difference from Bavli pipeline:

- Sefaria refs like `Jerusalem_Talmud_Bava_Kamma.2a` do **not** return a Bavli daf page. They resolve to the whole index.
- Reliable refs are like `Jerusalem_Talmud_Bava_Kamma.1.1` and `Jerusalem_Talmud_Bava_Kamma.1.2`.
- Daf/column mapping must be derived from overlay markers inside the text, e.g. `data-overlay="Venice Columns" data-value="2a"`.

## Prototype structure

```text
/
  index.html
  SPEC.md
  README.md
  data/
    bava-kamma-2.json
  scripts/
    build-daf.js
  dafim/
    bava-kamma/
      2/
        index.html
```

## Content schema

```json
{
  "masechet": "Yerushalmi Bava Kamma",
  "daf": "ב",
  "sourceRefs": ["Jerusalem Talmud Bava Kamma 1:1"],
  "slides": [
    { "type": "overview", "title": "", "body": [] },
    { "type": "comparison", "title": "", "columns": [] },
    { "type": "flow", "title": "", "steps": [] },
    { "type": "source", "title": "", "hebrew": "", "english": "" },
    { "type": "quiz", "questions": [] }
  ]
}
```

## Design rules

- Dark navy background, gold accents, Hebrew-friendly typography.
- Keep Yerushalmi-specific framing visible. Do not pretend the pagination is Bavli-style if Sefaria exposes chapter/halakhah refs.
- For each daf, show:
  1. Big idea
  2. Source anchor and page/column note
  3. Visual map of the sugya
  4. Hebrew/English source excerpt
  5. Short quiz

## Next decisions after prototype review

1. Should the site follow **Venice columns** (`2a`, `2b`, etc.) or **chapter/halakhah units**?
2. Should the cousin prefer Hebrew-only, English-only, or bilingual?
3. Should content be simple summary or richer AI-generated slides like the Bavli site?
4. Should we create a GitHub repo and GitHub Pages deployment after approval?
