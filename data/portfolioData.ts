export interface PortfolioProject {
  title: string
  description: string
  href: string
  tags: string[]
}

const portfolioData: PortfolioProject[] = [
  {
    title: 'Semantic Search — Product Discovery Engine',
    description:
      'Rebuilt the retrieval layer of a Shopify search app serving 10,000+ merchants. End-to-end: failure analysis, LLM-driven synthetic data generation, distributed fine-tuning, and production deployment with TensorRT + Qdrant.',
    href: '/portfolio/semantic-search',
    tags: ['PyTorch', 'TensorRT', 'Qdrant', 'Kubernetes', 'PySpark'],
  },
]

export default portfolioData
