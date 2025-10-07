import { Rocket, Satellite, Activity } from 'lucide-react'

export const missions = [
  {
    id: 'airbus',
    title: 'Mission I — Airbus',
    meta: 'Data Engineer • Jan 2023 – Jun 2024 • Toulouse',
    profile: 'Minimise deployment time for analytics and move high-throughput data reliably for the OPTIMATE autonomous-taxiing programme.',
    icon: Rocket,
    operations: [
      {
        code: 'A1',
        name: 'OPTIMATE Streams',
        objective: 'Feed autonomous taxiing with reliable, low-latency streams under high load.',
        did: [
          'Implemented C++ stream components sustaining ~2 GB/s under test.',
          'Designed predictable backpressure + bounded queues.',
          'Added scriptable replay paths; wrote integration notes for downstream teams.',
        ],
        telemetry: [
          { label: 'Throughput', value: '~2 GB/s' },
          { label: 'Stability', value: 'clean failure modes' },
          { label: 'Repro.', value: 'deterministic replays' },
        ],
        before: 'Ad-hoc ingestion, uncertain behavior under load',
        after: 'Single, documented ingestion path with known limits',
      },
      {
        code: 'A2',
        name: 'Dashboard Deployment Acceleration',
        objective: 'Reduce time-to-deploy dashboards by eliminating manual ETL steps.',
        did: [
          'Built Python ETL automation and standardized data contracts.',
          'Packaged deployment scripts for consistent releases across teams.',
        ],
        telemetry: [
          { label: 'Lead-time', value: '−80%' },
          { label: 'Consistency', value: 'fewer manual steps' },
        ],
        before: 'Snowflake releases, regional variation',
        after: 'Reproducible, scripted deployments',
      },
      {
        code: 'A3',
        name: 'HR Data Unification',
        objective: 'Improve HR data accuracy across 5 regions for downstream dashboards.',
        did: [
          'Integrated datasets; reconciled schemas; added idempotent transforms.',
          'Surfaced diffs for quick fixes; documented schema versions and ownership.',
        ],
        telemetry: [
          { label: 'Coverage', value: '5 regions' },
          { label: 'Quality', value: 'fewer reconciliation issues' },
        ],
        before: 'Fragmented sources, inconsistent KPIs',
        after: 'Unified feeds with clearer ownership',
      },
    ],
  },
  {
    id: 'green',
    title: 'Mission II — Green Praxis',
    meta: 'Cloud & Data Engineer • Jan 2025 – Present • Aix-en-Provence',
    profile: 'Build reliable data infrastructure and internal tooling for environmental & geospatial products.',
    icon: Satellite,
    operations: [
      {
        code: 'G1',
        name: 'Geo Pipelines & Dynamic Tiles',
        objective: 'Automate multi-band satellite imagery ingest and serve dynamic, reliable map tiles.',
        did: [
          'Designed Airflow DAGs for ingest/transform; versioned data contracts.',
          'Shifted serving to dynamic Google Earth Engine backend; added guardrail checks.',
        ],
        telemetry: [
          { label: 'Iteration', value: 'ships faster' },
          { label: 'Repro.', value: 'repeatable runs' },
          { label: 'UX', value: 'reduced lag' },
        ],
        before: 'Manual/semi-manual tiling, drift between runs',
        after: 'Airflow-managed processing + dynamic serving',
      },
      {
        code: 'G2',
        name: 'Observability Rollout',
        objective: 'Provide end-to-end visibility across DAGs, APIs, and the Kubernetes cluster.',
        did: [
          'Deployed Prometheus + Grafana; standardized labels/owners; pruned noisy alerts.',
          'Integrated Airflow task metrics and API latency/error budgets into a single view.',
        ],
        telemetry: [
          { label: 'Alert cov.', value: '≈95%' },
          { label: 'Awareness', value: 'faster MTTR' },
          { label: 'Clarity', value: 'owners + runbooks' },
        ],
        before: 'Fragmented monitoring, key failure modes missed',
        after: 'Unified dashboards; actionable alerts',
      },
      {
        code: 'G3',
        name: 'Internal Tooling & Platform Hygiene',
        objective: 'Reduce developer toil; make pipelines easier to evolve.',
        did: [
          'Templated DAG patterns; small CLI helpers for common ops.',
          'Tightened Terraform modules for repeatable infra.',
        ],
        telemetry: [
          { label: 'Toil', value: 'reduced' },
          { label: 'Speed', value: 'smoother onboarding' },
        ],
        before: 'Ad-hoc scripts',
        after: 'Reusable templates & helpers',
      },
    ],
  },
  {
    id: 'murex',
    title: 'Mission III — Murex Systems',
    meta: 'Project Manager • May 2021 – Jan 2022 • Beirut',
    profile: 'Deliver a log-analysis demonstrator for a high-frequency trading platform, shipping an MVP on time with a small team.',
    icon: Activity,
    operations: [
      {
        code: 'M1',
        name: 'Log-Analysis PoC (HFT)',
        objective: 'Detect unseen error patterns quickly to accelerate root-cause analysis.',
        did: [
          'Led a 3-developer Scrum team; Python pipeline to parse/cluster anomalies.',
          'Iterated with users for actionable output.',
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
        name: 'MVP Delivery in K8s',
        objective: 'Package and deploy the MVP in a modern, reproducible environment.',
        did: [
          'Containerised services (Docker); orchestrated with Kubernetes; CI on Jenkins.',
          'Wrote a pragmatic runbook.',
        ],
        telemetry: [
          { label: 'Repro.', value: 'one-command spins' },
          { label: 'Velocity', value: 'faster iteration' },
          { label: 'Stability', value: 'fewer env issues' },
        ],
        before: 'Snowflake environments',
        after: 'Standardised containers + CI',
      },
    ],
  },
] as const