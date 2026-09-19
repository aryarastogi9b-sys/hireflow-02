import { JobOpening, CandidateProfile, RequirementEvidenceItem, InterviewSession, EvaluationReport, AuditTrailEntry } from '../types';

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Backend Engineer (Distributed Systems)',
    department: 'Engineering',
    experienceRequired: '4–6 years',
    location: 'San Francisco, CA (Hybrid)',
    employmentType: 'Full-time',
    createdAt: '2026-09-10T14:30:00Z',
    status: 'Active',
    candidateCount: 18,
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
    candidateCount: 14,
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
    candidateCount: 11,
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
        { category: 'Performance & Bundle Optimization', description: 'Tree-shaking, code splitting, layout shift prevention.' }
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
    candidateCount: 5,
    description: `Manage multi-region GCP/AWS infrastructure, zero-trust network boundaries, CI/CD automation, and disaster recovery runbooks.`,
    structuredRequirements: {
      requiredSkills: ['Terraform / OpenTofu', 'Kubernetes Cluster Administration', 'Observability (Prometheus, Grafana, OpenTelemetry)', 'GCP / AWS Multi-cloud'],
      preferredSkills: ['eBPF Network Debugging', 'GitOps with ArgoCD', 'FinOps Cloud Cost Optimization', 'Disaster Recovery Automation'],
      experienceRequirements: ['5+ years dedicated infrastructure / SRE experience'],
      responsibilities: ['Ensure 99.99% multi-region uptime', 'Enforce least-privilege IAM policies', 'Automate continuous deployment pipelines'],
      evaluationAreas: [
        { category: 'Infrastructure as Code', description: 'Declarative module design, drift detection, and state locking.' },
        { category: 'Incident Management', description: 'Root cause analysis, blameless post-mortems, and on-call hygiene.' }
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
      found: 6,
      partial: 2,
      missing: 0,
      requiresValidation: 1,
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
      found: 3,
      partial: 3,
      missing: 2,
      requiresValidation: 1,
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
    status: 'Interview Workspace',
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
      found: 5,
      partial: 1,
      missing: 0,
      requiresValidation: 1,
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
      partial: 2,
      missing: 4,
      requiresValidation: 2,
      total: 10
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
      status: 'Requires Validation',
      evidenceQuote: 'Docker listed in Skills and Work Experience; AWS ECS mentioned, but Kubernetes cluster topologies not explicitly detailed in production entries.',
      source: 'Candidate Resume → Skills',
      explanation: 'Candidate possesses strong container expertise (Docker, AWS ECS) but evidence specifically detailing Kubernetes CRDs, ingress controllers, or Helm charts is absent.',
      validationQuestion: 'What direct hands-on experience do you have deploying, troubleshooting, and configuring Horizontal Pod Autoscaling (HPA) in Kubernetes?'
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
  }
};

export const INITIAL_AUDIT_TRAIL: AuditTrailEntry[] = [
  {
    id: 'aud-1',
    timestamp: '2026-09-16T10:32:10Z',
    action: 'Resume Ingestion & Evidence Extraction',
    candidateName: 'Elena Rostova',
    jobTitle: 'Senior Backend Engineer (Distributed Systems)',
    aiModel: 'gemini-3.8-flash',
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
    aiModel: 'gemini-3.8-flash',
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
    aiModel: 'gemini-3.8-flash',
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
    aiModel: 'gemini-3.8-flash',
    requirementAffected: 'Executive Synthesis',
    evidenceExcerpt: 'Coverage: 7 Found, 2 Partial, 0 Missing. Human decision flagged as mandatory.',
    modelRationale: 'Strictly adhered to HireFlow non-decision mandate: no automated Hire/Reject verdict generated.',
    humanReviewerNote: 'Report approved for hiring committee review.'
  }
];
