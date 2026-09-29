import { Rocket, Satellite, Activity, Plane, Cpu, BriefcaseBusiness } from 'lucide-react'
import { SiPalantir, SiPython, SiPostgresql, SiKubernetes, SiTerraform, SiDocker, SiNextdotjs, SiReact, SiTailwindcss, SiElasticsearch, SiJenkins, SiPytorch, SiFastapi, SiTypescript, SiVercel, SiDotnet, SiAngular, SiNodedotjs, SiGit, SiJira, SiGithubactions, SiGrafana, SiPrometheus, SiRedis, SiApacheairflow, SiCplusplus, SiLinux, SiGnubash, SiKibana, SiLogstash, SiOpencv, SiNvidia, SiPostman, SiSwagger, SiApachespark, SiGooglesheets, SiGoogleappsscript } from 'react-icons/si'
import { FaAws, FaMicrosoft, FaDatabase } from 'react-icons/fa'

export const missions = [
  {
    id: 'airbus-electric-center',
    title: 'Mission I — Airbus Operations (Electric Center)',
    meta: 'Systems Engineering & Quality Intern • Apr 2026 – Nov 2026 • Toulouse',
    profile:
      'Supporting Non-Conformance (NC) reduction and Cost of Non-Quality (CoNQ) optimization by centralizing quality data in Skywise, categorizing recurring defects, and structuring weekly multi-functional team corrective action reviews.',
    icon: Plane,
    techStack: [
      { name: 'Palantir Foundry', icon: SiPalantir },
      { name: 'Python', icon: SiPython },
      { name: 'PySpark', icon: SiApachespark },
      { name: 'SQL', icon: FaDatabase },
      { name: 'Google Sheets', icon: SiGooglesheets }
    ],
    operations: [
      {
        code: 'AEC1',
        name: 'Skywise NC tracking & reconciliation',
        objective: 'Centralize quality tracking and reconcile records to eliminate misallocated liability.',
        did: [
          'Automated NC monitoring and reporting in Skywise, replacing fragmented manual spreadsheets with a live single source of truth.',
          'Reconciled historical and active NC records to identify missing cases and disputed customer returns, removing them from team liability.',
          'Applied automated categorization across defect descriptions to isolate recurring failure families for root-cause analysis.',
        ],
        telemetry: [
          { label: 'Platform', value: 'Skywise (Foundry)' },
          { label: 'Reconciliation', value: 'liability dispute resolved' },
          { label: 'Reporting', value: 'live continuous view' },
        ],
        before: 'Fragmented Excel trackers and disputed returns',
        after: 'Centralized live dashboards & verified liabilities',
      },
      {
        code: 'AEC2',
        name: 'MFT governance & 3-level CoNQ model',
        objective: 'Standardize corrective action tracking and model multi-level cost of non-quality drivers.',
        did: [
          'Designed the standardized framework for weekly Multi-Functional Team (MFT) reviews between quality leads and shop-floor operators.',
          'Structured problem ownership, action item deadlines, and continuous improvement verification loops.',
          'Developed a three-level Cost of Non-Quality (CoNQ) model pairing high-level KPIs with root-cause quality-loss drivers.',
        ],
        telemetry: [
          { label: 'Cadence', value: 'weekly MFT reviews' },
          { label: 'Framework', value: '3-level CoNQ model' },
          { label: 'Traceability', value: 'defect to resolution' },
        ],
        before: 'Slow ad-hoc escalation without closed-loop tracking',
        after: 'Standardized MFT reviews & structured CoNQ metrics',
      },
    ],
  },
  {
    id: 'green',
    title: 'Mission II — Green Praxis',
    meta: 'Cloud & Data Engineer • Jan 2025 – Aug 2025 • Aix-en-Provence',
    profile:
      'Built and maintained the cloud, data engineering, and monitoring layers turning satellite imagery into on-demand map tiles and environmental indicators via AWS EKS, Airflow, and FastAPI.',
    icon: Satellite,
    techStack: [
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'Terraform', icon: SiTerraform },
      { name: 'AWS', icon: FaAws },
      { name: 'Docker', icon: SiDocker },
      { name: 'Python', icon: SiPython },
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Airflow', icon: SiApacheairflow },
      { name: 'Grafana', icon: SiGrafana },
      { name: 'Prometheus', icon: SiPrometheus },
      { name: 'Redis', icon: SiRedis },
      { name: 'FastAPI', icon: SiFastapi }
    ],
    operations: [
      {
        code: 'G1',
        name: 'Geospatial pipelines & dynamic tile gateway',
        objective: 'Scale STAC ingestion throughput and deliver on-demand map rendering with low latency.',
        did: [
          'Developed 15+ Airflow DAGs querying STAC catalogs (Sentinel-2, Landsat-8) for cloud-masking, NDVI/NDWI rasters, and metadata ingestion.',
          'Increased ingestion throughput 6× (8 → 48 scenes/hour) and cut DAG parse times by 80% using the Airflow TaskFlow API.',
          'Engineered an on-demand FastAPI gateway backed by Google Earth Engine and Redis, cutting tile storage by 80% and map refresh to <30 min.',
          'Built an AI and statistical matching tool to link raw addresses to cadastral references.',
        ],
        telemetry: [
          { label: 'Throughput', value: '6× (8 → 48 scenes/hr)' },
          { label: 'Storage', value: '−80% disk footprint' },
          { label: 'P95 latency', value: '−63% (600ms → 220ms)' },
        ],
        before: 'Slow batch pre-rendering with massive disk overhead',
        after: 'On-demand GEE tile streaming with Redis caching',
      },
      {
        code: 'G2',
        name: 'Autoscaling, IaC & full-stack observability',
        objective: 'Ensure ≥98% pipeline SLA with Karpenter/KEDA autoscaling and automated CI/CD.',
        did: [
          'Deployed Prometheus, Grafana, and Alertmanager across EKS with 24 dashboards and 35 alert rules covering 95% of critical paths.',
          'Implemented Karpenter for just-in-time EKS node provisioning and KEDA for event-driven queue autoscaling.',
          'Maintained reusable Terraform modules (VPC, EKS, S3, IAM, ECR) and end-to-end GitHub Actions CI/CD deployment pipelines.',
          'Refactored Express.js gateway to Node 18 LTS, migrating to PASETO tokens with rate-limiting and Jest coverage.',
        ],
        telemetry: [
          { label: 'SLA', value: '≥98% pipeline reliability' },
          { label: 'Observability', value: '24 boards · 35 alert rules' },
          { label: 'Autoscaling', value: 'Karpenter + KEDA on EKS' },
        ],
        before: 'Ad-hoc node groups and unmonitored failure modes',
        after: 'Self-healing autoscaled EKS with proactive alerting',
      },
    ],
  },
  {
    id: 'airbus',
    title: 'Mission III — Airbus SAS',
    meta: 'Data Engineer (Apprenticeship & Exchange) • Jan 2023 – Jun 2024 • Toulouse',
    profile:
      'Built executive workforce analytics across global business units, automated job requisition tracking, and mapped data-flow architectures for the OPTIMATE automated taxiing project.',
    icon: Rocket,
    techStack: [
      { name: 'Python', icon: SiPython },
      { name: 'SQL', icon: FaDatabase },
      { name: 'Apps Script', icon: SiGoogleappsscript },
      { name: 'Google Sheets', icon: SiGooglesheets },
      { name: 'Git', icon: SiGit }
    ],
    operations: [
      {
        code: 'A1',
        name: 'Global workforce reporting & JR automation',
        objective: 'Standardize international workforce data and enhance job requisition tracking.',
        did: [
          'Consolidated fragmented HR data from multiple international entities (including India and Portugal) into a validated analytical dataset.',
          'Automated Job Requisition (JR) status inference beyond baseline Workday capabilities to improve talent forecasting.',
          'Streamlined validation controls, cutting manual data-entry errors by 90% and dashboard deployment time by 80% (1 week → 1 day).',
        ],
        telemetry: [
          { label: 'Deploy time', value: '−80% (1 week → 1 day)' },
          { label: 'Data accuracy', value: '−90% manual errors' },
          { label: 'Reach', value: '5 international regions' },
        ],
        before: 'Manual weekly data stitching across regional silos',
        after: 'Automated executive dashboards with validation checks',
      },
      {
        code: 'A2',
        name: 'OPTIMATE automated taxiing exchange',
        objective: 'Map cross-functional requirements and conceptual data architecture for automated taxiing.',
        did: [
          'Conducted stakeholder interviews across avionics, testing, and analytics to uncover data producers, consumers, and latency limits.',
          'Mapped inter-system data interfaces, telemetry feeds, and dependencies into a conceptual data-flow architecture.',
          'Delivered interface specifications and operational handover documentation for downstream development.',
        ],
        telemetry: [
          { label: 'Program', value: 'OPTIMATE Automated Taxiing' },
          { label: 'Scope', value: 'cross-functional data flow' },
          { label: 'Deliverable', value: 'interface specs & architecture' },
        ],
        before: 'Disjointed data expectations across subsystems',
        after: 'Consolidated data architecture and interface baseline',
      },
    ],
  },
  {
    id: 'murex',
    title: 'Mission IV — Murex Systems',
    meta: 'Software Architect • May 2021 – Jan 2022 • Beirut',
    profile:
      'Conceived and led a modular log-analysis platform to surface failure patterns, improving system observability and accountability.',
    icon: Activity,
    techStack: [
      { name: 'Python', icon: SiPython },
      { name: 'C++', icon: SiCplusplus },
      { name: 'Elasticsearch', icon: SiElasticsearch },
      { name: 'Logstash', icon: SiLogstash },
      { name: 'Kibana', icon: SiKibana },
      { name: 'Linux', icon: SiLinux },
      { name: 'Bash', icon: SiGnubash },
      { name: 'Jenkins', icon: SiJenkins }
    ],
    operations: [
      {
        code: 'M1',
        name: 'Drain log parsing & issue triage',
        objective: 'Adapt Drain log-parsing algorithm to detect recurring failure patterns and assign department ownership.',
        did: [
          'Adapted the Drain log-parsing algorithm to isolate recurring message patterns across high-volume Linux logs.',
          'Detected 50+ previously uncaught error signatures and tied problems directly to responsible system owners.',
          'Refined parsing requirements with stakeholders and integrated feedback loops for issue resolution.',
        ],
        telemetry: [
          { label: 'Discovery', value: '50+ recurring error types' },
          { label: 'Algorithm', value: 'Drain parsing on Linux' },
          { label: 'Accountability', value: 'ownership-based triage' },
        ],
        before: 'Raw unparsed logs with uncaught exceptions',
        after: 'Automated Drain patterns tied to team ownership',
      },
      {
        code: 'M2',
        name: 'Engineering hygiene & delivery',
        objective: 'Raise engineering standards while delivering the analysis platform on schedule.',
        did: [
          'Led technical architecture and guided two interns on implementation, testing, and incremental delivery.',
          'Enforced code reviews, unit testing, and Docker/Jenkins CI/CD automation in secure internal infrastructure.',
          'Maintained reliable build and deployment paths for modular parsing services.',
        ],
        telemetry: [
          { label: 'Delivery', value: 'on schedule' },
          { label: 'Hygiene', value: 'reviews + Docker CI/CD' },
          { label: 'Team', value: 'guided 2 interns' },
        ],
        before: 'Ad-hoc development processes',
        after: 'Repeatable Docker/Jenkins CI/CD pipelines',
      },
    ],
  },
  {
    id: 'zaka',
    title: 'Mission V — ZAKA',
    meta: 'AI Pipeline Developer • Oct 2020 – Sep 2021 • Beirut',
    profile:
      'Built and optimized a multi-camera computer-vision pipeline on Nvidia DeepStream with GPU acceleration and CI/CD.',
    icon: Cpu,
    techStack: [
      { name: 'PyTorch', icon: SiPytorch },
      { name: 'OpenCV', icon: SiOpencv },
      { name: 'Nvidia DeepStream', icon: SiNvidia },
      { name: 'C++', icon: SiCplusplus },
      { name: 'Python', icon: SiPython },
      { name: 'Docker', icon: SiDocker },
      { name: 'FastAPI', icon: SiFastapi }
    ],
    operations: [
      {
        code: 'Z1',
        name: 'Real-time CV inference scaling',
        objective: 'Scale video processing to hundreds of concurrent camera streams with low latency.',
        did: [
          'Developed object-detection, facial-recognition, and anomaly-detection modules in C++ and Python.',
          'Scaled processing to 400+ live streams utilizing Nvidia DeepStream, CUDA, and TensorRT.',
          'Optimized C++ memory efficiency and concurrency, achieving a 30% gain in processing throughput.',
        ],
        telemetry: [
          { label: 'Streams', value: '400+ concurrent' },
          { label: 'Efficiency', value: '+30% throughput' },
          { label: 'Tech', value: 'DeepStream / C++' },
        ],
        before: 'CPU-bound processing bottlenecks',
        after: 'GPU-accelerated scalable inference',
      },
      {
        code: 'Z2',
        name: 'Delivery hygiene & guardrails',
        objective: 'Make the complex computer-vision stack safer to release and maintain.',
        did: [
          'Established automated unit, integration, and stress testing using Google Test.',
          'Containerized the application and maintained CI/CD pipelines for zero-downtime deployments.',
          'Benchmarked main paths and documented architecture for Nvidia-sponsored collaboration.',
        ],
        telemetry: [
          { label: 'Testing', value: 'Google Test coverage' },
          { label: 'Deploys', value: 'zero downtime' },
          { label: 'Platform', value: 'Docker / K8s' },
        ],
        before: 'Fragile manual integration risk',
        after: 'Repeatable delivery with automated tests',
      },
    ],
  },
  {
    id: 'aimtools',
    title: 'Mission VI — AimTools',
    meta: 'Full-Stack Developer • Jun 2020 – Feb 2021 • Beirut',
    profile:
      'Delivered a web order-management platform with Amazon integration, C#/.NET backend, Angular frontend, and Azure hosting.',
    icon: BriefcaseBusiness,
    techStack: [
      { name: '.NET Core', icon: SiDotnet },
      { name: 'Angular', icon: SiAngular },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'SQL Server', icon: FaDatabase },
      { name: 'Azure', icon: FaMicrosoft },
      { name: 'Swagger', icon: SiSwagger },
      { name: 'Postman', icon: SiPostman }
    ],
    operations: [
      {
        code: 'T1',
        name: 'High-volume transaction platform',
        objective: 'Support real-time inventory and processing for a high-transaction order workflow.',
        did: [
          'Designed the .NET backend and REST APIs to handle dynamic pricing and real-time inventory.',
          'Built a responsive Angular UI and optimized Microsoft SQL Server queries/indexes.',
          'Automated Amazon inventory syncs, reducing manual order handling by 70%.',
        ],
        telemetry: [
          { label: 'Volume', value: 'thousands/day' },
          { label: 'Automation', value: '70% less manual work' },
          { label: 'Stack', value: '.NET + Angular' },
        ],
        before: 'Manual inventory and fragmented UI',
        after: 'Responsive platform with live sync',
      },
      {
        code: 'T2',
        name: 'Security & Azure CI/CD',
        objective: 'Secure the platform data and automate the cloud delivery lifecycle.',
        did: [
          'Implemented authentication, MFA, and data encryption in transit and at rest.',
          'Documented APIs via Swagger and tested endpoint integrity using Postman.',
          'Hosted on Azure and fully automated builds and deployments using Azure DevOps.',
        ],
        telemetry: [
          { label: 'Security', value: 'MFA + encryption' },
          { label: 'Delivery', value: 'Azure DevOps' },
          { label: 'Docs', value: 'Swagger + Postman' },
        ],
        before: 'Unsecured endpoints and manual builds',
        after: 'Encrypted data and repeatable CI/CD',
      },
    ],
  },
] as const