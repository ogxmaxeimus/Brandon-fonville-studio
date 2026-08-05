# BFCS — Brandon Fonville Creative Studio

Clean deployable copy of the studio site (inspired Brandon Fonville Studio site + portfolio including Saltmarsh).

## Local preview

```bash
cd /Users/brandonfonville/Projects/BFCS
python3 -m http.server 5200
```

Open http://127.0.0.1:5200/  
(Do not open via `file://` — nav uses `/works`, `/about`, etc.)

## Netlify

Publish directory: site root (`.`). Pretty URLs for `about.html` → `/about`, etc.
