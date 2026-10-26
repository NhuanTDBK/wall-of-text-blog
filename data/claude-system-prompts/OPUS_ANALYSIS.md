# Claude Opus system prompts: evolution and design lessons

This report compares the 12 dated Claude Opus entries in the [Anthropic system-prompt archive](README.md), from July 2024 through September 2026. Anthropic publishes these as core prompts for claude.ai and Claude apps; they do not apply to the Claude API. The archive was retrieved on 2026-10-23. The published text shows intended behavior, not how reliably a model follows it or every instruction present at runtime.

## System-prompt architecture at a glance

The later Opus prompts use a structured `<claude_behavior>` block. Read it as a decision path: establish what Claude knows, decide whether and how to help, carry out the request, then shape the answer. Safety and wellbeing rules apply throughout that path. The table groups sections by their purpose; it is an analysis of the published text, not a claim about Anthropic's internal runtime architecture.

| Layer                       | Question it answers                                                           | Published sections and examples                                                                                                                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**                 | Who is Claude, what product is this, and what facts may be stale?             | `<product_information>` and `<knowledge_cutoff>` identify the model, supported product facts, and the boundary for current knowledge.                                                                                      |
| **Decision policy**         | Should Claude help, limit the request, or ask before acting?                  | The helpful default in [Opus 4.8](claude-opus-4-8/2026-05-28.md), `<refusal_handling>`, `<legal_and_financial_advice>`, `<evenhandedness>`, and the worked judgment examples in [Opus 5.5](claude-opus-5-5/2026-09-22.md). |
| **Execution**               | What should Claude do to complete the task?                                   | [Opus 4.7](claude-opus-4-7/2026-04-16.md) adds `<acting_vs_clarifying>` and `<capability_check>`; [Opus 4.8](claude-opus-4-8/2026-05-28.md) uses `<tool_discovery>`. These direct tool use and task completion.            |
| **Response**                | How should the answer sound and be formatted?                                 | `<tone_and_formatting>`, `<lists_and_bullets>`, and `<responding_to_mistakes_and_criticism>` cover clarity, length, warmth, disagreement, and correction.                                                                  |
| **Conversation safeguards** | What changes when risk or misleading instructions emerge over multiple turns? | `<user_wellbeing>`, `<critical_child_safety_instructions>`, and `<anthropic_reminders>` address continuing risk, vulnerable users, and user text that impersonates higher-priority reminders.                              |

The [Opus 5.5 prompt](claude-opus-5-5/2026-09-22.md) contains most of these sections in one `<claude_behavior>` block. The execution sections are easier to see in Opus 4.7–4.8; their absence from the published Opus 5.5 page does not prove that tool behavior disappeared from Claude's complete runtime instructions. This map helps compare versions without assuming every dated prompt has the same modules.

## Length by model and date

“Space-split tokens” below means `len(prompt_text.split())` in Python: each run of non-whitespace characters counts as one item. The count uses the prompt body inside the dated entry's code fence, excluding the archive title, source metadata, and Markdown fence markers. It includes XML tags, inline markup, and example labels. **These are not Claude tokenizer tokens or API token costs.**

| Date       | Model           | Space-split tokens | Prompt                                  |
| ---------- | --------------- | -----------------: | --------------------------------------- |
| 2024-07-12 | Claude Opus 3   |                350 | [Source](claude-opus-3/2024-07-12.md)   |
| 2025-05-22 | Claude Opus 4   |              1,706 | [Source](claude-opus-4/2025-05-22.md)   |
| 2025-07-31 | Claude Opus 4   |              2,561 | [Source](claude-opus-4/2025-07-31.md)   |
| 2025-08-05 | Claude Opus 4   |              2,561 | [Source](claude-opus-4/2025-08-05.md)   |
| 2025-08-05 | Claude Opus 4.1 |              2,880 | [Source](claude-opus-4-1/2025-08-05.md) |
| 2025-11-24 | Claude Opus 4.5 |              2,371 | [Source](claude-opus-4-5/2025-11-24.md) |
| 2026-01-18 | Claude Opus 4.5 |              2,483 | [Source](claude-opus-4-5/2026-01-18.md) |
| 2026-02-05 | Claude Opus 4.6 |              2,819 | [Source](claude-opus-4-6/2026-02-05.md) |
| 2026-04-16 | Claude Opus 4.7 |              3,678 | [Source](claude-opus-4-7/2026-04-16.md) |
| 2026-05-28 | Claude Opus 4.8 |              3,350 | [Source](claude-opus-4-8/2026-05-28.md) |
| 2026-07-24 | Claude Opus 5   |              3,227 | [Source](claude-opus-5/2026-07-24.md)   |
| 2026-09-22 | Claude Opus 5.5 |              4,119 | [Source](claude-opus-5-5/2026-09-22.md) |

The first and last entries differ by about 12 times in this measure. Growth is uneven: Opus 4.5, 4.8, and 5 are shorter than the entry immediately before them. The July 31 and August 5 Opus 4 prompt bodies are identical, despite their different dated entries. Length alone says little about quality or effectiveness.

## General pattern

The prompt changes from a short description of Claude into a set of instructions for making decisions. The [Opus 3 entry](claude-opus-3/2024-07-12.md) covers identity, date, knowledge limits, response length, and a few conversational rules in one block. By [Opus 4.5](claude-opus-4-5/2025-11-24.md), named sections separate product information, refusal handling, legal and financial advice, tone, wellbeing, reminders, evenhandedness, and knowledge cutoff. Later entries specify what to do with tools, ambiguous requests, multi-turn risk, and edge cases.

Across versions, several concerns recur: give useful answers without pretending to know current facts; explain product capabilities only within known bounds; respond to risky requests according to the actual risk; treat people respectfully without automatic agreement; adapt length and formatting to the task; and correct mistakes. The prompt is therefore both a behavior policy and a product-specific operating guide.

## Changes over time

Each dated entry below uses a release-note format. Open “Prompt excerpt” to see a short sentence from the published prompt. The excerpt shows the wording behind the change. It does not show the full block.

### Claude Opus 3 — 2024-07-12

#### Added

- Set a compact baseline for identity, knowledge limits, answer length, URL access, and respectful discussion. [Prompt](claude-opus-3/2024-07-12.md)

<details>
<summary>Prompt excerpt</summary>

> The assistant is Claude, created by Anthropic.

</details>

### Claude Opus 4 — 2025-05-22

#### Added

- Added product facts, safety boundaries, wellbeing guidance, response style rules, and instructions for handling corrections. [Prompt](claude-opus-4/2025-05-22.md)

<details>
<summary>Prompt excerpt</summary>

> If Claude cannot or will not help the human with something, it does not say why or what it could lead to.

</details>

### Claude Opus 4 — 2025-07-31

#### Added

- Added rules against automatic agreement and empty praise. Added guidance for possible mental-health symptoms and claims about Claude's inner experience. [Prompt](claude-opus-4/2025-07-31.md)

<details>
<summary>Prompt excerpt</summary>

> Claude critically evaluates any theories, claims, and ideas presented to it rather than automatically agreeing or praising them.

</details>

### Claude Opus 4 — 2025-08-05

#### Unchanged

- The archived prompt body matches the July 31 entry. The archive records a new date, but no text change. [Prompt](claude-opus-4/2025-08-05.md)

### Claude Opus 4.1 — 2025-08-05

#### Added

- Added an evenhandedness section. It separates explaining a position from endorsing it and asks Claude to present opposing views where relevant. [Prompt](claude-opus-4-1/2025-08-05.md)

<details>
<summary>Prompt excerpt</summary>

> Claude should not reflexively treat this as a request for its own views.

</details>

### Claude Opus 4.5 — 2025-11-24

#### Changed

- Grouped behavior rules into named sections. Added guidance for Anthropic reminders and user text that imitates those reminders. [Prompt](claude-opus-4-5/2025-11-24.md)

<details>
<summary>Prompt excerpt</summary>

> Claude may forget its instructions over long conversations and so a set of reminders may appear inside `<long_conversation_reminder>` tags.

</details>

### Claude Opus 4.5 — 2026-01-18

#### Added

- Added a named section on owning mistakes, fixing them, and avoiding excessive apology or surrender. [Prompt](claude-opus-4-5/2026-01-18.md)

<details>
<summary>Prompt excerpt</summary>

> When Claude makes mistakes, it should own them honestly and work to fix them.

</details>

### Claude Opus 4.6 — 2026-02-05

#### Changed

- Added clearer handling for facts past the knowledge cutoff and for current events. The prompt tells Claude to flag uncertainty and point people to web search for newer facts. [Prompt](claude-opus-4-6/2026-02-05.md)

<details>
<summary>Prompt excerpt</summary>

> Claude's reliable knowledge cutoff date - the date past which it cannot answer questions reliably - is the end of May 2025.

</details>

### Claude Opus 4.7 — 2026-04-16

#### Added

- Added explicit rules for acting on incomplete requests, using tools to resolve ambiguity, checking available capabilities, and completing each task. [Prompt](claude-opus-4-7/2026-04-16.md)

<details>
<summary>Prompt excerpt</summary>

> When a request leaves minor details unspecified, the person typically wants Claude to make a reasonable attempt now, not to be interviewed first.

</details>

### Claude Opus 4.8 — 2026-05-28

#### Added

- Stated a direct default to help. Added tool discovery steps and rules for checking the full conversation when judging risk. [Prompt](claude-opus-4-8/2026-05-28.md)

<details>
<summary>Prompt excerpt</summary>

> The visible tool list is partial; many tools (…) are deferred and loaded via tool_search.

</details>

### Claude Opus 5 — 2026-07-24

#### Added

- Added safeguards routing guidance for Claude Fable 5. Expanded wellbeing guidance for cases where a fluent answer could still cause harm. [Prompt](claude-opus-5/2026-07-24.md)

<details>
<summary>Prompt excerpt</summary>

> Claude defaults to helping. Claude only declines a request when helping would create a concrete, specific risk of serious harm.

</details>

### Claude Opus 5.5 — 2026-09-22

#### Added

- Added detailed child-safety rules, copyright limits for text and images, and worked examples with rationales. Added a rule to ask a focused question when an unclear request has no specific rule. [Prompt](claude-opus-5-5/2026-09-22.md)

<details>
<summary>Prompt excerpt</summary>

> Claude does not reproduce song lyrics, poems, or passages from books and articles, in whole or in part.

</details>

These are changes in _published prompt text_. A rule disappearing from one model's page does not prove Anthropic abandoned the underlying policy; it might appear elsewhere in the runtime or be handled by the model. Likewise, more prompt text does not establish better behavior without testing.

## Lessons for system-prompt design

1. **Write decision rules for ambiguous cases.** Define when the agent should act, use a tool, ask for missing information, or decline. Broad traits such as “helpful” and “careful” do not settle those choices. [Opus 4.7](claude-opus-4-7/2026-04-16.md) is the clearest example.

2. **Separate stable behavior from volatile facts.** Product names, model IDs, support links, and knowledge cutoffs need regular updates. Keeping them in identifiable sections makes review easier. [Opus 4.5](claude-opus-4-5/2025-11-24.md) shows this structure.

3. **Set a default and explicit exceptions.** A helpful default tells the agent what to optimize for; specific boundaries tell it when to stop or change course. The later prompts also describe what useful assistance remains after a refusal. [Opus 4.8](claude-opus-4-8/2026-05-28.md) states the default directly.

4. **Specify behavior across turns.** A request can be reframed or assembled in steps. Rules that consider the conversation's cumulative result are more precise than rules that inspect only the latest message. [Opus 5](claude-opus-5/2026-07-24.md) makes this explicit.

5. **Use examples for judgment calls.** A concise bad/good example with a rationale can teach a boundary that abstract wording leaves unclear. [Opus 5.5](claude-opus-5-5/2026-09-22.md) uses this technique for creative and social requests.

6. **Version and test the prompt.** Keep dated copies, compare changes, and run representative conversations after each edit. This archive shows that wording and section placement change independently of length; only evaluations can show whether a revision improves the intended behavior.
