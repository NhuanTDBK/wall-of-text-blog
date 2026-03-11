export interface ExperienceProject {
  name: string
  description: string
  highlights: string[]
  tech?: string[]
}

export interface WorkExperience {
  company: string
  role: string
  period: string
  location: string
  summary?: string
  projects: ExperienceProject[]
}

const experienceData: WorkExperience[] = [
  {
    company: 'Clearer.io',
    role: 'Senior ML Engineer',
    period: 'Apr 2023 – Present',
    location: 'Remote',
    projects: [
      {
        name: 'Semantic Search System',
        description:
          'Led end-to-end development of distributed, multi-tenant, multilingual semantic search system serving 10M requests/day, achieved p99 < 35ms latency and processing over 33TB event data.',
        highlights: [
          'Solved critical market expansion blocker: designed language-agnostic embedding strategy enabling same-day market launch without retraining. Unlocked 5 new international markets (Germany, Netherlands, Japan, Spain)',
          'Identified that 73% of customer complaints stemmed from empty search results. Prioritized semantic understanding, reducing support tickets by 2,400/month ($180K annual savings)',
          'Improved CTR by 50%, conversion rate by 20%, reduced 67% empty search results rate — improving app store rating to 4.8 stars',
          'Handling multi-tenancy with data isolation, maintaining cache efficiently using consistent hashing across distributed Qdrant database cluster',
          'Solved multi-lingual cold-start in non-English, niche categories through curated LLM query validation at scale',
          'Architected distributed search infrastructure across 3 regions with active-active replication, handling 200 QPS peak traffic. Designed sharding strategy partitioning 50M embeddings by tenant, enabling horizontal scaling while maintaining 35ms p99 latency',
        ],
        tech: ['PyTorch', 'ONNX', 'Qdrant', 'HNSW', 'FastAPI', 'Kubernetes', 'AWS Fargate', 'AWS CDK', 'Docker'],
      },
      {
        name: 'AI Review Summarization',
        description: 'Built GenAI system processing 100K+ reviews for 300+ stores.',
        highlights: [
          'Developed cost-optimized LLM pipeline maintaining 90% accuracy at 10x lower cost than GPT-4',
          'Improved merchant NPS by 4% through actionable review insights',
          'Implemented Map-Reduce paradigm for distributed processing with sentiment analysis',
        ],
        tech: ['LLaMA3', 'vLLM', 'Databricks', 'Spark', 'Airflow', 'AWS S3', 'AWS Fargate'],
      },
      {
        name: 'Text2SQL MCP Integration',
        description: 'Architected AI-powered data insights platform.',
        highlights: [
          'Built authenticated MCP servers with semantic caching reducing query time by 60%',
          'Integrated with data warehouse enabling natural language analytics for non-technical users',
        ],
        tech: ['MCP', 'LLM', 'SQL', 'Semantic Cache'],
      },
      {
        name: 'ML Leadership',
        description: 'Established ML architecture review board and drove company-wide engineering standards.',
        highlights: [
          'Established ML architecture review board, creating design patterns adopted by 6 teams',
          'Led RFC process for company-wide feature store implementation, reducing duplicate effort across teams by 40%',
        ],
        tech: [],
      },
    ],
  },
  {
    company: 'One Mount Group',
    role: 'Expert Data Scientist',
    period: 'Jun 2020 – Apr 2023',
    location: 'Hanoi, Vietnam',
    summary: 'Built AutoML platform reducing ML deployment time from weeks to days, serving 10M+ users',
    projects: [
      {
        name: 'AutoML Recommendation Platform',
        description: 'Led development of multi-tenant recommendation system.',
        highlights: [
          'Processed 200 GB-scale data with distributed GPU training using NVIDIA RAPIDS',
          'Onboarded 6 use cases, achieving 20% CTR increase and 14% conversion uplift',
          'Built ML pipeline with automated A/B testing, model versioning, and drift detection',
        ],
        tech: ['PyTorch', 'Kubeflow', 'NVIDIA RAPIDS', 'Redis', 'Docker', 'GCP'],
      },
      {
        name: 'Customer 360 Platform',
        description: 'Architected unified customer data platform for 10M+ users.',
        highlights: [
          'Consolidated 200+ attributes from multiple touchpoints across fintech, e-commerce, real estate',
          'Led cross-functional team of 12 (Data Engineering, Governance, Science, Analytics)',
          'Enabled advanced segmentation driving $5M in targeted campaign revenue',
        ],
        tech: ['Spark', 'Kafka', 'Airflow', 'GCP', 'BigQuery'],
      },
      {
        name: 'Demand Forecasting',
        description: 'Built ML models for B2B inventory optimization.',
        highlights: [
          'Reduced stockouts by 30% through time-series forecasting with external data integration',
          'Implemented seasonal decomposition and trend analysis for 1000+ SKUs',
        ],
        tech: ['Python', 'Prophet', 'XGBoost', 'Spark'],
      },
    ],
  },
  {
    company: 'Open Commerce Group',
    role: 'Data Scientist',
    period: 'Nov 2017 – Jun 2020',
    location: 'Hanoi, Vietnam',
    summary: 'Built recommendation engine and data platform serving 100K+ merchants',
    projects: [
      {
        name: 'Graph-based Recommendation Engine',
        description: 'Developed real-time recommendation system.',
        highlights: [
          'Implemented in-memory graph traversal serving 1M+ requests/day with sub-second latency',
          'Built Lambda architecture with Spark, Kafka, Redis for real-time feature engineering',
        ],
        tech: ['Golang', 'Spark', 'Redis', 'RabbitMQ', 'Kubernetes', 'Kafka'],
      },
      {
        name: 'E-commerce Intelligence Platform',
        description: 'Led team building competitive intelligence tools.',
        highlights: [
          'Processed 1TB+ daily logs from multiple marketplaces (Shopify, AliExpress, Taobao)',
          'Built analytics stack: S3, Kinesis, Lambda, Athena serving 50+ data analysts',
        ],
        tech: ['AWS S3', 'Kinesis', 'Lambda', 'Athena', 'Spark'],
      },
    ],
  },
  {
    company: 'Apvera',
    role: 'Data Scientist',
    period: 'Aug 2017 – Oct 2017',
    location: 'Singapore',
    summary: 'IoT Security Startup',
    projects: [
      {
        name: 'IoT Anomaly Detection',
        description: 'Developed anomaly detection for IoT security processing 100M+ events/day.',
        highlights: [
          'Built Lambda architecture with Spark, Kafka, Cassandra for distributed stream processing',
          'Processed 100M+ events/day for real-time threat detection',
        ],
        tech: ['Spark', 'Kafka', 'Cassandra', 'Python'],
      },
    ],
  },
]

export default experienceData
