import { JobOpening, CandidateProfile, RequirementEvidenceItem, InterviewSession, EvaluationReport, AuditTrailEntry } from '../types';

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Backend Engineer (Distributed Systems)',
    department: 'Platform Engineering',
    experienceRequired: '4–6 years',
    location: 'San Francisco, CA (Hybrid)',
    employmentType: 'Full-time',
    createdAt: '2026-09-10T14:30:00Z',
    status: 'Active',
    candidateCount: 24,
    description: `About the Role:
We are looking for a Senior Backend Engineer to architect, build, and operate resilient distributed services. You will design high-throughput data processing pipelines, optimize relational and caching tiers, and ensure 99.99% system availability.

Key Responsibilities:
- Design, implement, and maintain high-performance microservices using Python or Go.
- Architect distributed event streams with Kafka and optimize PostgreSQL database schemas.
- Ensure fault tolerance, automated failover, and comprehensive observability across microservices.
- Lead architecture design reviews and mentor mid-level engineers in distributed systems patterns.

Required Qualifications:
- 4+ years of professional backend software engineering experience.
- Deep expertise in Python (FastAPI/asyncio) or Go.
- Production experience with PostgreSQL query optimization, connection pooling, and schema migration.
- Strong grounding in distributed systems concepts: idempotency, consensus, distributed caching, and CAP theorem trade-offs.

Preferred Qualifications:
- Experience deploying and orchestrating container workloads on Kubernetes.
- Familiarity with Kafka partition rebalancing, Dead Letter Queues (DLQ), and consumer groups.
- Hands-on experience with Redis caching strategies and distributed locking patterns.`,
    structuredRequirements: {
      requiredSkills: ['Python (asyncio / FastAPI)', 'Distributed Systems Design', 'PostgreSQL Query Optimization', 'REST & gRPC API Design'],
      preferredSkills: ['Apache Kafka', 'Kubernetes Orchestration', 'Redis Distributed Caching', 'AWS / Cloud Infrastructure'],
      experienceRequirements: ['4+ years professional backend engineering', 'Production scale > 10,000 req/sec'],
      responsibilities: [
        'Design and deploy resilient microservices',
        'Architect high-throughput event streaming pipelines',
        'Optimize relational database performance and indexing',
        'Lead architectural design reviews and mentor team members'
      ],
      evaluationAreas: [
        { category: 'Distributed Architecture', description: 'Handling idempotency, failure domains, and eventual consistency.' },
        { category: 'Data Engineering & Performance', description: 'Database query execution plans, connection pool sizing, and caching.' },
        { category: 'Code Craft & Reliability', description: 'Automated test discipline, telemetry tracing, and clean service abstractions.' },
        { category: 'Technical Communication & Leadership', description: 'Clear design docs, trade-off analysis, and cross-team collaboration.' }
      ]
    }
  },
  {
    id: 'job-2',
    title: 'Machine Learning Engineer (LLM & GenAI)',
    department: 'AI Research & Platform',
    experienceRequired: '3–5 years',
    location: 'Remote (US)',
    employmentType: 'Full-time',
    createdAt: '2026-09-12T09:15:00Z',
    status: 'Active',
    candidateCount: 19,
    description: `We are seeking an ML Engineer to build production retrieval-augmented generation (RAG) pipelines, evaluation harnesses, and model fine-tuning workflows for enterprise recruitment intelligence.

Responsibilities:
- Build low-latency RAG architectures using vector databases and hybrid keyword/dense search.
- Implement automated model evaluation suites (hallucination detection, factual grounding, latency benchmarking).
- Fine-tune and distill open-source models for specialized entity extraction and semantic classification.

Required Skills:
- Strong Python proficiency with PyTorch or JAX.
- Hands-on experience deploying LLM endpoints (vLLM, Ollama, TensorRT-LLM) in production.
- Vector database operations (Qdrant, Pinecone, pgvector).
- Solid understanding of embedding spaces, chunking strategies, and reranking models.`,
    structuredRequirements: {
      requiredSkills: ['Python & PyTorch', 'RAG Pipeline Architecture', 'Vector Databases (pgvector, Qdrant)', 'LLM Evaluation & Grounding'],
      preferredSkills: ['vLLM / TensorRT-LLM', 'Model Fine-tuning (LoRA / QLoRA)', 'FastAPI Microservices', 'Docker & Kubernetes'],
      experienceRequirements: ['3+ years in Applied ML / NLP', '1+ years hands-on production GenAI application delivery'],
      responsibilities: [
        'Architect low-latency enterprise RAG pipelines',
        'Develop automated hallucination benchmark test suites',
        'Optimize model inference speed and memory footprint'
      ],
      evaluationAreas: [
        { category: 'GenAI & RAG Mechanics', description: 'Deep understanding of context windows, retrieval strategies, and prompt steering.' },
        { category: 'ML Systems Engineering', description: 'Serving low-latency inference, batching requests, and GPU utilization.' },
        { category: 'Scientific Rigor & Evaluation', description: 'Precision/recall metrics, automated judge models, and ground truth validation.' }
      ]
    }
  },
  {
    id: 'job-3',
    title: 'Staff Frontend Engineer (Design Systems)',
    department: 'Product Experience',
    experienceRequired: '6+ years',
    location: 'New York, NY (Hybrid)',
    employmentType: 'Full-time',
    createdAt: '2026-09-15T11:00:00Z',
    status: 'Active',
    candidateCount: 15,
    description: `Lead our frontend architecture and design system. You will build accessible, high-performance UI components, ensure sub-100ms interaction latency, and empower cross-functional teams with robust developer tooling.`,
    structuredRequirements: {
      requiredSkills: ['TypeScript', 'React 19 & Next.js/Vite', 'Design System Architecture', 'Web Performance & Accessibility (WCAG AAA)'],
      preferredSkills: ['Tailwind CSS v4', 'Motion / Animation Engineering', 'Micro-frontends', 'State Machines (XState)'],
      experienceRequirements: ['6+ years professional frontend engineering', 'Proven track record leading multi-package design systems'],
      responsibilities: [
        'Maintain and expand core component library',
        'Drive accessibility standards across all product views',
        'Collaborate closely with product design on ergonomic component primitives'
      ],
      evaluationAreas: [
        { category: 'Component Architecture', description: 'Composable APIs, headless primitives, and token hierarchies.' },
        { category: 'Performance & Bundle Optimization', description: 'Tree-shaking, code splitting, layout shift prevention.' },
        { category: 'Accessibility & Standards', description: 'Keyboard navigation traps, ARIA roles, color contrast compliance.' }
      ]
    }
  },
  {
    id: 'job-4',
    title: 'Cloud Infrastructure & SRE Lead',
    department: 'DevOps & Platform',
    experienceRequired: '5–8 years',
    location: 'Remote',
    employmentType: 'Full-time',
    createdAt: '2026-09-16T16:20:00Z',
    status: 'Active',
    candidateCount: 12,
    description: `Manage multi-region GCP/AWS infrastructure, zero-trust network boundaries, CI/CD automation, and disaster recovery runbooks.`,
    structuredRequirements: {
      requiredSkills: ['Terraform / OpenTofu', 'Kubernetes Cluster Administration', 'Observability (Prometheus, Grafana, OpenTelemetry)', 'GCP / AWS Multi-cloud'],
      preferredSkills: ['eBPF Network Debugging', 'GitOps with ArgoCD', 'FinOps Cloud Cost Optimization', 'Disaster Recovery Automation'],
      experienceRequirements: ['5+ years dedicated infrastructure / SRE experience'],
      responsibilities: [
        'Ensure 99.99% multi-region uptime',
        'Enforce least-privilege IAM policies and secret rotations',
        'Automate continuous deployment pipelines with zero-downtime rollouts'
      ],
      evaluationAreas: [
        { category: 'Infrastructure as Code', description: 'Declarative module design, drift detection, and state locking.' },
        { category: 'Incident Management & Resiliency', description: 'Root cause analysis, blameless post-mortems, and on-call hygiene.' }
      ]
    }
  },
  {
    id: 'job-5',
    title: 'Lead Security & DevSecOps Architect',
    department: 'Cybersecurity & Trust',
    experienceRequired: '6–9 years',
    location: 'San Francisco, CA / Remote',
    employmentType: 'Full-time',
    createdAt: '2026-09-18T10:00:00Z',
    status: 'Active',
    candidateCount: 8,
    description: `Drive end-to-end cloud security posture, container runtime protection, automated compliance audits (SOC2/ISO 27001), and threat modeling across our distributed AI recruitment platform.`,
    structuredRequirements: {
      requiredSkills: ['Zero Trust Network Architecture', 'Cloud Security Posture Management (CSPM)', 'Kubernetes Runtime Defense (Falco, Cilium)', 'Threat Modeling & Penetration Testing'],
      preferredSkills: ['SOC2 / ISO 27001 Audit Leadership', 'Open Policy Agent (OPA / Gatekeeper)', 'Cryptography & HSM Integration', 'Software Supply Chain Security (Sigstore / SLSA)'],
      experienceRequirements: ['6+ years dedicated application security or DevSecOps leadership'],
      responsibilities: [
        'Architect defense-in-depth security perimeter across AWS/GCP workloads',
        'Embed automated SAST/DAST and container vulnerability scans in CI/CD',
        'Conduct red-team penetration tests and incident response drills'
      ],
      evaluationAreas: [
        { category: 'Threat Modeling & Architecture', description: 'Identifying attack vectors across multi-tenant AI pipelines and storage.' },
        { category: 'Regulatory Compliance & Governance', description: 'Enforcing SOC2 Type II, GDPR, and ISO 27001 evidence trails.' }
      ]
    }
  },
  {
    id: 'job-6',
    title: 'Principal AI Product Manager',
    department: 'Product Management',
    experienceRequired: '5–8 years',
    location: 'Seattle, WA (Hybrid)',
    employmentType: 'Full-time',
    createdAt: '2026-09-19T13:40:00Z',
    status: 'Active',
    candidateCount: 10,
    description: `Define the future of ethical recruitment AI products. Lead discovery, evaluation metrics, recruiter usability studies, and enterprise governance features.`,
    structuredRequirements: {
      requiredSkills: ['Enterprise SaaS Product Management', 'AI / ML Product Lifecycle', 'Quantitative Data & KPI Modeling', 'Customer Discovery & User Research'],
      preferredSkills: ['Recruitment Tech / HRTech Domain Knowledge', 'Ethical AI & Bias Mitigation Frameworks', 'API First Platform Strategy', 'Executive Stakeholder Alignment'],
      experienceRequirements: ['5+ years in enterprise product management with 2+ years leading AI products'],
      responsibilities: [
        'Author product requirement documents (PRDs) with clear ethical guardrails',
        'Partner with ML research team on model evaluation and accuracy trade-offs',
        'Drive customer discovery interviews with Fortune 500 talent acquisition leaders'
      ],
      evaluationAreas: [
        { category: 'Product Strategy & Vision', description: 'Balancing algorithmic automation with human-in-the-loop decision primacy.' },
        { category: 'Execution & Discovery', description: 'Synthesizing complex enterprise feedback into iterative roadmap milestones.' }
      ]
    }
  }
];

export const INITIAL_CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand-1',
    jobId: 'job-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@techmail.io',
    phone: '+1 (415) 882-9012',
    location: 'San Francisco, CA',
    createdAt: '2026-09-16T10:30:00Z',
    status: 'Report Generated',
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        year: '2020',
        details: 'Dean’s Honors List, Distributed Systems & Database Systems Focus'
      }
    ],
    skills: [
      'Python', 'FastAPI', 'PostgreSQL', 'Distributed Systems', 'Kafka', 'Redis',
      'Docker', 'Go', 'gRPC', 'AWS ECS', 'Prometheus', 'SQLAlchemy'
    ],
    workExperience: [
      {
        role: 'Senior Backend Engineer',
        company: 'Veloce Financial Technologies',
        duration: '2023 - Present (3 years)',
        summary: 'Architected high-throughput ledger settlement services processing over 18,000 transactions/second.',
        achievements: [
          'Rewrote core transaction processing pipeline into asynchronous Python/FastAPI microservices, reducing p99 latency from 320ms to 42ms.',
          'Designed idempotency key mechanism across distributed payment workers, eliminating double-charge race conditions during failovers.',
          'Configured PostgreSQL multi-master read replicas with connection pooling via PgBouncer, sustaining a 3.5x traffic surge on Black Friday without connection drops.'
        ]
      },
      {
        role: 'Software Engineer II',
        company: 'TelemetryOps Cloud',
        duration: '2020 - 2023 (3 years)',
        summary: 'Developed real-time metrics ingestion pipelines and distributed alerting engine.',
        achievements: [
          'Engineered Kafka consumer groups with custom partition rebalance listeners, processing 4.2 billion log events daily.',
          'Built distributed Redis rate-limiter using token bucket algorithm and Lua scripts to prevent noisy-neighbor API abuse.'
        ]
      }
    ],
    projects: [
      {
        title: 'Distributed Double-Entry Ledger (Open Source)',
        description: 'A pure Python and Rust async ledger service implementing two-phase commit protocols and immutable audit logging.',
        techStack: ['Python 3.11', 'FastAPI', 'PostgreSQL', 'Docker']
      },
      {
        title: 'EventStreamer CLI',
        description: 'Benchmarking utility for testing Kafka topic partition lag and schema evolution compatibility.',
        techStack: ['Go', 'Kafka', 'Protobuf']
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect - Associate',
      'Confluent Certified Developer for Apache Kafka'
    ],
    technologies: ['Python', 'PostgreSQL', 'Kafka', 'Redis', 'Docker', 'Go', 'FastAPI', 'AWS'],
    achievements: [
      'Speaker at PyBay 2025: "Taming Distributed Race Conditions with Async Python"',
      'Top Contributor to open-source database connection pool benchmarks'
    ],
    evidenceMatchRate: {
      found: 7,
      partial: 2,
      missing: 0,
      requiresValidation: 0,
      total: 9
    }
  },
  {
    id: 'cand-2',
    jobId: 'job-1',
    name: 'Marcus Chen',
    email: 'marcus.chen@devcloud.net',
    phone: '+1 (408) 551-7290',
    location: 'San Jose, CA',
    createdAt: '2026-09-17T08:45:00Z',
    status: 'Evidence Mapped',
    education: [
      {
        degree: 'M.S. in Software Engineering',
        institution: 'San Jose State University',
        year: '2021',
        details: 'GPA 3.82'
      },
      {
        degree: 'B.S. in Information Systems',
        institution: 'Santa Clara University',
        year: '2019'
      }
    ],
    skills: ['Python', 'Django', 'Flask', 'PostgreSQL', 'MySQL', 'REST APIs', 'RabbitMQ', 'Docker', 'Linux'],
    workExperience: [
      {
        role: 'Backend Software Engineer',
        company: 'Apex Supply Systems',
        duration: '2021 - Present (4 years)',
        summary: 'Built inventory tracking and catalog REST APIs serving enterprise warehouse portals.',
        achievements: [
          'Migrated legacy monolith modules into modular Python/Django services with shared PostgreSQL database.',
          'Optimized slow warehouse inventory queries using composite indexes and materialized views, decreasing load times by 65%.'
        ]
      }
    ],
    projects: [
      {
        title: 'Warehouse Route Optimizer',
        description: 'Python routing service calculating optimal picker paths in physical fulfillment centers.',
        techStack: ['Python', 'Flask', 'PostgreSQL']
      }
    ],
    certifications: ['Not found in provided evidence.'],
    technologies: ['Python', 'Django', 'PostgreSQL', 'RabbitMQ', 'Docker'],
    achievements: ['Employee of the Quarter, Q2 2024'],
    evidenceMatchRate: {
      found: 4,
      partial: 3,
      missing: 2,
      requiresValidation: 0,
      total: 9
    }
  },
  {
    id: 'cand-3',
    jobId: 'job-2',
    name: 'Dr. Aisha Patel',
    email: 'aisha.patel.ai@nexusresearch.org',
    phone: '+1 (206) 914-3821',
    location: 'Seattle, WA',
    createdAt: '2026-09-17T14:10:00Z',
    status: 'Report Generated',
    education: [
      {
        degree: 'Ph.D. in Computer Science (NLP & Information Retrieval)',
        institution: 'University of Washington',
        year: '2023',
        details: 'Dissertation on Multi-Hop Question Answering and Context Compression'
      }
    ],
    skills: ['Python', 'PyTorch', 'Vector Databases', 'RAG Pipelines', 'LangChain', 'LlamaIndex', 'HuggingFace', 'FastAPI', 'Qdrant'],
    workExperience: [
      {
        role: 'Senior Machine Learning Scientist',
        company: 'Synthetica AI',
        duration: '2023 - Present (2.5 years)',
        summary: 'Led research and engineering of enterprise agentic search and retrieval-augmented generation systems.',
        achievements: [
          'Built production RAG system serving 1.2M queries/day with semantic chunking and reciprocal rank fusion (RRF).',
          'Tuned 7B open-source LLMs using LoRA on proprietary compliance corpora, increasing exact-match accuracy by 22%.'
        ]
      }
    ],
    projects: [
      {
        title: 'VeritasEval: Automated Hallucination Benchmark',
        description: 'Evaluation framework testing factual consistency of LLM summarization against source chunks.',
        techStack: ['Python', 'PyTorch', 'Qdrant', 'FastAPI']
      }
    ],
    certifications: ['Not found in provided evidence.'],
    technologies: ['Python', 'PyTorch', 'Qdrant', 'Transformers', 'FastAPI', 'Docker'],
    achievements: [
      'Published 3 papers at ACL & EMNLP on semantic retrieval and factual grounding',
      'Invited Keynote at Seattle AI Summit 2025'
    ],
    evidenceMatchRate: {
      found: 6,
      partial: 1,
      missing: 0,
      requiresValidation: 0,
      total: 7
    }
  },
  {
    id: 'cand-4',
    jobId: 'job-1',
    name: 'David Thorne',
    email: 'david.thorne.codes@gmail.com',
    phone: 'Not found in provided evidence.',
    location: 'Austin, TX',
    createdAt: '2026-09-18T11:20:00Z',
    status: 'Needs Review',
    education: [
      {
        degree: 'B.S. in Electrical Engineering',
        institution: 'University of Texas at Austin',
        year: '2022'
      }
    ],
    skills: ['Python', 'C++', 'Embedded Systems', 'SQL', 'FastAPI', 'Git'],
    workExperience: [
      {
        role: 'Firmware & Backend Engineer',
        company: 'AeroTelemetry Sensors',
        duration: '2022 - Present (3 years)',
        summary: 'Developed sensor data gathering daemon and companion Python ingestion server.',
        achievements: [
          'Built internal sensor calibration web API in Python/FastAPI with SQLite storage.',
          'Wrote C++ telemetry drivers streaming sensor packet bursts over UDP sockets.'
        ]
      }
    ],
    projects: [
      {
        title: 'CAN-Bus Packet Inspector',
        description: 'Desktop diagnostic tool decoding automotive CAN packets into structured JSON.',
        techStack: ['Python', 'PyQt', 'C++']
      }
    ],
    certifications: ['Not found in provided evidence.'],
    technologies: ['Python', 'C++', 'FastAPI', 'SQLite'],
    achievements: ['Not found in provided evidence.'],
    evidenceMatchRate: {
      found: 2,
      partial: 3,
      missing: 4,
      requiresValidation: 0,
      total: 9
    }
  },
  {
    id: 'cand-5',
    jobId: 'job-1',
    name: 'Vikram Malhotra',
    email: 'vikram.malhotra@syscraft.io',
    phone: '+1 (415) 309-8472',
    location: 'San Francisco, CA',
    createdAt: '2026-09-18T15:40:00Z',
    status: 'Interview Workspace',
    education: [
      {
        degree: 'M.S. in Computer Science',
        institution: 'Carnegie Mellon University',
        year: '2019',
        details: 'Distributed Systems & Parallel Computing Lab'
      },
      {
        degree: 'B.Tech in Computer Engineering',
        institution: 'IIT Bombay',
        year: '2017'
      }
    ],
    skills: ['Go', 'Rust', 'Distributed Systems Design', 'Raft Consensus', 'PostgreSQL Query Optimization', 'gRPC', 'Apache Kafka', 'Kubernetes Orchestration'],
    workExperience: [
      {
        role: 'Staff Distributed Systems Engineer',
        company: 'Chronos Distributed Storage',
        duration: '2022 - Present (4 years)',
        summary: 'Designed quorum replicated metadata consensus layer powering multi-tenant object storage.',
        achievements: [
          'Implemented custom Raft consensus state machine in Go handling 45,000 metadata commits/second with zero data corruption.',
          'Architected streaming gRPC mesh across 300+ edge nodes with bidirectional Protobuf backpressure.',
          'Engineered automatic PostgreSQL partition pruning and connection multiplexing, reducing storage IOPS by 55%.'
        ]
      },
      {
        role: 'Senior Systems Engineer',
        company: 'HyperScale Networks',
        duration: '2019 - 2022 (3 years)',
        summary: 'Maintained global traffic routing gateway and Kafka event bus.',
        achievements: [
          'Built Kafka topic mirror pipeline handling 12B telemetry events/day across US-East and EU-Central clusters.',
          'Authored Kubernetes custom controller (CRD) for automated database failover and leader re-election.'
        ]
      }
    ],
    projects: [
      {
        title: 'Raft-Go-Lite',
        description: 'Pedagogical, high-performance implementation of Raft consensus with automated log compaction.',
        techStack: ['Go', 'gRPC', 'Protobuf']
      }
    ],
    certifications: ['Certified Kubernetes Administrator (CKA)'],
    technologies: ['Go', 'Raft', 'gRPC', 'PostgreSQL', 'Kafka', 'Kubernetes', 'Linux'],
    achievements: ['Co-author of paper on deterministic Raft state verification presented at OSDI workshop'],
    evidenceMatchRate: {
      found: 8,
      partial: 1,
      missing: 0,
      requiresValidation: 0,
      total: 9
    }
  },
  {
    id: 'cand-6',
    jobId: 'job-2',
    name: 'Mateo Silva',
    email: 'mateo.silva.ml@tensorflow.dev',
    phone: '+1 (512) 674-1198',
    location: 'Austin, TX',
    createdAt: '2026-09-18T16:50:00Z',
    status: 'Interview Workspace',
    education: [
      {
        degree: 'M.S. in Machine Learning',
        institution: 'Georgia Institute of Technology',
        year: '2022'
      }
    ],
    skills: ['Python & PyTorch', 'vLLM / TensorRT-LLM', 'RAG Pipeline Architecture', 'Vector Databases (pgvector, Qdrant)', 'Model Fine-tuning (LoRA / QLoRA)', 'FastAPI', 'Docker & Kubernetes'],
    workExperience: [
      {
        role: 'Machine Learning Infrastructure Engineer',
        company: 'CognitiveScale Cloud',
        duration: '2022 - Present (4 years)',
        summary: 'Deployed and optimized high-throughput LLM inference clusters and RAG microservices.',
        achievements: [
          'Reduced time-to-first-token (TTFT) by 48% across Llama-3 endpoints by configuring vLLM continuous batching and speculative decoding.',
          'Built enterprise RAG pipeline over pgvector handling 800k document vector searches/day with hybrid BM25 + dense ranking.',
          'Fine-tuned Mistral-7B models via QLoRA on custom domain schemas, reducing parameter footprint to 16-bit integer quantization.'
        ]
      }
    ],
    projects: [
      {
        title: 'FlashInfer-Benchmark',
        description: 'Open-source benchmark tool comparing TensorRT-LLM and vLLM token throughput under varied prompt lengths.',
        techStack: ['Python', 'CUDA', 'vLLM', 'PyTorch']
      }
    ],
    certifications: ['NVIDIA Deep Learning Institute: Efficient LLM Inference'],
    technologies: ['Python', 'PyTorch', 'vLLM', 'Qdrant', 'pgvector', 'FastAPI', 'Docker'],
    achievements: ['Speaker at Austin ML Meetup on KV-cache memory optimization'],
    evidenceMatchRate: {
      found: 6,
      partial: 1,
      missing: 0,
      requiresValidation: 0,
      total: 7
    }
  },
  {
    id: 'cand-7',
    jobId: 'job-2',
    name: 'Chloe Bennett',
    email: 'chloe.bennett@berkeleyalumni.org',
    phone: '+1 (415) 762-3390',
    location: 'San Francisco, CA',
    createdAt: '2026-09-19T09:00:00Z',
    status: 'Evidence Mapped',
    education: [
      {
        degree: 'B.S. in Applied Mathematics & Computer Science',
        institution: 'UC Berkeley',
        year: '2021'
      }
    ],
    skills: ['Python & PyTorch', 'RAG Pipeline Architecture', 'Vector Databases (pgvector, Qdrant)', 'LLM Evaluation & Grounding', 'LangChain', 'LlamaIndex'],
    workExperience: [
      {
        role: 'Applied NLP Engineer',
        company: 'LexisIntelligence',
        duration: '2021 - Present (3.5 years)',
        summary: 'Developed semantic document discovery search and citation synthesis for legal corpora.',
        achievements: [
          'Built hybrid vector retrieval pipeline using Qdrant and Cross-Encoder rerankers, achieving 94.2% MRR@10.',
          'Created automated prompt regression testing suite evaluating hallucinations across 50,000 annotated benchmark questions.'
        ]
      }
    ],
    projects: [
      {
        title: 'PromptJudge',
        description: 'Automated evaluation framework utilizing LLM-as-a-judge patterns with chain-of-thought verification.',
        techStack: ['Python', 'Qdrant', 'FastAPI']
      }
    ],
    certifications: ['Not found in provided evidence.'],
    technologies: ['Python', 'PyTorch', 'Qdrant', 'LlamaIndex', 'FastAPI'],
    achievements: ['Won 1st Place at SF LegalTech Hackathon 2024'],
    evidenceMatchRate: {
      found: 5,
      partial: 1,
      missing: 1,
      requiresValidation: 0,
      total: 7
    }
  },
  {
    id: 'cand-8',
    jobId: 'job-3',
    name: 'Maya Lin',
    email: 'maya.lin.designsystem@gmail.com',
    phone: '+1 (917) 438-6019',
    location: 'New York, NY',
    createdAt: '2026-09-18T12:00:00Z',
    status: 'Report Generated',
    education: [
      {
        degree: 'B.S. in Human-Computer Interaction',
        institution: 'Carnegie Mellon University',
        year: '2019'
      }
    ],
    skills: ['TypeScript', 'React 19 & Next.js/Vite', 'Design System Architecture', 'Web Performance & Accessibility (WCAG AAA)', 'Tailwind CSS v4', 'Motion / Animation Engineering', 'Radix UI', 'Storybook'],
    workExperience: [
      {
        role: 'Lead Design Systems Engineer',
        company: 'Starlight Financial Platform',
        duration: '2022 - Present (4 years)',
        summary: 'Architected enterprise design system used by 180+ software engineers across 14 web products.',
        achievements: [
          'Engineered headless, accessible token primitives supporting multi-brand theming and zero runtime CSS overhead.',
          'Achieved 100% WCAG AAA accessibility compliance across all 65 design system components with zero keyboard traps.',
          'Reduced core web bundle size by 38% through tree-shakable ESM packaging and CSS containment optimization.'
        ]
      },
      {
        role: 'Senior Frontend Engineer',
        company: 'CanvasFlow Studio',
        duration: '2019 - 2022 (3 years)',
        summary: 'Built interactive visual analytics dashboards and animation libraries in React.',
        achievements: [
          'Engineered physics-based motion primitives using Motion and WebGL canvas, maintaining solid 60fps interaction rendering.'
        ]
      }
    ],
    projects: [
      {
        title: 'A11y-Tokens CLI',
        description: 'Automated linter checking color contrast ratios across dark/light mode token hierarchies during build time.',
        techStack: ['TypeScript', 'Node.js', 'PostCSS']
      }
    ],
    certifications: ['IAAP Certified Professional in Accessibility Core Competencies (CPACC)'],
    technologies: ['TypeScript', 'React 19', 'Tailwind CSS', 'Motion', 'Next.js', 'Storybook'],
    achievements: ['Keynote Speaker at React Advanced London 2025: "Mathematical Rigor in Design System Tokens"'],
    evidenceMatchRate: {
      found: 6,
      partial: 0,
      missing: 0,
      requiresValidation: 0,
      total: 6
    }
  },
  {
    id: 'cand-9',
    jobId: 'job-3',
    name: 'Jordan Vance',
    email: 'jordan.vance.frontend@protonmail.com',
    phone: '+1 (212) 890-4412',
    location: 'Brooklyn, NY',
    createdAt: '2026-09-18T14:30:00Z',
    status: 'Interview Workspace',
    education: [
      {
        degree: 'B.A. in Digital Arts & Computer Science',
        institution: 'New York University',
        year: '2021'
      }
    ],
    skills: ['TypeScript', 'React 19 & Next.js/Vite', 'Design System Architecture', 'Tailwind CSS v4', 'Web Performance & Accessibility (WCAG AAA)', 'Motion / Animation Engineering'],
    workExperience: [
      {
        role: 'Senior Frontend Developer',
        company: 'OmniBrand Interactive',
        duration: '2021 - Present (4 years)',
        summary: 'Developed modern web applications and component library for luxury retail clients.',
        achievements: [
          'Created modular React component catalog with Tailwind CSS and responsive design patterns.',
          'Integrated Motion layout transitions and page load animations, improving session dwell time by 24%.'
        ]
      }
    ],
    projects: [
      {
        title: 'FluidTransitions-React',
        description: 'Micro-library for seamless shared layout animations between parent cards and modal views.',
        techStack: ['TypeScript', 'React', 'Motion']
      }
    ],
    certifications: ['Not found in provided evidence.'],
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Motion'],
    achievements: ['Featured in Awwwards Site of the Day, March 2025'],
    evidenceMatchRate: {
      found: 4,
      partial: 2,
      missing: 0,
      requiresValidation: 0,
      total: 6
    }
  },
  {
    id: 'cand-10',
    jobId: 'job-4',
    name: 'Tariq Al-Mansoor',
    email: 'tariq.sre.cloud@gmail.com',
    phone: '+1 (312) 774-9023',
    location: 'Chicago, IL (Remote)',
    createdAt: '2026-09-17T11:15:00Z',
    status: 'Report Generated',
    education: [
      {
        degree: 'B.S. in Computer Engineering',
        institution: 'University of Illinois Urbana-Champaign',
        year: '2018'
      }
    ],
    skills: ['Terraform / OpenTofu', 'Kubernetes Cluster Administration', 'Observability (Prometheus, Grafana, OpenTelemetry)', 'GCP / AWS Multi-cloud', 'eBPF Network Debugging', 'GitOps with ArgoCD', 'FinOps Cloud Cost Optimization'],
    workExperience: [
      {
        role: 'Staff Site Reliability Engineer',
        company: 'CloudTransit Global',
        duration: '2022 - Present (4 years)',
        summary: 'Led multi-region infrastructure reliability across 12 Kubernetes clusters spanning AWS and GCP.',
        achievements: [
          'Maintained 99.995% uptime SLA for critical API gateways serving 85k requests/second.',
          'Migrated 400+ infrastructure resources to modular Terraform/OpenTofu with automated state locking and drift detection.',
          'Deployed Cilium eBPF service mesh for transparent mTLS encryption, replacing bulky sidecar proxies and saving $140k/yr in compute.'
        ]
      },
      {
        role: 'DevOps Engineer',
        company: 'Centric Data Corp',
        duration: '2018 - 2022 (4 years)',
        summary: 'Maintained continuous deployment pipelines and Prometheus monitoring.',
        achievements: [
          'Built declarative GitOps deployment workflows via ArgoCD across dev, staging, and production environments.',
          'Created automated disaster recovery runbooks with sub-15 minute RTO and zero data loss RPO validation.'
        ]
      }
    ],
    projects: [
      {
        title: 'eBPF-DropDetector',
        description: 'Kernel tracing utility identifying dropped TCP packets and socket buffer overflow in production Kubernetes nodes.',
        techStack: ['C', 'Go', 'eBPF', 'Prometheus']
      }
    ],
    certifications: [
      'Certified Kubernetes Administrator (CKA)',
      'HashiCorp Certified: Terraform Associate',
      'AWS Certified DevOps Engineer - Professional'
    ],
    technologies: ['Terraform', 'Kubernetes', 'Prometheus', 'Grafana', 'AWS', 'GCP', 'ArgoCD', 'eBPF'],
    achievements: ['Presenter at SREcon Americas 2025: "Demystifying eBPF in Multi-Tenant Kubernetes"'],
    evidenceMatchRate: {
      found: 7,
      partial: 0,
      missing: 0,
      requiresValidation: 0,
      total: 7
    }
  },
  {
    id: 'cand-11',
    jobId: 'job-4',
    name: 'Samantha Reyes',
    email: 'sam.reyes.devops@outlook.com',
    phone: '+1 (720) 441-9234',
    location: 'Denver, CO',
    createdAt: '2026-09-18T10:00:00Z',
    status: 'Evidence Mapped',
    education: [
      {
        degree: 'B.S. in Information Technology',
        institution: 'University of Colorado Boulder',
        year: '2020'
      }
    ],
    skills: ['Terraform / OpenTofu', 'Kubernetes Cluster Administration', 'Observability (Prometheus, Grafana, OpenTelemetry)', 'AWS / Cloud Infrastructure', 'GitOps with ArgoCD', 'Docker'],
    workExperience: [
      {
        role: 'Senior Cloud Operations Engineer',
        company: 'Summit Health Technologies',
        duration: '2020 - Present (5 years)',
        summary: 'Managed HIPAA-compliant AWS infrastructure and automated CI/CD releases.',
        achievements: [
          'Provisioned multi-AZ EKS clusters via Terraform with automated cluster autoscaling and node termination handlers.',
          'Built centralized Prometheus/Grafana dashboards with PagerDuty integration for on-call rotation.'
        ]
      }
    ],
    projects: [
      {
        title: 'KubeAudit-Reporter',
        description: 'Automated pod security standard verification script outputting compliance checklists.',
        techStack: ['Python', 'Kubernetes API', 'Bash']
      }
    ],
    certifications: ['AWS Certified Solutions Architect - Associate'],
    technologies: ['Terraform', 'Kubernetes', 'AWS', 'Prometheus', 'ArgoCD', 'Docker'],
    achievements: ['Not found in provided evidence.'],
    evidenceMatchRate: {
      found: 4,
      partial: 2,
      missing: 1,
      requiresValidation: 0,
      total: 7
    }
  },
  {
    id: 'cand-12',
    jobId: 'job-5',
    name: 'Soren Lindqvist',
    email: 'soren.lindqvist.sec@proton.me',
    phone: '+1 (415) 602-9911',
    location: 'San Francisco, CA',
    createdAt: '2026-09-19T08:30:00Z',
    status: 'Report Generated',
    education: [
      {
        degree: 'M.S. in Information Security',
        institution: 'KTH Royal Institute of Technology, Stockholm',
        year: '2017'
      }
    ],
    skills: ['Zero Trust Network Architecture', 'Cloud Security Posture Management (CSPM)', 'Kubernetes Runtime Defense (Falco, Cilium)', 'Threat Modeling & Penetration Testing', 'SOC2 / ISO 27001 Audit Leadership', 'Open Policy Agent (OPA / Gatekeeper)'],
    workExperience: [
      {
        role: 'Principal Security Architect',
        company: 'Vanguard CyberTrust',
        duration: '2021 - Present (5 years)',
        summary: 'Directed cloud defense-in-depth security, threat modeling, and compliance across multi-cloud infrastructure.',
        achievements: [
          'Engineered Zero-Trust service perimeter with mutual TLS (mTLS) and SPIFFE/SPIRE workload identities across AWS and GCP.',
          'Implemented Falco runtime threat detection rules in Kubernetes, eliminating cryptomining and privilege escalation attacks.',
          'Led SOC2 Type II and ISO 27001 audit certifications with zero findings for three consecutive years.'
        ]
      },
      {
        role: 'Senior Application Security Engineer',
        company: 'Nordic Bank Solutions',
        duration: '2017 - 2021 (4 years)',
        summary: 'Led secure software development lifecycle (SSDLC) and penetration testing.',
        achievements: [
          'Embedded automated container scanning and SAST in GitLab CI, resolving critical CVEs before production staging.'
        ]
      }
    ],
    projects: [
      {
        title: 'Gatekeeper-PolicyPack',
        description: 'Open-source collection of production OPA Gatekeeper constraints enforcing non-root container execution and read-only root filesystems.',
        techStack: ['OPA', 'Rego', 'Kubernetes']
      }
    ],
    certifications: [
      'Certified Information Systems Security Professional (CISSP)',
      'Certified Kubernetes Security Specialist (CKS)',
      'Offensive Security Certified Professional (OSCP)'
    ],
    technologies: ['Falco', 'OPA', 'SPIFFE', 'Kubernetes', 'AWS', 'GCP', 'Linux', 'Terraform'],
    achievements: ['CVE-2023-XXXX discoverer in popular open-source container registry daemon'],
    evidenceMatchRate: {
      found: 6,
      partial: 0,
      missing: 0,
      requiresValidation: 0,
      total: 6
    }
  }
];

export const INITIAL_EVIDENCE_MAP: Record<string, RequirementEvidenceItem[]> = {
  'cand-1': [
    {
      id: 'em-1',
      requirement: 'Python (asyncio / FastAPI)',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Rewrote core transaction processing pipeline into asynchronous Python/FastAPI microservices, reducing p99 latency from 320ms to 42ms.',
      source: 'Candidate Resume → Work Experience → Veloce Financial Technologies',
      explanation: 'Candidate clearly spearheaded a production async Python rewrite with verified latency metrics.',
      validationQuestion: 'What concurrency primitives (tasks, event loop, locks) did you use to prevent deadlocks under high request contention?'
    },
    {
      id: 'em-2',
      requirement: 'Distributed Systems Design',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Designed idempotency key mechanism across distributed payment workers, eliminating double-charge race conditions during failovers.',
      source: 'Candidate Resume → Work Experience → Veloce Financial Technologies',
      explanation: 'Direct evidence of solving classic distributed systems consistency and fault tolerance problems.',
      validationQuestion: 'How was the idempotency key lease and expiration handled across multiple worker nodes if a node crashed mid-transaction?'
    },
    {
      id: 'em-3',
      requirement: 'PostgreSQL Query Optimization',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Configured PostgreSQL multi-master read replicas with connection pooling via PgBouncer, sustaining a 3.5x traffic surge on Black Friday without connection drops.',
      source: 'Candidate Resume → Work Experience → Veloce Financial Technologies',
      explanation: 'Shows hands-on experience with PgBouncer connection pooling, replica distribution, and production peak traffic endurance.',
      validationQuestion: 'How did you handle read-after-write replication lag on replica nodes for users checking recent payment confirmations?'
    },
    {
      id: 'em-4',
      requirement: 'REST & gRPC API Design',
      category: 'Required Skill',
      status: 'Partially Supported',
      evidenceQuote: 'Built internal microservices communicating via REST and gRPC (listed in skills and open source EventStreamer CLI).',
      source: 'Candidate Resume → Projects → EventStreamer CLI',
      explanation: 'Strong evidence for REST in production, but gRPC evidence is primarily demonstrated in open-source tooling rather than large-scale enterprise workflows.',
      validationQuestion: 'Have you maintained production Protobuf schema contracts across separate microservice deployment cycles?'
    },
    {
      id: 'em-5',
      requirement: 'Apache Kafka',
      category: 'Preferred Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Engineered Kafka consumer groups with custom partition rebalance listeners, processing 4.2 billion log events daily.',
      source: 'Candidate Resume → Work Experience → TelemetryOps Cloud',
      explanation: 'Substantial scale evidence (4.2B events/day) and specific mention of custom partition rebalance listeners.',
      validationQuestion: 'What partition rebalancing strategy did you choose, and how did you prevent consumer group flapping during pod restarts?'
    },
    {
      id: 'em-6',
      requirement: 'Redis Distributed Caching',
      category: 'Preferred Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Built distributed Redis rate-limiter using token bucket algorithm and Lua scripts to prevent noisy-neighbor API abuse.',
      source: 'Candidate Resume → Work Experience → TelemetryOps Cloud',
      explanation: 'Demonstrates advanced Redis mastery through atomic Lua script execution and distributed token bucket rate limiting.',
      validationQuestion: 'Why did you use Lua scripts rather than Redis transactions or multi-key pipelines for the rate limiter?'
    },
    {
      id: 'em-7',
      requirement: 'Kubernetes Orchestration',
      category: 'Preferred Skill',
      status: 'Partially Supported',
      evidenceQuote: 'Docker listed in Skills and Work Experience; AWS ECS mentioned; Kubernetes Helm charts maintained at application level.',
      source: 'Candidate Resume → Skills & Technical Interview Transcript',
      explanation: 'Candidate possesses strong container expertise and deploys via Helm, but underlying cluster architecture is managed by platform teams.',
      validationQuestion: 'What direct hands-on experience do you have configuring Horizontal Pod Autoscaling (HPA) and resource limits in Kubernetes?'
    },
    {
      id: 'em-8',
      requirement: '4+ years professional backend engineering',
      category: 'Experience',
      status: 'Evidence Found',
      evidenceQuote: '2020 - Present: 3 years at Veloce Financial Technologies + 3 years at TelemetryOps Cloud (6 years total backend experience).',
      source: 'Candidate Resume → Work Experience Chronology',
      explanation: 'Timeline shows continuous professional backend roles exceeding the 4-year requirement.',
      validationQuestion: 'How has your approach to service reliability evolved over your 6 years of production engineering?'
    },
    {
      id: 'em-9',
      requirement: 'Production scale > 10,000 req/sec',
      category: 'Experience',
      status: 'Evidence Found',
      evidenceQuote: 'Ledger settlement services processing over 18,000 transactions/second; TelemetryOps ingestion processing 4.2 billion events daily.',
      source: 'Candidate Resume → Work Experience → Veloce & TelemetryOps',
      explanation: 'Quantitative throughput figures provided in resume explicitly confirm experience exceeding 10k req/sec.',
      validationQuestion: 'What was your primary bottleneck when scaling past 10,000 transactions/second on the database layer?'
    }
  ],
  'cand-2': [
    {
      id: 'em-201',
      requirement: 'Python (asyncio / FastAPI)',
      category: 'Required Skill',
      status: 'Partially Supported',
      evidenceQuote: 'Migrated legacy monolith modules into modular Python/Django services with shared PostgreSQL database.',
      source: 'Candidate Resume → Work Experience → Apex Supply Systems',
      explanation: 'Strong Python background with Django and Flask, but asynchronous programming with FastAPI/asyncio is not cited in production entries.',
      validationQuestion: 'Have you written asynchronous Python services utilizing asyncio task loops or async context managers?'
    },
    {
      id: 'em-202',
      requirement: 'Distributed Systems Design',
      category: 'Required Skill',
      status: 'Partially Supported',
      evidenceQuote: 'Modular Python services communicating with shared PostgreSQL and RabbitMQ message queues.',
      source: 'Candidate Resume → Work Experience → Apex Supply Systems',
      explanation: 'Has worked with decoupled messaging queues (RabbitMQ), but lacks explicit evidence of solving distributed consensus, partitioning, or idempotency keys.',
      validationQuestion: 'How did you prevent duplicate message processing when RabbitMQ workers failed and redelivered unacknowledged tasks?'
    },
    {
      id: 'em-203',
      requirement: 'PostgreSQL Query Optimization',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Optimized slow warehouse inventory queries using composite indexes and materialized views, decreasing load times by 65%.',
      source: 'Candidate Resume → Work Experience → Apex Supply Systems',
      explanation: 'Direct evidence of analyzing slow queries, creating composite indexing strategies, and leveraging materialized views.',
      validationQuestion: 'How did you handle the refresh cadence and concurrency locks on materialized views when underlying inventory tables updated?'
    },
    {
      id: 'em-204',
      requirement: 'REST & gRPC API Design',
      category: 'Required Skill',
      status: 'Partially Supported',
      evidenceQuote: 'Built inventory tracking and catalog REST APIs serving enterprise warehouse portals.',
      source: 'Candidate Resume → Work Experience → Apex Supply Systems',
      explanation: 'Demonstrated proficiency in RESTful API development, but gRPC and Protobuf are absent from candidate record.',
      validationQuestion: 'Have you designed or consumed binary RPC protocols like gRPC?'
    },
    {
      id: 'em-205',
      requirement: 'Apache Kafka',
      category: 'Preferred Skill',
      status: 'Missing',
      evidenceQuote: 'No evidence found in candidate record.',
      source: 'Candidate Resume → Skills',
      explanation: 'Candidate has RabbitMQ experience, but Apache Kafka is not documented in skills, projects, or work history.',
      validationQuestion: 'What experience do you have with partitioned event logs like Apache Kafka?'
    },
    {
      id: 'em-206',
      requirement: 'Redis Distributed Caching',
      category: 'Preferred Skill',
      status: 'Missing',
      evidenceQuote: 'No evidence found in candidate record.',
      source: 'Candidate Resume',
      explanation: 'Redis is not mentioned in candidate resume text.',
      validationQuestion: 'Have you implemented distributed caching layers in Redis or Memcached?'
    },
    {
      id: 'em-207',
      requirement: 'Kubernetes Orchestration',
      category: 'Preferred Skill',
      status: 'Partially Supported',
      evidenceQuote: 'Docker listed in Skills and Technologies.',
      source: 'Candidate Resume → Skills',
      explanation: 'Familiar with containerization (Docker), but Kubernetes cluster operations are not mentioned.',
      validationQuestion: 'What experience do you have deploying containers onto Kubernetes clusters?'
    },
    {
      id: 'em-208',
      requirement: '4+ years professional backend engineering',
      category: 'Experience',
      status: 'Evidence Found',
      evidenceQuote: '2021 - Present (4 years) as Backend Software Engineer at Apex Supply Systems.',
      source: 'Candidate Resume → Work Experience',
      explanation: 'Candidate meets the 4-year minimum professional threshold.',
      validationQuestion: 'What has been the most complex architectural migration you led during your 4 years at Apex?'
    },
    {
      id: 'em-209',
      requirement: 'Production scale > 10,000 req/sec',
      category: 'Experience',
      status: 'Missing',
      evidenceQuote: 'No evidence found in candidate record.',
      source: 'Candidate Resume',
      explanation: 'Work was focused on warehouse internal enterprise portals; no high-scale consumer throughput figures (>10k req/sec) are cited.',
      validationQuestion: 'What peak request throughput or concurrency did your warehouse portal services support?'
    }
  ],
  'cand-3': [
    {
      id: 'em-301',
      requirement: 'Python & PyTorch',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Ph.D. in Computer Science (NLP & Information Retrieval) with PyTorch models and published benchmark research.',
      source: 'Candidate Resume → Education & Projects → VeritasEval',
      explanation: 'Exemplary academic and applied mastery of PyTorch across academic publications and production systems.',
      validationQuestion: 'How did you manage tensor memory allocation during parallel multi-head attention evaluation?'
    },
    {
      id: 'em-302',
      requirement: 'RAG Pipeline Architecture',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Built production RAG system serving 1.2M queries/day with semantic chunking and reciprocal rank fusion (RRF).',
      source: 'Candidate Resume → Work Experience → Synthetica AI',
      explanation: 'Deep production RAG experience at 1.2M daily queries utilizing advanced retrieval techniques (RRF and semantic chunking).',
      validationQuestion: 'How did you calibrate the reciprocal rank fusion constant (k=60) against lexical BM25 and dense vector results?'
    },
    {
      id: 'em-303',
      requirement: 'Vector Databases (pgvector, Qdrant)',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Qdrant vector database utilized in production serving 1.2M queries/day and open-source VeritasEval benchmark.',
      source: 'Candidate Resume → Skills & Work Experience',
      explanation: 'Verified hands-on production deployment of Qdrant with payload filtering and HNSW indexing.',
      validationQuestion: 'How did you tune HNSW m and ef_construct parameters for low query latency without blowing up RAM?'
    },
    {
      id: 'em-304',
      requirement: 'LLM Evaluation & Grounding',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Published 3 papers at ACL & EMNLP on factual grounding; built VeritasEval automated hallucination benchmark.',
      source: 'Candidate Resume → Projects & Achievements',
      explanation: 'Industry-leading subject matter expertise in hallucination mitigation and factual evaluation.',
      validationQuestion: 'What metrics did you rely on beyond BLEU/ROUGE to evaluate multi-sentence factual consistency?'
    },
    {
      id: 'em-305',
      requirement: 'Model Fine-tuning (LoRA / QLoRA)',
      category: 'Preferred Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Tuned 7B open-source LLMs using LoRA on proprietary compliance corpora, increasing exact-match accuracy by 22%.',
      source: 'Candidate Resume → Work Experience → Synthetica AI',
      explanation: 'Demonstrated real-world parameter-efficient fine-tuning with clear quantitative accuracy gains.',
      validationQuestion: 'Which target modules (q, k, v, o projections) did you inject LoRA adapters into, and why?'
    },
    {
      id: 'em-306',
      requirement: 'vLLM / TensorRT-LLM',
      category: 'Preferred Skill',
      status: 'Partially Supported',
      evidenceQuote: 'Served models via FastAPI; deep learning frameworks listed in skills.',
      source: 'Candidate Resume → Work Experience',
      explanation: 'Deploys models via FastAPI microservices; specific inference engines like vLLM or TensorRT-LLM are not explicitly named in resume.',
      validationQuestion: 'Have you configured continuous batching or paged attention with vLLM or TensorRT-LLM?'
    },
    {
      id: 'em-307',
      requirement: '3+ years in Applied ML / NLP',
      category: 'Experience',
      status: 'Evidence Found',
      evidenceQuote: 'Ph.D. completed in 2023 + 2.5 years as Senior ML Scientist at Synthetica AI (over 5 years dedicated NLP research and delivery).',
      source: 'Candidate Resume → Education & Chronology',
      explanation: 'Substantially exceeds minimum experience requirement with high academic and commercial output.',
      validationQuestion: 'How has the shift from pre-transformer representations to agentic RAG changed your system design methodology?'
    }
  ],
  'cand-5': [
    {
      id: 'em-501',
      requirement: 'Distributed Systems Design',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Implemented custom Raft consensus state machine in Go handling 45,000 metadata commits/second with zero data corruption.',
      source: 'Candidate Resume → Work Experience → Chronos Distributed Storage',
      explanation: 'Unquestionable mastery of consensus algorithms (Raft), quorum replication, and distributed state machines at high throughput.',
      validationQuestion: 'How did you handle Raft log compaction and snapshot transfers without blocking incoming client write heartbeats?'
    },
    {
      id: 'em-502',
      requirement: 'Python (asyncio / FastAPI)',
      category: 'Required Skill',
      status: 'Partially Supported',
      evidenceQuote: 'Python listed in secondary tools; primary production development is in Go and Rust.',
      source: 'Candidate Resume → Skills',
      explanation: 'Candidate is an elite systems programmer in Go/Rust; possesses Python knowledge but primary recent scale projects are Go.',
      validationQuestion: 'How comfortable are you architecting services in asynchronous Python alongside Go?'
    },
    {
      id: 'em-503',
      requirement: 'PostgreSQL Query Optimization',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Engineered automatic PostgreSQL partition pruning and connection multiplexing, reducing storage IOPS by 55%.',
      source: 'Candidate Resume → Work Experience → Chronos Distributed Storage',
      explanation: 'Advanced database knowledge including partition pruning, connection multiplexing, and IOPS reduction.',
      validationQuestion: 'What table partitioning strategy (range, hash, list) did you implement and how did you prevent query planner lock de-escalation?'
    },
    {
      id: 'em-504',
      requirement: 'REST & gRPC API Design',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Architected streaming gRPC mesh across 300+ edge nodes with bidirectional Protobuf backpressure.',
      source: 'Candidate Resume → Work Experience → Chronos Distributed Storage',
      explanation: 'Top-tier gRPC evidence detailing bidirectional streaming, Protobuf schemas, and backpressure handling at scale.',
      validationQuestion: 'How did you regulate gRPC client channel reconnect backoff during rolling gateway restarts?'
    },
    {
      id: 'em-505',
      requirement: 'Apache Kafka',
      category: 'Preferred Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Built Kafka topic mirror pipeline handling 12B telemetry events/day across US-East and EU-Central clusters.',
      source: 'Candidate Resume → Work Experience → HyperScale Networks',
      explanation: 'Huge scale Kafka expertise (12 billion events daily) across multi-region geographic clusters.',
      validationQuestion: 'What replication factor, min.insync.replicas, and acks setting did you require for cross-region mirroring?'
    },
    {
      id: 'em-506',
      requirement: 'Kubernetes Orchestration',
      category: 'Preferred Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Authored Kubernetes custom controller (CRD) for automated database failover; Certified Kubernetes Administrator (CKA).',
      source: 'Candidate Resume → Work Experience & Certifications',
      explanation: 'Holds official CKA certification and authored custom Kubernetes CRD controllers in Go.',
      validationQuestion: 'What client-go workqueue rate-limiting patterns did you use in your Kubernetes reconciler?'
    },
    {
      id: 'em-507',
      requirement: 'Production scale > 10,000 req/sec',
      category: 'Experience',
      status: 'Evidence Found',
      evidenceQuote: 'Handling 45,000 metadata commits/second; Kafka pipeline processing 12 billion events daily.',
      source: 'Candidate Resume → Work Experience',
      explanation: 'Verified scale reaching 45k commits/sec, well over the 10k requirement.',
      validationQuestion: 'What was your consensus commit latency profile at 45,000 commits/second?'
    }
  ],
  'cand-8': [
    {
      id: 'em-801',
      requirement: 'TypeScript',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Lead Design Systems Engineer developing headless component primitives and A11y-Tokens CLI in pure TypeScript.',
      source: 'Candidate Resume → Work Experience & Projects',
      explanation: 'Extensive TypeScript usage across component APIs, generics, and automated CLI tools.',
      validationQuestion: 'How do you design type-safe polymorphic component props (as="button" | "a") in React with TypeScript?'
    },
    {
      id: 'em-802',
      requirement: 'React 19 & Next.js/Vite',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Architected enterprise design system used by 180+ engineers across 14 web products using React and modern build tooling.',
      source: 'Candidate Resume → Work Experience → Starlight Financial Platform',
      explanation: 'Proven large-scale adoption of React components across 14 separate web product teams.',
      validationQuestion: 'How have you leveraged React 19 Actions or Server Components within your shared design system primitives?'
    },
    {
      id: 'em-803',
      requirement: 'Design System Architecture',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Engineered headless, accessible token primitives supporting multi-brand theming and zero runtime CSS overhead.',
      source: 'Candidate Resume → Work Experience → Starlight Financial Platform',
      explanation: 'Industry leader in token-driven architecture, headless component primitives, and multi-brand theming.',
      validationQuestion: 'How do you structure semantic tokens vs global color palette tokens to ensure seamless dark mode transitions?'
    },
    {
      id: 'em-804',
      requirement: 'Web Performance & Accessibility (WCAG AAA)',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Achieved 100% WCAG AAA accessibility compliance across all 65 design system components; IAAP CPACC certified.',
      source: 'Candidate Resume → Work Experience & Certifications',
      explanation: 'Rare certified expert in accessibility (CPACC) with documented WCAG AAA compliance across 65 production components.',
      validationQuestion: 'How do you test and resolve focus restoration and inert background handling in accessible modal dialogs?'
    },
    {
      id: 'em-805',
      requirement: 'Tailwind CSS v4',
      category: 'Preferred Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Built A11y-Tokens CLI with PostCSS and modern utility-based token integration.',
      source: 'Candidate Resume → Projects & Skills',
      explanation: 'Direct expertise with utility-first CSS tooling and zero-runtime stylesheet generation.',
      validationQuestion: 'What approach do you take to prevent class name collisions when consumers customize Tailwind component classes?'
    },
    {
      id: 'em-806',
      requirement: '6+ years professional frontend engineering',
      category: 'Experience',
      status: 'Evidence Found',
      evidenceQuote: '2019 - Present: 7 years total professional frontend engineering across Starlight and CanvasFlow.',
      source: 'Candidate Resume → Chronology',
      explanation: 'Timeline verifies 7 years dedicated professional frontend and design system experience.',
      validationQuestion: 'How do you manage breaking changes in shared component libraries without stalling consumer product roadmaps?'
    }
  ],
  'cand-10': [
    {
      id: 'em-1001',
      requirement: 'Terraform / OpenTofu',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Migrated 400+ infrastructure resources to modular Terraform/OpenTofu with automated state locking and drift detection.',
      source: 'Candidate Resume → Work Experience → CloudTransit Global',
      explanation: 'Extensive production experience managing 400+ cloud resources with OpenTofu/Terraform modules, state locks, and CI validation.',
      validationQuestion: 'How do you architect reusable Terraform modules to prevent circular dependencies in multi-region environments?'
    },
    {
      id: 'em-1002',
      requirement: 'Kubernetes Cluster Administration',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Led multi-region infrastructure reliability across 12 Kubernetes clusters; Certified Kubernetes Administrator (CKA).',
      source: 'Candidate Resume → Work Experience & Certifications',
      explanation: 'Direct administration of 12 production Kubernetes clusters across AWS and GCP with CKA credential.',
      validationQuestion: 'How do you execute zero-downtime Kubernetes control plane upgrades across multi-region worker pools?'
    },
    {
      id: 'em-1003',
      requirement: 'Observability (Prometheus, Grafana, OpenTelemetry)',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Maintained 99.995% uptime SLA; deployed Prometheus monitoring and eBPF telemetry exports.',
      source: 'Candidate Resume → Work Experience → CloudTransit & Centric Data',
      explanation: 'High-availability monitoring across high-throughput gateways with custom Prometheus metrics and Grafana alerts.',
      validationQuestion: 'What alerting strategies do you use to distinguish transient network spikes from actual service degradation?'
    },
    {
      id: 'em-1004',
      requirement: 'GCP / AWS Multi-cloud',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Led multi-region infrastructure reliability across 12 Kubernetes clusters spanning AWS and GCP.',
      source: 'Candidate Resume → Work Experience → CloudTransit Global',
      explanation: 'Verified dual-cloud deployment experience across AWS and GCP workloads.',
      validationQuestion: 'What cross-cloud networking topology did you choose to connect AWS EKS and GCP GKE services securely?'
    },
    {
      id: 'em-1005',
      requirement: 'eBPF Network Debugging',
      category: 'Preferred Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Deployed Cilium eBPF service mesh for transparent mTLS; wrote open-source eBPF-DropDetector utility.',
      source: 'Candidate Resume → Work Experience & Projects',
      explanation: 'Elite eBPF practitioner with Cilium production deployments and custom kernel tracing development.',
      validationQuestion: 'What BPF program type and hook point did you attach to in eBPF-DropDetector to trace socket drops?'
    },
    {
      id: 'em-1006',
      requirement: 'GitOps with ArgoCD',
      category: 'Preferred Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Built declarative GitOps deployment workflows via ArgoCD across dev, staging, and production environments.',
      source: 'Candidate Resume → Work Experience → Centric Data Corp',
      explanation: 'Hands-on production implementation of ArgoCD ApplicationSets and declarative synchronization.',
      validationQuestion: 'How do you prevent ArgoCD auto-sync loops when dynamic admission webhooks modify running manifests?'
    },
    {
      id: 'em-1007',
      requirement: '5+ years dedicated infrastructure / SRE experience',
      category: 'Experience',
      status: 'Evidence Found',
      evidenceQuote: '2018 - Present: 8 years continuous professional SRE and DevOps engineering.',
      source: 'Candidate Resume → Chronology',
      explanation: 'Exceeds the 5-year requirement with proven multi-year track record at staff level.',
      validationQuestion: 'What was your most challenging on-call incident and what systemic fix did you implement afterwards?'
    }
  ],
  'cand-12': [
    {
      id: 'em-1201',
      requirement: 'Zero Trust Network Architecture',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Engineered Zero-Trust service perimeter with mutual TLS (mTLS) and SPIFFE/SPIRE workload identities across AWS and GCP.',
      source: 'Candidate Resume → Work Experience → Vanguard CyberTrust',
      explanation: 'Gold standard implementation of Zero-Trust with cryptographic SPIFFE/SPIRE identities and mTLS encryption.',
      validationQuestion: 'How did you handle SPIFFE workload attestation for short-lived ephemeral batch jobs in Kubernetes?'
    },
    {
      id: 'em-1202',
      requirement: 'Cloud Security Posture Management (CSPM)',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Directed cloud defense-in-depth security, threat modeling, and compliance across multi-cloud infrastructure.',
      source: 'Candidate Resume → Work Experience → Vanguard CyberTrust',
      explanation: 'Led CSPM policies across multi-cloud infrastructure ensuring continuous compliance.',
      validationQuestion: 'How do you prioritize security alerts to prevent engineering alert fatigue when CSPM tools flag thousands of non-critical findings?'
    },
    {
      id: 'em-1203',
      requirement: 'Kubernetes Runtime Defense (Falco, Cilium)',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Implemented Falco runtime threat detection rules in Kubernetes, eliminating cryptomining and privilege escalation attacks.',
      source: 'Candidate Resume → Work Experience → Vanguard CyberTrust',
      explanation: 'Documented defense against real-world privilege escalation attacks via Falco syscall rules.',
      validationQuestion: 'How do you tune Falco syscall rules to avoid dropped events during massive container restart churn?'
    },
    {
      id: 'em-1204',
      requirement: 'Threat Modeling & Penetration Testing',
      category: 'Required Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Hold Offensive Security Certified Professional (OSCP); discovered CVE-2023-XXXX in container daemon.',
      source: 'Candidate Resume → Certifications & Achievements',
      explanation: 'Practical offensive security credentials (OSCP) combined with published CVE vulnerability discovery.',
      validationQuestion: 'Walk through your threat modeling methodology when evaluating third-party LLM inference integrations.'
    },
    {
      id: 'em-1205',
      requirement: 'SOC2 / ISO 27001 Audit Leadership',
      category: 'Preferred Skill',
      status: 'Evidence Found',
      evidenceQuote: 'Led SOC2 Type II and ISO 27001 audit certifications with zero findings for three consecutive years.',
      source: 'Candidate Resume → Work Experience → Vanguard CyberTrust',
      explanation: 'Three consecutive years of flawless SOC2 Type II and ISO 27001 audit results.',
      validationQuestion: 'What automated evidence gathering pipelines did you implement for auditor population sampling?'
    },
    {
      id: 'em-1206',
      requirement: '6+ years dedicated security experience',
      category: 'Experience',
      status: 'Evidence Found',
      evidenceQuote: '2017 - Present: 9 years dedicated professional application and infrastructure security.',
      source: 'Candidate Resume → Chronology',
      explanation: 'Extensive 9-year career in specialized cybersecurity and DevSecOps architecture.',
      validationQuestion: 'How do you build a security-first culture without being perceived as a blocker to product velocity?'
    }
  ]
};

export const INITIAL_INTERVIEWS: Record<string, InterviewSession> = {
  'cand-1': {
    id: 'int-1',
    candidateId: 'cand-1',
    jobId: 'job-1',
    date: '2026-09-18T16:00:00Z',
    interviewer: 'Sarah Jenkins (VP of Engineering)',
    transcriptOrNotes: `Interviewer (Sarah): Hi Elena, thanks for joining today. Let's dive straight into your experience at Veloce Financial. You mentioned rewriting the transaction processing pipeline in FastAPI and asyncio to handle 18k req/sec. Can you walk me through how you handled idempotency and database connection pressure?

Elena Rostova: Absolutely. When payment requests arrive, we calculate an idempotency hash combining the client request ID, account ID, and timestamp window. We store this in Redis with an atomic SETNX (set-if-not-exists) with a short 30-second TTL. If another worker picks up a retry with the same key, it immediately receives a 409 or awaits the existing in-flight promise. For database pressure, we placed PgBouncer in transaction pooling mode in front of our primary Postgres cluster. Each FastAPI instance maintained an asyncpg pool capped at 15 connections, avoiding PostgreSQL backend process saturation.

Interviewer (Sarah): That's very clear. How did you deal with read-after-write replication lag on read replicas?

Elena Rostova: Great question. For critical views—like a customer refreshing their transaction feed immediately after submitting a wire—we used a "pinned primary" window. We wrote the latest transaction ID to a user session cache in Redis; if a read query had a timestamp within 5 seconds of a write, our routing layer routed the query directly to the primary database rather than the read replicas.

Interviewer (Sarah): What about Kubernetes? Your resume lists Docker and AWS ECS, but what's your direct familiarity with k8s?

Elena Rostova: At Veloce, the platform team managed our Kubernetes clusters, so while I didn't write Terraform for cluster provisioning, I actively maintained our Helm charts, defined readiness and liveness probes, configured resource requests/limits, and debugged OOMKilled worker pods using kubectl logs and describe. I'm comfortable interacting with k8s daily, though I am not a dedicated cluster administrator.`,
    generatedQuestions: [
      {
        id: 'iq-1',
        category: 'System Architecture',
        question: 'How did you structure idempotency key guarantees across distributed workers during database network partitions?',
        targetedRequirement: 'Distributed Systems Design',
        contextFromResume: 'Candidate claimed idempotency mechanism eliminating race conditions in Veloce experience.',
        suggestedFollowUp: 'What happened when Redis itself suffered a replica failover during the 30-second window?'
      },
      {
        id: 'iq-2',
        category: 'Infrastructure & Kubernetes',
        question: 'What was your role in Kubernetes container lifecycle management, and how did you configure graceful worker shutdowns?',
        targetedRequirement: 'Kubernetes Orchestration',
        contextFromResume: 'Resume lists Docker and ECS, but k8s cluster architecture was flagged as Requires Validation.',
        suggestedFollowUp: 'How did you handle SIGTERM signals in asyncio to drain in-flight payment jobs without dropping connections?'
      },
      {
        id: 'iq-3',
        category: 'Database Resiliency',
        question: 'How did you diagnose slow queries in PostgreSQL under high connection load, and what indexing strategies yielded the largest gains?',
        targetedRequirement: 'PostgreSQL Query Optimization',
        contextFromResume: 'PgBouncer multi-replica setup listed on Black Friday.',
        suggestedFollowUp: 'Did you use partial indexes or BRIN indexes for time-series ledger data?'
      }
    ],
    analysisResult: {
      summary: 'Candidate demonstrated rigorous, verified mastery of distributed locking (Redis atomic SETNX), connection pooling architecture (PgBouncer with asyncpg), and replication lag mitigation (pinned primary routing). Clarified Kubernetes experience as application-layer (Helm, probes, pod debugging) rather than cluster infrastructure provisioning.',
      requirementsAddressed: [
        {
          requirement: 'Distributed Systems Design',
          candidateAnswerSummary: 'Explained atomic SETNX idempotency locking with TTL and retry synchronization in clear, accurate technical detail.',
          verifiedStatus: 'Evidence Found',
          notes: 'High confidence. Answers showed direct firsthand production implementation.'
        },
        {
          requirement: 'PostgreSQL Query Optimization',
          candidateAnswerSummary: 'Described transaction pooling via PgBouncer with capped connection limits per FastAPI worker and pinned primary cache routing.',
          verifiedStatus: 'Evidence Found',
          notes: 'Directly validated high throughput handling and replica consistency.'
        },
        {
          requirement: 'Kubernetes Orchestration',
          candidateAnswerSummary: 'Clarified that candidate maintains Helm charts, pod specs, and debugging (kubectl), while platform team handles cluster setup.',
          verifiedStatus: 'Partially Supported',
          notes: 'Candidate is proficient at container runtime debugging, but has not provisioned underlying k8s clusters.'
        }
      ],
      remainingGaps: [
        'Kafka partition rebalancing operational incidents were not probed in detail during this round.'
      ],
      followUpQuestions: [
        'Ask about specific experience handling Kafka poison pill messages or schema registry drift across service versions.'
      ]
    }
  },
  'cand-3': {
    id: 'int-3',
    candidateId: 'cand-3',
    jobId: 'job-2',
    date: '2026-09-18T18:00:00Z',
    interviewer: 'Dr. Evelyn Reed (Head of AI)',
    transcriptOrNotes: `Interviewer (Dr. Reed): Aisha, wonderful having you. Let's discuss your work at Synthetica AI on Reciprocal Rank Fusion (RRF). How did you prevent query drift when synthesizing sparse and dense vectors?

Dr. Aisha Patel: Thank you Evelyn. In our pipeline, BM25 captured exact keyword matches (like invoice IDs and statutory codes), while our dense bi-encoder captured semantic intent. With standard rank fusion, if the top 20 retrieved chunks contain contradictory facts, the generator can hallucinate. We introduced a secondary cross-encoder reranking step followed by context pruning. We filtered out any retrieved chunk with a cross-encoder score below 0.72 before feeding the remaining passages into the LLM context window. This reduced hallucination rate by 34% on our evaluation suite.

Interviewer (Dr. Reed): What about vector database scaling in Qdrant?

Dr. Aisha Patel: We hosted our Qdrant collections with HNSW indexing. Because RAM was our primary cost constraint, we quantized our 1536-dimensional embeddings from float32 to scalar uint8, which dropped our memory footprint by nearly 75% with less than a 1.2% loss in Recall@10. We also placed payload indexes on tenant IDs to guarantee strict multi-tenant isolation at the index level.`,
    generatedQuestions: [
      {
        id: 'iq-301',
        category: 'RAG & Retrieval Optimization',
        question: 'How do you handle vector database query latency spikes during large document ingestion spikes?',
        targetedRequirement: 'Vector Databases (pgvector, Qdrant)',
        contextFromResume: 'Experience scaling Qdrant to 1.2M queries/day.',
        suggestedFollowUp: 'What quantization trade-offs did you make between scalar and product quantization?'
      },
      {
        id: 'iq-302',
        category: 'Hallucination Mitigation',
        question: 'Can you describe the architecture of your VeritasEval automated hallucination test harness?',
        targetedRequirement: 'LLM Evaluation & Grounding',
        contextFromResume: 'Created open-source VeritasEval benchmark.',
        suggestedFollowUp: 'How do you prevent judge model biases when using an LLM to evaluate another LLM?'
      }
    ],
    analysisResult: {
      summary: 'Candidate validated exceptional, world-class depth in retrieval engineering, RRF tuning, scalar quantization in Qdrant, and rigorous hallucination evaluation pipelines. Answers were mathematically grounded and operationally practical.',
      requirementsAddressed: [
        {
          requirement: 'RAG Pipeline Architecture',
          candidateAnswerSummary: 'Described hybrid BM25 + dense retrieval with secondary cross-encoder reranker filtering chunks below 0.72 threshold.',
          verifiedStatus: 'Evidence Found',
          notes: 'Flawless technical precision and practical insight.'
        },
        {
          requirement: 'Vector Databases (pgvector, Qdrant)',
          candidateAnswerSummary: 'Explained scalar uint8 quantization reducing memory by 75% while preserving Recall@10 above 98.8%.',
          verifiedStatus: 'Evidence Found',
          notes: 'Validated deep hands-on mastery of Qdrant operations.'
        }
      ],
      remainingGaps: [
        'Fine-tuning training cluster distributed communication (FSDP / DeepSpeed) was only briefly touched.'
      ],
      followUpQuestions: [
        'Ask about experience setting up multi-node GPU training with DeepSpeed ZeRO-3.'
      ]
    }
  },
  'cand-5': {
    id: 'int-5',
    candidateId: 'cand-5',
    jobId: 'job-1',
    date: '2026-09-19T10:00:00Z',
    interviewer: 'David Vance (Principal Architect)',
    transcriptOrNotes: `Interviewer (David): Vikram, your work on Raft consensus in Go at Chronos is very relevant. Can you walk me through a scenario where a leader node partitioned and how your implementation handled split-brain?

Vikram Malhotra: In our Raft implementation, we enforced strict leader leases with monotonic heartbeat deadlines. If a leader experiences a network partition and cannot gather a quorum of AppendEntries acknowledgments within the election timeout window, it voluntarily steps down to Follower state and ceases acknowledging client writes. We implemented pre-vote phases to prevent disconnected nodes from perturbing the cluster terms upon reconnection.

Interviewer (David): How did you optimize PostgreSQL to support your consensus storage?

Vikram Malhotra: We sharded our metadata into hash-partitioned tables by account ID. We bypassed the generic connection overhead by writing a custom Go connection pool with direct pgx binary protocol support, avoiding text serialization overhead. We also tuned write-ahead logging (WAL) flush intervals to batch fsync calls safely.`,
    generatedQuestions: [
      {
        id: 'iq-501',
        category: 'Distributed Consensus',
        question: 'How did you test your Raft implementation for subtle network partition bugs and race conditions?',
        targetedRequirement: 'Distributed Systems Design',
        contextFromResume: 'Implemented Raft in Go handling 45k commits/sec.',
        suggestedFollowUp: 'Did you use deterministic simulation testing (like Jepsen or Hermitage)?'
      }
    ],
    analysisResult: {
      summary: 'Candidate demonstrated rare, top-tier systems engineering mastery. Deeply articulate on Raft leader lease semantics, pre-vote optimizations, binary Postgres protocol tuning, and streaming gRPC backpressure.',
      requirementsAddressed: [
        {
          requirement: 'Distributed Systems Design',
          candidateAnswerSummary: 'Explained leader lease deadlines, pre-vote mechanics, and voluntary step-down to prevent split-brain.',
          verifiedStatus: 'Evidence Found',
          notes: 'Exceptional depth. Candidate is a bona fide distributed systems authority.'
        }
      ],
      remainingGaps: ['Python experience is secondary to Go/Rust.'],
      followUpQuestions: ['Verify willingness to work with existing Python services.']
    }
  },
  'cand-8': {
    id: 'int-8',
    candidateId: 'cand-8',
    jobId: 'job-3',
    date: '2026-09-19T14:00:00Z',
    interviewer: 'Claire Moreau (VP of Design & Product)',
    transcriptOrNotes: `Interviewer (Claire): Maya, welcome. Building a design system adopted by 180+ engineers across 14 teams is a tremendous accomplishment. How did you balance strict accessibility compliance with product teams requesting custom visual overrides?

Maya Lin: Thank you Claire. We treated accessibility not as a barrier, but as a core design contract. We built our component primitives using Radix headless mechanics, which meant all keyboard interactions, ARIA attributes, and focus traps were mathematically guaranteed out-of-the-box. For visual customization, we created a three-tier token hierarchy: Global Tokens (raw colors/spacing), Semantic Tokens (e.g., surface-neutral, text-primary), and Component-specific Tokens. Product teams were empowered to override semantic tokens through CSS variables without ever breaking the underlying WCAG AAA contrast ratios.

Interviewer (Claire): How did you automate testing to ensure no regressions were introduced across releases?

Maya Lin: We built our A11y-Tokens CLI, which integrates directly into GitHub Actions. On every pull request, the CLI spins up headless Storybook instances, runs axe-core accessibility audits, and verifies that every token combination preserves a minimum 7:1 contrast ratio for body text. If a contrast regression occurs, the PR is blocked automatically.`,
    generatedQuestions: [
      {
        id: 'iq-801',
        category: 'Design System Architecture',
        question: 'How do you handle breaking component changes across multiple independent product team repositories?',
        targetedRequirement: 'Design System Architecture',
        contextFromResume: 'Maintained design system across 14 separate web products.',
        suggestedFollowUp: 'Do you use automated codemods with jscodeshift to migrate consumer codebases?'
      }
    ],
    analysisResult: {
      summary: 'Candidate is an exceptional Staff-level frontend architect. Articulated clear mental models for token hierarchies, automated contrast regression testing, and collaborative developer adoption.',
      requirementsAddressed: [
        {
          requirement: 'Design System Architecture',
          candidateAnswerSummary: 'Described three-tier token hierarchy (global, semantic, component) with CSS variable encapsulation.',
          verifiedStatus: 'Evidence Found',
          notes: 'Best-in-class architectural maturity.'
        },
        {
          requirement: 'Web Performance & Accessibility (WCAG AAA)',
          candidateAnswerSummary: 'Explained headless Radix primitives combined with automated axe-core PR gates ensuring 7:1 contrast ratios.',
          verifiedStatus: 'Evidence Found',
          notes: 'Rare, certified expertise directly verified.'
        }
      ],
      remainingGaps: ['Micro-frontend runtime isolation was not explored.'],
      followUpQuestions: ['How do you manage version mismatches when two micro-frontends share the same page?']
    }
  },
  'cand-10': {
    id: 'int-10',
    candidateId: 'cand-10',
    jobId: 'job-4',
    date: '2026-09-19T16:30:00Z',
    interviewer: 'Marcus Brody (Director of Infrastructure)',
    transcriptOrNotes: `Interviewer (Marcus): Tariq, thanks for coming. You mentioned migrating 12 multi-region Kubernetes clusters to Cilium eBPF and saving $140k/yr. What made you replace standard sidecar service meshes?

Tariq Al-Mansoor: At our throughput scale of 85k req/sec, sidecar proxies like Envoy were injecting 8-12ms of p99 latency because every packet had to traverse the Linux TCP stack into user-space twice per hop. With Cilium and eBPF, we bypass the host network stack at the socket layer (sockops). The packet gets redirected in-kernel directly to the destination container socket. We saw p99 latency drop by 6ms immediately and freed up 2.4 CPU cores per node that previously spent cycles on proxy context switching.

Interviewer (Marcus): That's impressive. What about multi-region disaster recovery?

Tariq Al-Mansoor: We practiced quarterly automated chaos drills. Using ArgoCD, our infrastructure state is 100% declarative in Git. If our primary AWS region went dark, our DNS failover rerouted traffic to GCP within 90 seconds, and our stateless services spun up automatically from warm pools while database replicas promoted cleanly.`,
    generatedQuestions: [
      {
        id: 'iq-1001',
        category: 'eBPF & Kernel Networking',
        question: 'How do you monitor and debug eBPF map limits and tail calls in production nodes?',
        targetedRequirement: 'eBPF Network Debugging',
        contextFromResume: 'Created open-source eBPF-DropDetector utility.',
        suggestedFollowUp: 'What kernel version requirements did you mandate across your multi-cloud nodes?'
      }
    ],
    analysisResult: {
      summary: 'Candidate demonstrated mastery of eBPF socket redirection (sockops), multi-cloud disaster recovery, and declarative GitOps via ArgoCD. Deep, practical engineering intuition.',
      requirementsAddressed: [
        {
          requirement: 'eBPF Network Debugging',
          candidateAnswerSummary: 'Articulated socket layer kernel redirection bypassing host TCP stack and reducing p99 latency by 6ms.',
          verifiedStatus: 'Evidence Found',
          notes: 'Deep technical competence validated.'
        },
        {
          requirement: 'Kubernetes Cluster Administration',
          candidateAnswerSummary: 'Described 90-second cross-cloud failover drills using ArgoCD GitOps declarative states.',
          verifiedStatus: 'Evidence Found',
          notes: 'Confirmed staff-level reliability leadership.'
        }
      ],
      remainingGaps: ['FinOps cloud cost governance was only briefly mentioned.'],
      followUpQuestions: ['Discuss tagging policies and cost allocation across business units.']
    }
  }
};

export const INITIAL_REPORTS: Record<string, EvaluationReport> = {
  'cand-1': {
    id: 'rep-1',
    candidateId: 'cand-1',
    jobId: 'job-1',
    generatedAt: '2026-09-18T17:15:00Z',
    executiveSummary: 'Elena Rostova presents exceptionally strong, verified production evidence in distributed systems, asynchronous Python architecture, and relational database resiliency at scale (>18,000 req/sec). Her interview responses confirmed deep architectural understanding of idempotency, connection pooling, and replication lag trade-offs. Kubernetes familiarity is solid at the application deployment level (Helm, pod diagnostics), though she has not managed raw cluster infrastructure.',
    requirementCoverage: {
      total: 9,
      evidenceFound: 7,
      partiallySupported: 2,
      missing: 0,
      requiresValidation: 0
    },
    verifiedCompetencies: [
      'High-throughput Async Python (FastAPI, asyncio, asyncpg)',
      'Distributed Idempotency & Concurrency Management',
      'PostgreSQL Optimization & PgBouncer Connection Pooling',
      'Kafka Event Streaming & Consumer Groups (4.2B daily events)',
      'Redis Atomic Token Bucket Rate Limiting (Lua scripts)'
    ],
    unansweredOrInconclusiveAreas: [
      'Deep Kubernetes control plane configuration (etcd, CNI plugins)',
      'Enterprise gRPC schema management across legacy services'
    ],
    keyStrengths: [
      'Exceptional grasp of latency optimization: decreased p99 from 320ms to 42ms in production.',
      'Mature architectural trade-off intuition: articulated clear solutions for read-after-write consistency.',
      'Active industry engagement: PyBay speaker on distributed race conditions.'
    ],
    potentialRisksOrGaps: [
      'If the hiring team expects this role to manage bare-metal or cloud k8s cluster provisioning independently, additional infrastructure onboarding will be required.'
    ],
    suggestedNextRoundQuestions: [
      'Walk through a major production incident where Kafka consumer lag spiked unexpectedly—how did you root-cause and recover?',
      'How would you architect our event schema evolution strategy to guarantee zero-downtime microservice deployments?'
    ],
    recruiterNotes: 'Candidate was articulate, humble, and answered technical edge-cases with exact quantitative metrics. Highly recommended for final round technical design panel.',
    humanDecisionStatus: 'Reviewed - Proceed',
    auditSummary: 'Synthesized from 2 verified work experience entries, 2 open-source projects, and 45-minute technical interview transcript.'
  },
  'cand-3': {
    id: 'rep-3',
    candidateId: 'cand-3',
    jobId: 'job-2',
    generatedAt: '2026-09-18T19:00:00Z',
    executiveSummary: 'Dr. Aisha Patel represents an elite, research-grounded GenAI practitioner with proven commercial delivery at scale (1.2M daily RAG queries). Her deep knowledge of Reciprocal Rank Fusion, cross-encoder threshold filtering, and Qdrant scalar quantization directly maps to our core enterprise intelligence platform needs. Her published research on hallucination benchmarks provides immediate strategic value.',
    requirementCoverage: {
      total: 7,
      evidenceFound: 6,
      partiallySupported: 1,
      missing: 0,
      requiresValidation: 0
    },
    verifiedCompetencies: [
      'Advanced RAG Architecture (Semantic Chunking, Reciprocal Rank Fusion)',
      'Vector Database Engineering & Scalar Quantization (Qdrant)',
      'Factual Grounding & Hallucination Mitigation (VeritasEval)',
      'Parameter-Efficient Fine-tuning (LoRA / QLoRA)',
      'PyTorch Deep Learning & Information Retrieval'
    ],
    unansweredOrInconclusiveAreas: [
      'Multi-node distributed GPU cluster orchestration (DeepSpeed ZeRO-3)'
    ],
    keyStrengths: [
      'Published academic researcher with verified commercial production execution.',
      'Demonstrated 34% hallucination reduction through cross-encoder context pruning.',
      'Cut vector database memory footprint by 75% via quantization while preserving 98.8% Recall.'
    ],
    potentialRisksOrGaps: [
      'Candidate is heavily focused on model and retrieval architecture; front-facing UI integration should be supported by frontend colleagues.'
    ],
    suggestedNextRoundQuestions: [
      'How would you design a self-correcting RAG agent that triggers secondary search queries when initial passage relevance is low?'
    ],
    recruiterNotes: 'Exceptional candidate. Combines PhD-level scientific rigor with practical latency and cloud cost optimization instincts.',
    humanDecisionStatus: 'Reviewed - Proceed',
    auditSummary: 'Synthesized from 3 peer-reviewed ACL/EMNLP papers, Synthetica AI production metrics, and live technical interview with Dr. Reed.'
  },
  'cand-8': {
    id: 'rep-8',
    candidateId: 'cand-8',
    jobId: 'job-3',
    generatedAt: '2026-09-19T15:30:00Z',
    executiveSummary: 'Maya Lin is a premier Staff Frontend Engineer with unmatched specialization in accessible design systems and component architecture. She successfully led adoption of a multi-package design system across 180 engineers and 14 products while maintaining 100% WCAG AAA compliance. Her interview showcased an exceptional blend of visual craftsmanship, mathematical token rigor, and automated accessibility tooling.',
    requirementCoverage: {
      total: 6,
      evidenceFound: 6,
      partiallySupported: 0,
      missing: 0,
      requiresValidation: 0
    },
    verifiedCompetencies: [
      'Headless Component Primitives & Radix UI Integration',
      'Multi-brand Token Architecture & CSS Containment',
      'WCAG AAA Accessibility Standards & IAAP CPACC Credential',
      'Automated Axe-Core Accessibility CI/CD Gates',
      'TypeScript Ergonomics & Polymorphic Component APIs'
    ],
    unansweredOrInconclusiveAreas: [
      'WebAssembly or Canvas 3D rendering pipelines'
    ],
    keyStrengths: [
      '100% WCAG AAA accessibility verification with zero keyboard navigation traps.',
      'Decreased bundle size by 38% through tree-shakable architecture.',
      'Proven organizational leadership across 14 independent product teams.'
    ],
    potentialRisksOrGaps: [
      'None identified for this role. Exceptional alignment across all evaluation areas.'
    ],
    suggestedNextRoundQuestions: [
      'How would you mentor junior frontend engineers to write accessible component tests naturally as part of their day-to-day workflow?'
    ],
    recruiterNotes: 'A rare find: combining visual excellence, mathematical token architecture, and deep accessibility certification. Strong hire recommendation.',
    humanDecisionStatus: 'Reviewed - Proceed',
    auditSummary: 'Synthesized from Starlight Financial production metrics, A11y-Tokens CLI open source repository, and VP of Product technical panel.'
  },
  'cand-10': {
    id: 'rep-10',
    candidateId: 'cand-10',
    jobId: 'job-4',
    generatedAt: '2026-09-19T17:45:00Z',
    executiveSummary: 'Tariq Al-Mansoor is a battle-tested Staff SRE with deep expertise in multi-region cloud operations, eBPF networking, and declarative GitOps. He demonstrated proven ability to sustain 99.995% SLA at 85k req/sec throughput while driving substantial infrastructure cost optimizations ($140k/yr saved via Cilium). His disaster recovery runbooks and automated drill discipline reflect senior operational maturity.',
    requirementCoverage: {
      total: 7,
      evidenceFound: 7,
      partiallySupported: 0,
      missing: 0,
      requiresValidation: 0
    },
    verifiedCompetencies: [
      'Multi-Region Kubernetes Administration (12 clusters)',
      'eBPF Socket Layer Kernel Redirection (Cilium sockops)',
      'Declarative GitOps Infrastructure (ArgoCD & OpenTofu)',
      'High-throughput Observability & Metrics Ingestion',
      'Automated Disaster Recovery & Chaos Engineering'
    ],
    unansweredOrInconclusiveAreas: [
      'Internal developer platform (IDP) portal development (Backstage)'
    ],
    keyStrengths: [
      '99.995% SLA sustained in production serving 85,000 req/sec.',
      'Direct kernel networking mastery through eBPF, bypassing standard TCP stack overhead.',
      'Tri-certified: CKA, HashiCorp Terraform Associate, and AWS DevOps Professional.'
    ],
    potentialRisksOrGaps: [
      'Very strong systems background; ensure collaboration expectations with product application developers are aligned.'
    ],
    suggestedNextRoundQuestions: [
      'How would you structure our on-call rotation to prevent burnout during rapid company growth?'
    ],
    recruiterNotes: 'Top-of-market SRE candidate. Demonstrates true deep-tech kernel expertise without dogmatic inflexibility. Immediate asset to platform team.',
    humanDecisionStatus: 'Reviewed - Proceed',
    auditSummary: 'Synthesized from CloudTransit production architecture, eBPF-DropDetector open source codebase, and live interview with Director of Infrastructure.'
  },
  'cand-12': {
    id: 'rep-12',
    candidateId: 'cand-12',
    jobId: 'job-5',
    generatedAt: '2026-09-19T18:00:00Z',
    executiveSummary: 'Soren Lindqvist brings 9 years of distinguished DevSecOps and cybersecurity architecture experience. He has successfully designed Zero-Trust multi-cloud perimeters with cryptographic SPIFFE/SPIRE attestation and Falco runtime defense, while leading three consecutive years of clean SOC2 Type II and ISO 27001 audits. Possesses both offensive (OSCP) and defensive (CISSP, CKS) credentials.',
    requirementCoverage: {
      total: 6,
      evidenceFound: 6,
      partiallySupported: 0,
      missing: 0,
      requiresValidation: 0
    },
    verifiedCompetencies: [
      'Zero-Trust Network Perimeter (SPIFFE/SPIRE & mTLS)',
      'Kubernetes Runtime Syscall Defense (Falco & Cilium)',
      'SOC2 Type II & ISO 27001 Certification Leadership',
      'Open Policy Agent (OPA Gatekeeper) Constraint Enforcement',
      'Penetration Testing & CVE Discovery (OSCP Credential)'
    ],
    unansweredOrInconclusiveAreas: [
      'Hardware security module (HSM) key lifecycle management'
    ],
    keyStrengths: [
      'Rare combination of offensive penetration testing (OSCP) and regulatory audit leadership (CISSP).',
      'Published CVE discoverer with open-source Gatekeeper constraint contributions.',
      'Three consecutive years of flawless SOC2 Type II certifications.'
    ],
    potentialRisksOrGaps: [
      'Requires autonomous authority to define security baselines across cross-functional engineering teams.'
    ],
    suggestedNextRoundQuestions: [
      'How do you handle urgent hotfix deployments when automated security scanning flags a medium-severity vulnerability?'
    ],
    recruiterNotes: 'Flawless candidate profile for our security leadership needs. High integrity, deeply technical, and commercially pragmatic.',
    humanDecisionStatus: 'Reviewed - Proceed',
    auditSummary: 'Synthesized from Vanguard CyberTrust security audits, open-source Gatekeeper policy repositories, and executive security interview.'
  }
};

export const INITIAL_AUDIT_TRAIL: AuditTrailEntry[] = [
  {
    id: 'aud-1',
    timestamp: '2026-09-16T10:32:10Z',
    action: 'Resume Ingestion & Evidence Extraction',
    candidateName: 'Elena Rostova',
    jobTitle: 'Senior Backend Engineer (Distributed Systems)',
    aiModel: 'gemini-3.1-flash-lite',
    requirementAffected: 'All Requirements',
    evidenceExcerpt: 'Extracted 12 skills, 2 detailed work experiences, 2 projects, and 2 certifications with zero extrapolation.',
    modelRationale: 'Strict evidence extraction executed. Fields without explicit resume data were tagged as "Not found in provided evidence".',
    humanReviewerNote: 'Initial profile verified by Recruiter S. Jenkins.'
  },
  {
    id: 'aud-2',
    timestamp: '2026-09-16T10:33:05Z',
    action: 'Requirement Evidence Mapping',
    candidateName: 'Elena Rostova',
    jobTitle: 'Senior Backend Engineer (Distributed Systems)',
    aiModel: 'gemini-3.1-flash-lite',
    requirementAffected: 'Kubernetes Orchestration',
    evidenceExcerpt: 'Docker listed in skills; AWS ECS mentioned; no production Kubernetes cluster evidence cited.',
    modelRationale: 'Assigned status "Requires Validation" because k8s was claimed as a skill keyword without supporting project context.',
    humanReviewerNote: 'Flagged for explicit validation question during first technical round.'
  },
  {
    id: 'aud-3',
    timestamp: '2026-09-18T16:45:30Z',
    action: 'Interview Analysis & Status Verification',
    candidateName: 'Elena Rostova',
    jobTitle: 'Senior Backend Engineer (Distributed Systems)',
    aiModel: 'gemini-3.1-flash-lite',
    requirementAffected: 'Distributed Systems Design',
    evidenceExcerpt: 'Candidate described atomic SETNX with 30s TTL and asyncpg 15-connection ceiling.',
    modelRationale: 'Verified candidate firsthand implementation of idempotency keys. Upgraded status to "Evidence Found" with high confidence.',
    humanReviewerNote: 'Candidate answers were mathematically consistent with resume claims.'
  },
  {
    id: 'aud-4',
    timestamp: '2026-09-18T17:16:00Z',
    action: 'Evaluation Report Generation',
    candidateName: 'Elena Rostova',
    jobTitle: 'Senior Backend Engineer (Distributed Systems)',
    aiModel: 'gemini-3.1-flash-lite',
    requirementAffected: 'Executive Synthesis',
    evidenceExcerpt: 'Coverage: 7 Found, 2 Partial, 0 Missing. Human decision flagged as mandatory.',
    modelRationale: 'Strictly adhered to HireFlow non-decision mandate: no automated Hire/Reject verdict generated.',
    humanReviewerNote: 'Report approved for hiring committee review.'
  },
  {
    id: 'aud-5',
    timestamp: '2026-09-18T18:15:20Z',
    action: 'Interview Analysis & Status Verification',
    candidateName: 'Dr. Aisha Patel',
    jobTitle: 'Machine Learning Engineer (LLM & GenAI)',
    aiModel: 'gemini-3.1-flash-lite',
    requirementAffected: 'RAG Pipeline Architecture',
    evidenceExcerpt: 'Cross-encoder reranking threshold filtering chunks below 0.72 score; uint8 scalar quantization in Qdrant.',
    modelRationale: 'Verified candidate firsthand ownership of RAG pipeline and memory quantization metrics.',
    humanReviewerNote: 'Reviewed by Dr. Reed.'
  },
  {
    id: 'aud-6',
    timestamp: '2026-09-19T10:15:00Z',
    action: 'Requirement Evidence Mapping',
    candidateName: 'Vikram Malhotra',
    jobTitle: 'Senior Backend Engineer (Distributed Systems)',
    aiModel: 'gemini-3.1-flash-lite',
    requirementAffected: 'Distributed Systems Design',
    evidenceExcerpt: 'Custom Raft consensus implementation in Go handling 45,000 metadata commits/sec.',
    modelRationale: 'Identified direct evidence of distributed consensus algorithm authorship.',
    humanReviewerNote: 'Recommended immediate technical deep dive.'
  },
  {
    id: 'aud-7',
    timestamp: '2026-09-19T14:45:00Z',
    action: 'Evaluation Report Generation',
    candidateName: 'Maya Lin',
    jobTitle: 'Staff Frontend Engineer (Design Systems)',
    aiModel: 'gemini-3.1-flash-lite',
    requirementAffected: 'Web Performance & Accessibility',
    evidenceExcerpt: '100% WCAG AAA accessibility verification; 38% bundle size reduction.',
    modelRationale: 'Objective synthesis of design system adoption metrics across 14 web products.',
    humanReviewerNote: 'Hiring manager approved proceed recommendation.'
  },
  {
    id: 'aud-8',
    timestamp: '2026-09-19T17:50:00Z',
    action: 'Evaluation Report Generation',
    candidateName: 'Tariq Al-Mansoor',
    jobTitle: 'Cloud Infrastructure & SRE Lead',
    aiModel: 'gemini-3.1-flash-lite',
    requirementAffected: 'eBPF Network Debugging',
    evidenceExcerpt: 'Cilium eBPF sockops kernel redirection cutting 6ms p99 latency and saving $140k/yr.',
    modelRationale: 'Extracted quantitative cost and latency metrics from verified production logs.',
    humanReviewerNote: 'Committee noted strong alignment with Q4 multi-region initiatives.'
  }
];
