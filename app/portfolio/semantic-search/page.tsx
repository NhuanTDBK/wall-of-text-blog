import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Semantic Search — Product Discovery Engine',
  description:
    'How we rebuilt the retrieval layer for a Shopify search app serving 10,000+ merchants: failure analysis, LLM synthetic data, distributed fine-tuning, and TensorRT + Qdrant deployment.',
})

function TechBadge({ label }: { label: string }) {
  return (
    <span className="rounded bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
      {label}
    </span>
  )
}

function SectionRule({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-5 border-t border-gray-200 pt-12 dark:border-gray-800">
      {children}
    </section>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">{children}</h2>
}

function BodyText({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{children}</p>
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-yellow-700 dark:bg-gray-800 dark:text-yellow-400">
      {children}
    </code>
  )
}

export default function SemanticSearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="space-y-16">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="space-y-5">
          <p className="text-primary-500 dark:text-primary-400 text-xs font-medium tracking-widest uppercase">
            Machine Learning · Search · Production
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            <span className="from-primary-500 bg-gradient-to-r to-indigo-500 bg-clip-text text-transparent">
              Semantic Search
            </span>
            <br />
            Product Discovery Engine
          </h1>

          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Rebuilt the retrieval layer of a Shopify search app serving{' '}
            <strong className="text-gray-900 dark:text-white">10,000+ merchants</strong>. The model
            wasn't broken — it just had never seen how real shoppers search.
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              'PyTorch',
              'Sentence-Transformers',
              'TensorRT',
              'FastAPI',
              'Qdrant',
              'Kubernetes',
              'PySpark · Databricks',
            ].map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </section>

        {/* ── WHY ECOMMERCE SEARCH IS DIFFERENT ─────────────────── */}
        <SectionRule>
          <SectionTitle>Why E-commerce Search Is Different</SectionTitle>

          <BodyText>
            E-commerce queries don't look like the sentences NLP benchmarks are trained on. They're
            short (1–4 tokens), often ungrammatical, frequently misspelled, and sometimes packed
            with specs — <InlineCode>m12 ss nut</InlineCode>, <InlineCode>2hp VFD pump</InlineCode>,{' '}
            <InlineCode>A2-70 bolt</InlineCode>. Amazon's public{' '}
            <strong className="text-gray-900 dark:text-white">ESCI dataset</strong> (130K queries,
            2.6M labeled pairs) captures this well — the hardest retrieval cases aren't the exact
            matches, they're the Substitutes and Complements.
          </BodyText>

          <BodyText>
            This creates a clear division of labour: BM25 stays essential for exact specs and
            catalog codes. Embeddings handle the semantic gap — synonyms, typos, intent,
            multi-attribute binding. The failure mode isn't picking the wrong model, it's expecting
            one approach to do both.
          </BodyText>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
              <div className="mb-2 text-xs font-semibold tracking-wider text-green-600 uppercase dark:text-green-400">
                Embeddings excel at
              </div>
              <ul className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <li className="flex gap-2">
                  <span className="shrink-0 text-green-500">✓</span>
                  <span>
                    Synonym mapping — <InlineCode>&quot;ss nut m12&quot;</InlineCode> ↔ stainless
                    steel hex nut M12
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 text-green-500">✓</span>
                  <span>
                    Typo tolerance — <InlineCode>&quot;sewing macine&quot;</InlineCode> → sewing
                    machine
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 text-green-500">✓</span>
                  <span>Occasion intent — &quot;beach outfit&quot; → swimwear, cover-up</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 text-green-500">✓</span>
                  <span>Multi-attribute — &quot;red sleeveless dress&quot;</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
              <div className="mb-2 text-xs font-semibold tracking-wider text-orange-600 uppercase dark:text-orange-400">
                BM25 still wins at
              </div>
              <ul className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <li className="flex gap-2">
                  <span className="shrink-0 text-orange-400">✗</span>
                  <span>
                    Exact specs — <InlineCode>M12</InlineCode>, <InlineCode>A2-70</InlineCode>,{' '}
                    <InlineCode>ISI 1000l</InlineCode>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 text-orange-400">✗</span>
                  <span>Brand + model number combinations</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 text-orange-400">✗</span>
                  <span>Numerical attributes — &quot;2hp&quot;, &quot;1000l&quot;</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 text-orange-400">✗</span>
                  <span>SKU-level catalog codes</span>
                </li>
              </ul>
            </div>
          </div>
        </SectionRule>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <SectionRule>
          <SectionTitle>The Problem</SectionTitle>

          <BodyText>
            Integration testing flagged a{' '}
            <strong className="text-gray-900 dark:text-white">
              29.5% &quot;Not Good&quot; rate
            </strong>{' '}
            across 162 test queries. The failure analysis classified them into 12 distinct groups —
            each with a different root cause. Color synonyms worked well (4,208 synonym pairs in
            training → 0% &quot;Not Good&quot;). Bottoms taxonomy had zero fit-axis vocabulary → 58%
            &quot;Not Good&quot;. The pattern was clear: failure rate correlated directly with
            coverage in training data.
          </BodyText>

          <div className="space-y-4">
            {/* Taxonomy */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-xs text-gray-500">Taxonomy &amp; Synonyms</span>
                <div
                  className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
                  style={{ height: 6 }}
                >
                  <div
                    className="h-full rounded-full bg-red-400 dark:bg-red-500"
                    style={{ width: '40%' }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-gray-500">40%</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-1">
                <span className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900">
                  <InlineCode>&quot;sweater&quot;</InlineCode>{' '}
                  <span className="mx-1 text-gray-400">→</span> 0 knitwear results
                </span>
                <span className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900">
                  <InlineCode>&quot;skinny pants&quot;</InlineCode>{' '}
                  <span className="mx-1 text-gray-400">→</span> returned baggy styles
                </span>
              </div>
            </div>

            {/* Attribute */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-xs text-gray-500">Attribute Binding</span>
                <div
                  className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
                  style={{ height: 6 }}
                >
                  <div
                    className="h-full rounded-full bg-orange-400 dark:bg-orange-500"
                    style={{ width: '30%' }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-gray-500">30%</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-1">
                <span className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900">
                  <InlineCode>&quot;dress no sleeve&quot;</InlineCode>{' '}
                  <span className="mx-1 text-gray-400">→</span> negation ignored
                </span>
                <span className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900">
                  <InlineCode>&quot;man pink t-shirt&quot;</InlineCode>{' '}
                  <span className="mx-1 text-gray-400">→</span> surfaced women&apos;s
                </span>
              </div>
            </div>

            {/* Intent */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-xs text-gray-500">Intent &amp; Context</span>
                <div
                  className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
                  style={{ height: 6 }}
                >
                  <div
                    className="h-full rounded-full bg-yellow-400 dark:bg-yellow-500"
                    style={{ width: '18%' }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-gray-500">18%</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-1">
                <span className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900">
                  <InlineCode>&quot;beach holiday outfit&quot;</InlineCode>{' '}
                  <span className="mx-1 text-gray-400">→</span> irrelevant results
                </span>
              </div>
            </div>

            {/* Typo */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-xs text-gray-500">Typo Robustness</span>
                <div
                  className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
                  style={{ height: 6 }}
                >
                  <div
                    className="h-full rounded-full bg-blue-400 dark:bg-blue-500"
                    style={{ width: '12%' }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-gray-500">12%</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-1">
                <span className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900">
                  <InlineCode>&quot;whiite shrt&quot;</InlineCode>{' '}
                  <span className="mx-1 text-gray-400">→</span> zero white shirt matches
                </span>
              </div>
            </div>
          </div>
        </SectionRule>

        {/* ── HOW IT WAS FIXED ───────────────────────────────────── */}
        <SectionRule>
          <SectionTitle>How It Was Fixed</SectionTitle>

          <BodyText>
            Each failure group mapped to a specific data gap. The fix wasn't to retrain from scratch
            — it was to surgically generate the missing knowledge, then fine-tune the production
            checkpoint with a low learning rate to avoid catastrophic forgetting.
          </BodyText>

          {/* Pipeline stepper */}
          <div className="overflow-x-auto">
            <div className="flex min-w-[540px] items-start gap-0">
              {[
                { label: 'Log Mining', sub: '500M+ events · Wilson score' },
                { label: 'Failure Analysis', sub: '162 queries · 12 groups' },
                { label: 'LLM Synthetic Gen', sub: '65K–70K pairs · 8 langs' },
                { label: 'Fine-Tuning', sub: 'MNRL · hard negatives' },
                { label: 'Deploy', sub: 'TensorRT · Qdrant · K8S' },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-start">
                  <div className="flex-1 text-center">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 dark:border-gray-800 dark:bg-gray-900/60">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">
                        {step.label}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">{step.sub}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && <div className="mt-3 px-1 text-gray-400">→</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Synthetic data bars */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Synthetic Data — 65K–70K Pairs Across 5 Categories
            </h3>
            <div className="space-y-2.5">
              {[
                {
                  label: 'A · Taxonomy & Synonym',
                  targets: '→ G1, G2, G7',
                  pct: 35,
                  color: 'bg-primary-500',
                },
                {
                  label: 'B · Attribute Binding',
                  targets: '→ G3, G5, G6, G8',
                  pct: 30,
                  color: 'bg-indigo-500',
                },
                {
                  label: 'C · Intent Bridge',
                  targets: '→ G4, G10–G12',
                  pct: 15,
                  color: 'bg-orange-400',
                },
                { label: 'D · Typo Robustness', targets: '→ G9', pct: 10, color: 'bg-yellow-400' },
                {
                  label: 'E · Lexical Baseline',
                  targets: 'regularisation',
                  pct: 8,
                  color: 'bg-green-400',
                },
              ].map(({ label, targets, pct, color }) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">
                      {label} <span className="text-gray-400 dark:text-gray-600">{targets}</span>
                    </span>
                    <span className="text-gray-400 dark:text-gray-600">{pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                    <div
                      className={`h-full rounded-full opacity-80 ${color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multilingual donut */}
          <div className="flex flex-col items-center gap-6 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:flex-row dark:border-gray-800 dark:bg-gray-900/50">
            {/* CSS conic-gradient donut */}
            <div className="relative shrink-0">
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background:
                    'conic-gradient(#0ea5e9 0% 38%, #818cf8 38% 54%, #f59e0b 54% 66%, #10b981 66% 76%, #f43f5e 76% 83%, #a78bfa 83% 90%, #6b7280 90% 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="flex flex-col items-center justify-center rounded-full bg-white dark:bg-gray-950"
                  style={{ width: 66, height: 66 }}
                >
                  <span className="text-xs font-bold text-gray-900 dark:text-white">8+</span>
                  <span className="text-gray-500" style={{ fontSize: 9 }}>
                    langs
                  </span>
                </div>
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
              {[
                { color: '#0ea5e9', lang: 'EN', pct: '38%' },
                { color: '#818cf8', lang: 'DE', pct: '16%' },
                { color: '#f59e0b', lang: 'FR', pct: '12%' },
                { color: '#10b981', lang: 'FI', pct: '10%' },
                { color: '#f43f5e', lang: 'ES', pct: '7%' },
                { color: '#a78bfa', lang: 'JA', pct: '7%' },
                { color: '#6b7280', lang: 'Others', pct: '10%' },
              ].map(({ color, lang, pct }) => (
                <div key={lang} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: color }} />
                  <span className="text-gray-600 dark:text-gray-400">{lang}</span>
                  <span className="ml-auto text-gray-400 dark:text-gray-600">{pct}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            FI and DE received 1.5× oversampling — higher morphological complexity, historically
            lower training coverage.
          </p>
        </SectionRule>

        {/* ── DEPLOYMENT ────────────────────────────────────────── */}
        <SectionRule>
          <SectionTitle>Deployment</SectionTitle>

          {/* Arch diagram */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex min-w-[480px] flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0">
              {[
                {
                  label: 'Storefront',
                  sub: 'Shopify',
                  border: 'border-gray-300 dark:border-gray-700',
                },
                {
                  label: 'FastAPI',
                  sub: 'Business logic',
                  border: 'border-green-300 dark:border-green-900',
                },
                {
                  label: 'TensorRT',
                  sub: 'FP16 inference',
                  border: 'border-purple-300 dark:border-purple-900',
                },
                {
                  label: 'Qdrant',
                  sub: 'Self-managed cluster',
                  border: 'border-blue-300 dark:border-blue-900',
                },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center sm:contents">
                  <div
                    className={`rounded-lg border bg-white px-4 py-3 text-center sm:min-w-[110px] dark:bg-gray-800 ${node.border}`}
                  >
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      {node.label}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500">{node.sub}</div>
                  </div>
                  {i < arr.length - 1 && <span className="px-2 text-gray-400 sm:block">→</span>}
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-gray-400">
              ☸️ All orchestrated by{' '}
              <strong className="text-gray-600 dark:text-gray-300">Kubernetes</strong> —
              auto-scaling, rolling deploys, self-healing
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>
              <strong className="text-gray-900 dark:text-white">TensorRT</strong> — FP16
              quantisation + kernel fusion reduces embedding inference latency vs. raw PyTorch.
              Model weights are frozen post-training, so quantisation loss is acceptable.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Self-managed Qdrant</strong> — At
              10K+ merchant scale, managed vector DBs hit cost ceilings quickly. Self-managed with
              per-tenant collection isolation and horizontal sharding gave better cost/performance
              control.
            </p>
          </div>
        </SectionRule>

        {/* ── RESULTS ───────────────────────────────────────────── */}
        <SectionRule>
          <SectionTitle>Results</SectionTitle>
          <BodyText>
            Each target has a direct lineage back to specific failure groups and training data
            allocation.
          </BodyText>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                label: 'Integration "Good" Rate',
                target: '≥70%',
                before: '54.7%',
                pct: 70,
                color: 'bg-green-400',
              },
              {
                label: 'Integration "Not Good" Rate',
                target: '≤15%',
                before: '29.5%',
                pct: 15,
                color: 'bg-red-400',
              },
              {
                label: 'Semantic Exact Match',
                target: '≥55%',
                before: '40.8%',
                pct: 55,
                color: 'bg-blue-400',
              },
              {
                label: 'Gender Precision',
                target: '≥95%',
                before: '~70%',
                pct: 95,
                color: 'bg-purple-400',
              },
              {
                label: 'Semantic Irrelevant Rate',
                target: '≤10%',
                before: '18.3%',
                pct: 10,
                color: 'bg-orange-400',
              },
              {
                label: 'Negation Accuracy',
                target: '≥75%',
                before: '~0%',
                pct: 75,
                color: 'bg-teal-400',
              },
            ].map(({ label, target, before, pct, color }) => (
              <div
                key={label}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60"
              >
                <div className="mb-1 text-xs text-gray-400 dark:text-gray-600">{label}</div>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{target}</span>
                  <span className="text-xs text-gray-400 line-through dark:text-gray-600">
                    {before}
                  </span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <div
                    className={`h-full rounded-full opacity-70 ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionRule>

        {/* ── WHAT MATTERED ─────────────────────────────────────── */}
        <SectionRule>
          <SectionTitle>What Actually Mattered</SectionTitle>

          <div className="space-y-6 text-sm text-gray-500 dark:text-gray-400">
            <div>
              <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                The failure analysis was worth more than any hyperparameter tuning
              </p>
              <p className="leading-relaxed">
                Before writing a single training pair, classifying the 162 failing queries into 12
                groups revealed that color worked (4,208 synonyms in training) but bottoms taxonomy
                had zero fit-axis vocabulary. That one insight determined 35% of the training
                budget.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
              <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                Hard negatives are where the margin is
              </p>
              <p className="leading-relaxed">
                MNRL with random in-batch negatives gets you to 60–65% &quot;Good&quot;. The jump to
                ≥70% required explicit hard negatives calibrated to cosine similarity [0.3, 0.7].
                Too easy and the model ignores them. Too hard and they introduce label noise.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
              <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                Finnish and German are a different problem than English
              </p>
              <p className="leading-relaxed">
                Finnish compound words (villapaita, farkut) and German umlaut normalisation required
                entirely separate prompt templates — not just translations of the English prompt.
                Generic multilingual generation produced garbage for agglutinative languages.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
              <p className="mb-1 font-semibold text-gray-900 dark:text-white">
                The regression holdout was the only real safety net
              </p>
              <p className="leading-relaxed">
                Overfitting to synthetic patterns is invisible on the synthetic eval set. The
                preservation holdout of current-&quot;Good&quot; queries was the only signal that
                caught when training was helping new queries while quietly breaking old ones.
              </p>
            </div>
          </div>
        </SectionRule>

        <div className="h-8" />
      </div>
    </div>
  )
}
