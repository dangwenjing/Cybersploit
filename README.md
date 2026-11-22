# CyberSploit

**A large-scale vulnerability Proof-of-Concept (PoC) dataset, unified from 13 public platforms, structured by key aspects, and enhanced by multi-source completion and PoC–CVE link recovery.**

🌐 Website: https://dangwenjing.github.io/Cybersploit/

## Contributions

| | What it does | Result (as reported in our papers) |
|---|---|---|
| **Multi-source collection** | PoC reports from 13 platforms (exploit databases, advisories, mailing lists, bug trackers, code hosting), deduplicated under one schema — including PoCs without a CVE ID | 13 platforms |
| **Key-aspect structuring** | Eight key aspects extracted per report, from code or free text | Extraction P/R 0.96/0.94; only 0.034% of raw reports contain all eight |
| **PoC–CVE link recovery** (RESYNC) | Recovers the CVE behind PoCs that do not cite one | Recall@10 96.3%, MRR 0.85 |
| **Multi-source fusion for quality** | Missing aspects completed from CVE entries and behaviorally complementary PoCs | 86,595 reports enhanced; correctness 91.3%; reproducible PoCs 14 → 43; retrieval Hit@10 0.66 → 0.88 |

### Key aspects

- **Exploit aspects** — Trigger Step, Verification Oracle, Test Platform, Software Version
- **Basic aspects** — Title, Author, Publish Time, Reference, Vulnerability Type, Key Function

## Data access

The website provides aspect-level search and basic metadata. Full records (PoC code, trigger steps, verification oracles, attachments) are shared with researchers **on request** — see the *Data access* section of the website. Data is provided for research and defensive purposes only and may not be redistributed.

## Citation

Please cite the papers listed on the website's *Publications* section if you use CyberSploit.

## Repository layout

```
index.html        landing page
search.html       aspect-level search
assets/           styles, scripts, site configuration
data/             exported public metadata (no PoC content)
```
