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
      tag: "Linking", status: "review",
      title: "RESYNC: Aspect-Guided Knowledge Modeling and Semantic Ranking for PoC–CVE Link Recovery",
      desc: "Recovers missing links between PoC reports and CVE records.",
    },
    {
      tag: "Study", status: "review",
      title: "Real-World Usability of Vulnerability Proof-of-Concepts: A Comprehensive Study",
      desc: "Availability, completeness and reproducibility of PoCs in the wild.",
    },
    {
      tag: "Migration", status: "review",
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

  // 专利与软件著作权（来源：证书，2026-11；权利人均为天津大学）
  ip: [
    {
      tag: "Patent",
      title: "A PoC Data Completion Method Based on Multi-Source Heterogeneous Vulnerability Data",
      original: "一种基于多源异构漏洞数据的PoC数据补全方法",
      people: "Sen Chen, Lingxiao Wang, Wenjing Dang",
      detail: "Chinese invention patent ZL 2024 1 0761898.8 (CN 118747368 B), granted Jan 2025",
    },
    {
      tag: "Patent",
      title: "An LLM-Based PoC Generation Method for Web Application Vulnerabilities",
      original: "一种基于大语言模型的Web应用程序漏洞PoC生成方法",
      people: "Sen Chen, Mengyao Zhao",
      detail: "Chinese invention patent ZL 2025 1 0184996.4 (CN 120030553 B), granted Oct 2025",
    },
    {
      tag: "Software",
      title: "CyberSploit Vulnerability PoC Retrieval Platform V1.0",
      original: "CyberSploit漏洞PoC检索平台",
      people: "Tianjin University",
      detail: "Software copyright registration 2024SR1084479, Jul 2024",
    },
    {
      tag: "Software",
      title: "Completion: Vulnerability PoC Information Fusion Platform V1.0",
      original: "Completion漏洞PoC信息融合平台",
      people: "Tianjin University",
      detail: "Software copyright registration 2025SR0871063, May 2025",
    },
  ],

  // PoC 领域论文综述（团队维护的 PoC-Research-Papers 列表；数字按 2026-11-25 的 README 统计，更新列表后改这里）
  survey: {
    url: "https://marklee131.github.io/PoC-Research-Papers/",
    repo: "https://github.com/MarkLee131/PoC-Research-Papers",
    papers: 64, published: 57, preprints: 7, span: "2008–2026",
    venues: ["S&P", "CCS", "USENIX Security", "NDSS", "ICSE", "FSE", "ISSTA", "ASE", "TOSEM", "TDSC", "PLDI", "ICPC", "KDD"],
    // 每年篇数（不含预印本）
    years: [["≤'16", 3], ["'17", 1], ["'18", 4], ["'19", 3], ["'20", 1], ["'21", 5], ["'22", 3], ["'23", 3], ["'24", 4], ["'25", 7], ["'26", 23]],
    themes: [
      { name: "PoC generation", topics: [["Fuzzing-based", 8], ["Symbolic execution", 8], ["LLM & agent-based", 8],
                                         ["Program analysis", 5], ["Heap layout & exploit primitives", 2]] },
      { name: "PoC applications", topics: [["PoC migration & transformation", 7], ["Exploitability assessment", 6],
                                           ["Patch validation & repair", 2], ["Bug reproduction", 1]] },
      { name: "Empirical studies", topics: [["Exploit reproducibility", 2], ["Community & exploit landscape", 2]] },
    ],
  },

  // 参与方式
  issuesUrl: "https://github.com/dangwenjing/Cybersploit/issues",

  // 与现有数据集的对比（其他数据集的信息请核实；值：yes / no / part / links / 文本）
  // 维度：scope 来源，scale 规模，nonCve 收录无 CVE 的 PoC，text 文字步骤类 PoC（不只代码），
  //       content 含完整 PoC（links = 只有链接），aspects 关键要素结构化，
  //       completion 多源补全，linking PoC–CVE 关联恢复，updated 持续更新
  // 只放对我们有利或中性的维度（用户 2026-11-24：获取方式、验证这类对我们不利的不写）
  compareAsOf: "November 2026",
  compare: [
    { name: "Exploit-DB", scope: "Curated exploit archive", scale: "46K+", nonCve: "yes", text: "part", content: "yes",
      aspects: "no", completion: "no", linking: "no", updated: "yes" },
    { name: "Packet Storm", scope: "Security file archive", scale: "—", nonCve: "yes", text: "yes", content: "yes",
      aspects: "no", completion: "no", linking: "no", updated: "yes" },
    { name: "Metasploit", scope: "Exploit modules", scale: "2.5K+", nonCve: "part", text: "no", content: "yes",
      aspects: "part", completion: "no", linking: "no", updated: "yes" },
    { name: "Nuclei Templates", scope: "Detection templates", scale: "—", nonCve: "yes", text: "no", content: "yes",
      aspects: "part", completion: "no", linking: "no", updated: "yes" },
    { name: "PoC-in-GitHub", scope: "GitHub repositories", scale: "12K+ CVEs", nonCve: "no", text: "no", content: "links",
      aspects: "no", completion: "no", linking: "no", updated: "yes" },
    { name: "trickest/cve", scope: "GitHub + CVE references", scale: "—", nonCve: "no", text: "no", content: "links",
      aspects: "no", completion: "no", linking: "no", updated: "yes" },
    { name: "Vulners", scope: "Aggregator", scale: "—", nonCve: "yes", text: "part", content: "yes",
      aspects: "no", completion: "no", linking: "no", updated: "yes" },
    { name: "Sploitus", scope: "Exploit search engine", scale: "—", nonCve: "yes", text: "part", content: "yes",
      aspects: "no", completion: "no", linking: "no", updated: "yes" },
    { name: "ARVO", scope: "OSS-Fuzz crashes", scale: "5K+", nonCve: "yes", text: "no", content: "yes",
      aspects: "no", completion: "no", linking: "no", updated: "part" },
    { name: "Vul4J", scope: "Java projects", scale: "79", nonCve: "part", text: "no", content: "yes",
      aspects: "no", completion: "no", linking: "no", updated: "no" },
  ],
};
