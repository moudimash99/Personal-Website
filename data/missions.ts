import { Rocket, Satellite, Activity, Plane, Cpu, BriefcaseBusiness } from 'lucide-react'

export const missions = [
  {
    id: 'airbus-electric-center',
    title: 'Mission I — Airbus Electric Center',
    meta: 'Systems Engineering & Quality Intern • Apr 2026 – Present • Toulouse',
    profile:
      'Driving Non-Conformance reduction and Cost of Non-Quality tracking by converting legacy quality workflows into a Skywise data model with traceability, analytics, and governance.',
    icon: Plane,
    operations: [
      {
        code: 'AEC1',
        name: 'Legacy workflow mapping',
        objective: 'Elicit quality-data needs and map the current non-conformance workflow end to end.',
        did: [
          'Collected stakeholder requirements from quality and engineering teams.',
          'Mapped the existing tracking workflow and isolated recurring data gaps.',
          'Structured historic records so failure modes can be compared consistently.',
        ],
        telemetry: [
          { label: 'Focus', value: 'requirements + traceability' },
          { label: 'Data', value: 'historic NC records' },
          { label: 'Status', value: 'in progress' },
        ],
        before: 'Fragmented trackers and partial visibility',
        after: 'Baseline architecture and a shared analysis path',
      },
      {
        code: 'AEC2',
        name: 'Skywise quality analytics',
        objective: 'Prepare the migration and reporting layer for automated RCA and CoNQ analysis.',
        did: [
          'Designed the migration path into Skywise as a single source of truth.',
          'Defined analytical categories for non-conformances and RCA reporting.',
          'Outlined KPI definitions to support corrective and preventive actions.',
        ],
        telemetry: [
          { label: 'Platform', value: 'Skywise' },
          { label: 'Output', value: 'RCA + CoNQ KPIs' },
          { label: 'Mode', value: 'planned' },
        ],
        before: 'Manual consolidation and slow reporting cycles',
        after: 'Automated analytics with clearer governance',
      },
    ],
  },
  {
    id: 'green',
    title: 'Mission II — Green Praxis',
    meta: 'Cloud & Data Engineer • Jan 2025 – Present • Aix-en-Provence',
    profile:
      'Own cloud, data-engineering, and monitoring layers that transform satellite imagery into on-demand map tiles and environmental KPIs via a single internal API.',
    icon: Satellite,
    operations: [
      {
        code: 'G1',
        name: 'Geo pipelines and dynamic tiles',
        objective: 'Automate satellite imagery ingest and serve map tiles dynamically instead of pre-rendering everything.',
        did: [
          'Built and maintained Airflow DAGs for STAC ingest, download, reprojection, mosaicking, and raster product generation.',
          'Shifted tile serving to an on-demand Google Earth Engine backend with Redis caching.',
          'Reduced storage footprint and made map refresh cycles far faster.',
        ],
        telemetry: [
          { label: 'DAGs', value: '15+' },
          { label: 'Storage', value: '−80%' },
          { label: 'Refresh', value: '<30 min' },
        ],
        before: 'Static tiles and heavy storage overhead',
        after: 'On-demand tiles with defensive caching',
      },
      {
        code: 'G2',
        name: 'Observability and alerting',
        objective: 'Provide end-to-end visibility across DAGs, APIs, and the Kubernetes cluster.',
        did: [
          'Deployed Prometheus and Grafana via Helm and instrumented the main services.',
          'Connected dashboards and alerts to the most critical Airflow, API, and cluster paths.',
          'Authored runbooks and tuned alerts to reduce noise.',
        ],
        telemetry: [
          { label: 'Dashboards', value: '24' },
          { label: 'Alerts', value: '35' },
          { label: 'Coverage', value: '95%' },
        ],
        before: 'Fragmented monitoring and delayed detection',
        after: 'Actionable telemetry with clear ownership',
      },
      {
        code: 'G3',
        name: 'Infrastructure and delivery hygiene',
        objective: 'Reduce developer toil and make the platform easier to evolve.',
        did: [
          'Built reusable Terraform modules for VPC, EKS, versioned S3 buckets, and least-privilege IAM.',
          'Set up GitHub Actions for lint, test, build, Docker push, and Helm upgrade flows.',
        ],
        telemetry: [
          { label: 'Infra', value: 'reusable modules' },
          { label: 'Delivery', value: 'GitHub Actions' },
        ],
        before: 'Ad-hoc scripts and manual deployments',
        after: 'Reusable infra and repeatable release paths',
      },
    ],
  },
  {
    id: 'airbus',
    title: 'Mission III — Airbus SAS',
    meta: 'Data Engineer • Jan 2023 – Jun 2024 • Toulouse',
    profile:
      'Standardized HR reporting and led an OPTIMATE exchange project by designing reliable data flows, operational dashboards, and deployment paths.',
    icon: Rocket,
    operations: [
      {
        code: 'A1',
        name: 'Workforce dashboards and HR reporting',
        objective: 'Standardize reporting across regions and reduce manual data handling.',
        did: [
          'Consolidated heterogeneous HR sources into a coherent data store.',
          'Automated validation, packaging, and release steps for dashboard deployments.',
          'Defined reporting metrics and handover logic with HR stakeholders.',
        ],
        telemetry: [
          { label: 'Deploy time', value: '−80%' },
          { label: 'Entry errors', value: '−90%' },
          { label: 'Regions', value: '5' },
        ],
        before: 'Regional variation and manual release steps',
        after: 'Standardized, reliable reporting flows',
      },
      {
        code: 'A2',
        name: 'OPTIMATE exchange experience',
        objective: 'Define the data-flow architecture and supporting pipeline for automated taxiing analytics.',
        did: [
          'Mapped data producers, consumers, constraints, and latency targets.',
          'Designed the end-to-end data-flow architecture with clear interfaces and SLAs.',
          'Added monitoring and documentation to support handover.',
        ],
        telemetry: [
          { label: 'Scope', value: 'data-flow architecture' },
          { label: 'Mode', value: 'exchange' },
          { label: 'Ops', value: 'monitoring + handover' },
        ],
        before: 'Unclear interface and latency assumptions',
        after: 'Documented architecture and operational pipeline',
      },
    ],
  },
  {
    id: 'murex',
    title: 'Mission IV — Murex Systems',
    meta: 'Project Manager • May 2021 – Jan 2022 • Beirut',
    profile:
      'Delivered a log-analysis demonstrator for a high-frequency trading platform, shipping an MVP on time with a small team.',
    icon: Activity,
    operations: [
      {
        code: 'M1',
        name: 'Log-analysis PoC',
        objective: 'Detect unseen error patterns quickly to accelerate root-cause analysis.',
        did: [
          'Led a 3-person Scrum team and shaped the Python pipeline for parsing and clustering anomalies.',
          'Iterated with users until the output was directly actionable for troubleshooting.',
        ],
        telemetry: [
          { label: 'Discovery', value: '>50 patterns' },
          { label: 'Speed', value: 'faster troubleshooting' },
          { label: 'Delivery', value: 'on time' },
        ],
        before: 'Long hunts over raw logs',
        after: 'Ranked signals with clear context',
      },
      {
        code: 'M2',
        name: 'MVP delivery in K8s',
        objective: 'Package and deploy the MVP in a modern, reproducible environment.',
        did: [
          'Containerized services with Docker and Kubernetes and used Jenkins for CI.',
          'Wrote pragmatic runbooks and tightened the review and test cadence.',
        ],
        telemetry: [
          { label: 'Repro.', value: 'one-command spins' },
          { label: 'Velocity', value: 'faster iteration' },
          { label: 'Stability', value: 'fewer env issues' },
        ],
        before: 'Snowflake environments',
        after: 'Standardized containers + CI',
      },
    ],
  },
  {
    id: 'zaka',
    title: 'Mission V — ZAKA',
    meta: 'AI Pipeline Developer • Feb 2021 – Apr 2021 • Beirut',
    profile: 'Built and optimized a multi-camera computer-vision pipeline on Nvidia DeepStream with GPU acceleration and CI/CD.',
    icon: Cpu,
    operations: [
      {
        code: 'Z1',
        name: 'Real-time CV pipeline',
        objective: 'Scale processing to hundreds of concurrent camera streams.',
        did: [
          'Developed object-detection, facial-recognition, and anomaly-detection modules in C++ and Python.',
          'Optimized the pipeline for throughput and memory efficiency.',
          'Supported collaboration on Nvidia-sponsored work with CUDA and TensorRT.',
        ],
        telemetry: [
          { label: 'Streams', value: '400+' },
          { label: 'Efficiency', value: '+30%' },
          { label: 'Latency', value: 'low' },
        ],
        before: 'CPU-heavy processing and fragile integration',
        after: 'GPU-accelerated, low-latency inference pipeline',
      },
      {
        code: 'Z2',
        name: 'Testing and delivery hygiene',
        objective: 'Make the computer-vision stack safer to release.',
        did: [
          'Established automated unit, integration, and stress tests.',
          'Maintained CI/CD for zero-downtime deployments.',
          'Documented the architecture and benchmarked the main paths.',
        ],
        telemetry: [
          { label: 'Testing', value: 'automated' },
          { label: 'Deploys', value: 'zero downtime' },
        ],
        before: 'Manual release risk',
        after: 'Repeatable delivery with guardrails',
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
    operations: [
      {
        code: 'T1',
        name: 'Order-management platform',
        objective: 'Support real-time inventory and transaction handling for a high-volume workflow.',
        did: [
          'Designed and implemented the backend and REST APIs for orders, inventory, and payments.',
          'Built the Angular UI with dynamic forms and live data.',
          'Used SQL tuning, Swagger, Postman, and Azure DevOps to harden delivery.',
        ],
        telemetry: [
          { label: 'Transactions', value: 'thousands/day' },
          { label: 'Automation', value: '70% less manual work' },
          { label: 'Cloud', value: 'Azure' },
        ],
        before: 'Manual order handling and fragmented flows',
        after: 'Responsive platform with live inventory sync',
      },
      {
        code: 'T2',
        name: 'Security and release automation',
        objective: 'Make the platform safer and easier to deploy.',
        did: [
          'Implemented authentication, MFA, and encryption in transit and at rest.',
          'Automated builds and deployments in Azure DevOps.',
          'Documented the APIs and operational steps for handover.',
        ],
        telemetry: [
          { label: 'Security', value: 'MFA + encryption' },
          { label: 'Delivery', value: 'CI/CD' },
        ],
        before: 'Manual releases and lower confidence',
        after: 'Repeatable deployments with documented APIs',
      },
    ],
  },
] as const