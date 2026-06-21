export const profile = {
  name: 'MACHAKA Mohammad',
  headline: 'System Engineer',
  location: 'Toulouse, France',
  email: 'machaka.mohammad@gmail.com',
  phone: '+33 7 53 37 78 23',
  address: '39 allee d\'ancely 31300 Toulouse',
  linkedinLabel: 'Mohammad Machaka',
  linkedinUrl: 'https://linkedin.com/in/mohammad-machaka-a63685172',
  cvUrl: '/cv.pdf',
  introLines: [
    'Systems-minded software and cloud engineer transitioning into Systems Engineering through the ISAE-SUPAERO Mastère Spécialisé SEN (2025-2026), with AWS Certified Solutions Architect Associate (SAA-C03) credentials.',
    'I design and evolve data-intensive, real-time platforms with clear interfaces, measurable SLOs, and strong observability, bridging MBSE thinking with hands-on delivery across AWS, Kubernetes, Terraform, and C++, Python, and TypeScript stacks.',
    'Recent work spans Skywise quality workflows, geospatial and Earth-observation pipelines, and mission-style systems projects where requirements, interfaces, verification, and operational telemetry all matter.',
  ],
  highlights: [
    { label: 'Systems engineering', value: 'ISAE-SUPAERO SEN' },
    { label: 'Cloud / DevOps', value: 'AWS, Kubernetes, Terraform' },
    { label: 'Data / Geo', value: 'Airflow, STAC, Rasterio, GDAL' },
    { label: 'Certifications', value: 'ASEP + AWS SAA-C03' },
  ],
} as const