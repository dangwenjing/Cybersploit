// CyberSploit 站点配置 —— 需要人工填写 / 核实的内容都集中在这里。
window.CS_CONFIG = {
  // 申请数据的邮箱
  contactEmail: "dangwenjing@tju.edu.cn",

  // 作者主页（ORCID）
  orcid: "https://orcid.org/0009-0006-2169-8024",

  // 已发表论文（来源：ORCID + Crossref，2026-11）
  publications: [
    {
      tag: "TIFS'26",
      title: "Synchronizing Key Aspects: Enhancing Vulnerability PoC Reports From Multiple Sources",
      authors: "Wenjing Dang, Lyuye Zhang, Lingxiao Wang, Kaixuan Li, Mengyao Zhao, Xiaohong Li, Sen Chen",
      venue: "IEEE Transactions on Information Forensics and Security, 2026, pp. 9440–9455",
      doi: "10.1109/TIFS.2026.3744620",
    },
    {
      tag: "ASE'26 SRC",
      title: "Making Vulnerability Proof-of-Concepts Trustworthy and Usable: From Empirical Diagnosis to Operational Validation",
      authors: "Wenjing Dang",
      venue: "ACM Student Research Competition, 41st IEEE/ACM International Conference on Automated Software Engineering (ASE '26), pp. 4648–4650",
      doi: "10.1145/3832783.3844563",
    },
    {
      tag: "ASE'26 Short",
      title: "Vulnerability Proof-of-Concepts in Software Supply Chain: Real-World Usage Scenarios from the Perspective of Migration",
      authors: "Wenjing Dang, Xiaohong Li, Sen Chen",
      venue: "Short paper, 2nd International Workshop on Software Genomics (SWGeno '26) @ ASE 2026, pp. 29–32",
      doi: "10.1145/3844178.3844647",
    },
    {
      tag: "FSE'25",
      title: "Aligning Core Aspects: Improving Vulnerability Proof-of-Concepts via Cross-Source Insights",
      authors: "Lingxiao Wang, Wenjing Dang, Mengyao Zhao, Yue Wang, Xianzong Wu, Sen Chen",
      venue: "33rd ACM International Conference on the Foundations of Software Engineering (FSE Companion '25), pp. 1774–1777",
      doi: "10.1145/3696630.3730572",
    },
  ],

  // 进行中的工作（不写投稿去向）
  ongoing: [
    {
      tag: "Linking",
      title: "RESYNC: Aspect-Guided Knowledge Modeling and Semantic Ranking for PoC–CVE Link Recovery",
      desc: "Recovers missing links between PoC reports and CVE records.",
    },
    {
      tag: "Study",
      title: "Real-World Usability of Vulnerability Proof-of-Concepts: A Comprehensive Study",
      desc: "Availability, completeness and reproducibility of PoCs in the wild.",
    },
    {
      tag: "Migration",
      title: "PoC migration across software versions and the supply chain",
      desc: "Adapting existing PoCs to validate vulnerabilities in other versions and downstream products.",
    },
    // —— 以下为开放研究方向（status: "open"），页面上标注 “Open direction · collaboration welcome”
    {
      tag: "Trust", status: "open",
      title: "Trustworthy PoCs: detecting fake and malicious proof-of-concepts",
      desc: "Separating genuine PoCs from fake, broken or backdoored ones before they are reused.",
    },
    {
      tag: "Validation", status: "open",
      title: "Automated PoC validation with reproducible environments",
      desc: "Building vulnerable environments and replaying PoCs automatically to confirm they work.",
    },
    {
      tag: "Oracle", status: "open",
      title: "Synthesizing verification oracles",
      desc: "Inferring observable success signals (crashes, errors, privilege changes) for PoCs that lack them.",
    },
    {
      tag: "Patching", status: "open",
      title: "PoC-driven affected-version confirmation and patch-completeness checking",
      desc: "Using completed PoCs to pin down true affected ranges and to catch incomplete or mis-backported fixes.",
    },
  ],

  // 参与方式
  issuesUrl: "https://github.com/dangwenjing/Cybersploit/issues",

  // 与现有数据集的对比（其他数据集的信息请核实；值：yes / no / part / 文本）
  compareAsOf: "November 2026",
  compare: [
    { name: "Exploit-DB", scope: "1 (curated exploits)", nonCve: "yes", aspects: "no", completion: "no", linking: "no", verified: "part", updated: "yes" },
    { name: "PoC-in-GitHub", scope: "1 (GitHub repositories)", nonCve: "no", aspects: "no", completion: "no", linking: "no", verified: "no", updated: "yes" },
    { name: "trickest/cve", scope: "GitHub + CVE references (links)", nonCve: "no", aspects: "no", completion: "no", linking: "no", verified: "no", updated: "yes" },
    { name: "ARVO", scope: "1 (OSS-Fuzz)", nonCve: "yes", aspects: "no", completion: "no", linking: "no", verified: "yes", updated: "part" },
  ],
};
