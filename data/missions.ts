import { Rocket, Satellite, Activity, Plane, Cpu, BriefcaseBusiness } from 'lucide-react'
import { SiPalantir, SiPython, SiPostgresql, SiKubernetes, SiTerraform, SiDocker, SiNextdotjs, SiReact, SiTailwindcss, SiElasticsearch, SiJenkins, SiPytorch, SiFastapi, SiTypescript, SiVercel, SiDotnet, SiAngular, SiNodedotjs, SiGit, SiJira, SiGithubactions, SiGrafana, SiPrometheus, SiRedis, SiApacheairflow, SiCplusplus, SiLinux, SiGnubash, SiKibana, SiLogstash, SiOpencv, SiNvidia, SiPostman, SiSwagger, SiApachespark, SiGooglesheets, SiGoogleappsscript } from 'react-icons/si'
import { FaAws, FaMicrosoft, FaDatabase } from 'react-icons/fa'

export const missions = [
  {
    id: 'airbus-electric-center',
    title: 'Mission I — Airbus Electric Center',
    meta: 'Systems & Quality Engineering • May 2026 – Present • Toulouse',
    profile:
      'Driving Non-Conformance reduction and optimizing the Cost of Non-Quality (CoNQ) by architecting a centralized, data-driven quality tracking platform within the Skywise ecosystem.',
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
        name: 'Process architecture & digitalization',
        objective: 'Elicit requirements to map legacy data workflows and model the migration path to Skywise.',
        did: [
          'Elicited data requirements from quality and engineering stakeholders to map legacy workflows.',
          'Applied systems engineering principles to model the "as-is" quality data architecture.',
          'Designed a unified Skywise data model to establish a single source of truth for the team.',
        ],
        telemetry: [
          { label: 'Focus', value: 'requirements + modeling' },
          { label: 'Platform', value: 'Skywise (Foundry)' },
          { label: 'Status', value: 'in progress' },
        ],
        before: 'Fragmented manual trackers and data silos',
        after: 'Modeled "to-be" architecture & data governance',
      },
      {
        code: 'AEC2',
        name: 'RCA & quality analytics',
        objective: 'Structure historical data to automate Root Cause Analysis and target continuous improvement.',
        did: [
          'Engineered automated ingestion workflows to replace manual legacy tracking.',
          'Structured historical non-conformance records to isolate recurring baseline failure modes.',
          'Defined KPIs to build decision-oriented visualizations for Cost of Non-Quality (CoNQ) tracking.',
        ],
        telemetry: [
          { label: 'Output', value: 'RCA + CoNQ KPIs' },
          { label: 'Impact', value: 'traceability to resolution' },
          { label: 'Mode', value: 'planned milestones' },
        ],
        before: 'Manual consolidation and slow reporting',
        after: 'Automated analytics highlighting systemic issues',
      },
    ],
  },
  {
    id: 'green',
    title: 'Mission II — Green Praxis',
    meta: 'Cloud & Data Engineer • Jan 2025 – Aug 2025 • Aix-en-Provence',
    profile:
      'Owning the cloud, data-engineering, and monitoring layers that transform satellite imagery into on-demand map tiles and environmental KPIs via a single internal API.',
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
        name: 'Geospatial pipelines & dynamic tiles',
        objective: 'Automate STAC ingest and serve map tiles dynamically with low latency.',
        did: [
          'Built 15+ Airflow DAGs for STAC ingestion (Sentinel/Landsat), reprojection, and raster generation.',
          'Re-architected the legacy static service into an on-demand FastAPI gateway backed by Google Earth Engine.',
          'Reduced API P95 latency by 63% and cut the storage footprint by 80% via dynamic rendering and caching.',
        ],
        telemetry: [
          { label: 'Throughput', value: 'x6 ingestion speed' },
          { label: 'Storage', value: '−80% footprint' },
          { label: 'Latency', value: 'P95 cut to 220ms' },
        ],
        before: 'Static tiles with heavy storage overhead',
        after: 'On-demand GEE rendering with Redis caching',
      },
      {
        code: 'G2',
        name: 'Observability & IaC delivery',
        objective: 'Ensure >98% pipeline SLA and reduce developer toil through GitOps.',
        did: [
          'Deployed Prometheus and Grafana via Helm, covering 95% of critical cluster and API paths.',
          'Built reusable Terraform modules for VPCs, least-privilege IAM, and EKS clusters with demand-based node auto-scaling.',
          'Set up GitHub Actions for automated linting, testing, Docker builds, and Helm upgrades.',
        ],
        telemetry: [
          { label: 'Dashboards', value: '24 active views' },
          { label: 'Alerts', value: '35 automated rules' },
          { label: 'Infra', value: 'EKS Auto-scaling + Actions' },
        ],
        before: 'Blind spots and manual ad-hoc scripts',
        after: 'Proactive alerting and repeatable GitOps paths',
      },
    ],
  },
  {
    id: 'airbus',
    title: 'Mission III — Airbus SAS',
    meta: 'Data Engineer • Jan 2023 – Jun 2024 • Toulouse',
    profile:
      'Standardized global HR reporting workflows and defined the data-flow architecture and pipeline constraints for the OPTIMATE automated taxiing program.',
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
        name: 'Workforce reporting automation',
        objective: 'Standardize heterogeneous regional HR sources into a reliable, automated data store.',
        did: [
          'Designed a unified reporting model to consolidate HR data across five global regions.',
          'Automated validation and quality checks, reducing manual data-entry errors by 90%.',
          'Templatized dashboard deployments, slashing release times from one week to a single day.',
        ],
        telemetry: [
          { label: 'Deploy time', value: '−80%' },
          { label: 'Entry errors', value: '−90%' },
          { label: 'Regions', value: '5 global sources' },
        ],
        before: 'Fragmented flows and manual release steps',
        after: 'Standardized automated dashboards with SLAs',
      },
      {
        code: 'A2',
        name: 'OPTIMATE exchange experience',
        objective: 'Define the data-flow architecture and supporting pipeline for automated taxiing analytics.', //[cite: 1]
        did: [
          'Mapped data producers, consumers, constraints, and latency targets.', //[cite: 1]
          'Designed the end-to-end data-flow architecture with clear interfaces and SLAs.', //[cite: 1]
          'Added documentation and monitoring to support handover.', //[cite: 1]
        ],
        telemetry: [
          { label: 'Scope', value: 'data-flow architecture' }, //[cite: 1]
          { label: 'Mode', value: 'exchange experience' }, 
          { label: 'Ops', value: 'monitoring + handover' }, //[cite: 1]
        ],
        before: 'Unclear interface and latency assumptions',
        after: 'Documented architecture and operational pipeline', //[cite: 1]
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
        name: 'Error taxonomy & alerting',
        objective: 'Scale the platform with log volume and surface hidden failure patterns.',
        did: [
          'Architected modular components and parsers to handle complex log volumes.',
          'Defined an error taxonomy and mapped automated alerting directly to service owners.',
          'Refined requirements with clients and closed feedback loops to align success metrics.',
        ],
        telemetry: [
          { label: 'Discovery', value: '50+ error types' },
          { label: 'Uptime', value: 'improved metrics' },
          { label: 'Resolution', value: 'faster RCA' },
        ],
        before: 'Raw logs and uncategorized errors',
        after: 'Actionable alerts tied to accountability',
      },
      {
        code: 'M2',
        name: 'Engineering hygiene & delivery',
        objective: 'Raise engineering standards while delivering the analysis platform on schedule.',
        did: [
          'Mentored a 3-person team, planning sprints and development milestones.',
          'Enforced strict engineering hygiene, including code reviews, automated tests, and CI.',
          'Built automated deployment paths to ensure modular components were released safely.',
        ],
        telemetry: [
          { label: 'Delivery', value: 'on schedule' },
          { label: 'Hygiene', value: 'reviews + CI' },
          { label: 'Team', value: '3 members' },
        ],
        before: 'Ad-hoc development processes',
        after: 'Automated deployments and strict CI',
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
          'Developed object-detection and facial-recognition modules in C++ and Python.',
          'Scaled processing to 400+ live streams utilizing Nvidia DeepStream, CUDA, and TensorRT.',
          'Optimized C++ memory efficiency, achieving a 30% gain in processing throughput.',
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
          { label: 'Testing', value: 'automated coverage' },
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
    title: 'Mission VI — UrbanSeller',
    meta: 'Freelance Full-Stack Developer • Jun 2020 – Feb 2021 • Beirut',
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