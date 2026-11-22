# CyberSploit

**A large-scale vulnerability Proof-of-Concept (PoC) dataset, unified from diverse, continuously expanding sources, structured by key aspects, and enhanced by multi-source completion and PoC–CVE link recovery.**

🌐 Website: https://dangwenjing.github.io/Cybersploit/

## Contributions

| | What it does | Result (as reported in our papers) |
|---|---|---|
| **Multi-source collection** | PoC reports from exploit databases, advisories, mailing lists, bug trackers and code hosting, deduplicated under one schema and continuously expanded — including PoCs without a CVE ID | 290K+ PoC reports, 61K+ CVEs |
| **Key-aspect structuring** | Eight key aspects extracted per report, from code or free text | Extraction precision / recall 0.96 / 0.94 |
| **PoC–CVE link recovery** (RESYNC) | Recovers the CVE behind PoCs that do not cite one | Recall@10 96.3%, MRR 0.85; 1.2–3.9× over baselines |
| **Multi-source fusion for quality** | Missing aspects completed from CVE entries and behaviorally complementary PoCs | 86,595 reports enhanced; correctness 91.3%; reproducible PoCs 14 → 43; retrieval Hit@10 0.66 → 0.88 |

### Key aspects

- **Exploit aspects** — Trigger Step, Verification Oracle, Test Platform, Software Version
- **Basic aspects** — Title, Author, Publish Time, Reference, Vulnerability Type, Key Function

### Impact

- **20 PoC references added to official CVE records** (15 recovered PoC–CVE links, 5 completed PoC reports)
- **NVD affected-version ranges corrected** (e.g., Neovim added to CVE-2021-4019)
- **2 incomplete security fixes confirmed** by maintainers (AVideo GitHub security advisories)

## Data access

The website provides aspect-level search and basic metadata. Full records (PoC code, trigger steps, verification oracles, attachments) are shared with researchers **on request** — see the *Data access* section of the website. Data is provided for research and defensive purposes only and may not be redistributed.

## Get involved

CyberSploit is actively maintained and continuously expanded. We welcome:

- **Feedback** — open a [GitHub issue](https://github.com/dangwenjing/Cybersploit/issues) or email us
- **Research collaboration** — PoC linking, completion, validation, migration, trustworthiness
- **New PoCs** — please submit by email (dangwenjing@tju.edu.cn), not via public issues; follow coordinated disclosure for unfixed vulnerabilities

## Citation

Please cite the papers listed on the website's *Publications* section if you use CyberSploit.

## Repository layout

```
index.html        landing page
search.html       aspect-level search
assets/           styles, scripts, site configuration
data/             exported public metadata (no PoC content)
```
