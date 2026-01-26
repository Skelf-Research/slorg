# Data Flow

This document describes how data flows through LORG during a search operation.

## Search Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Search Flow                                  │
└─────────────────────────────────────────────────────────────────────┘

User Query
    │
    ▼
┌─────────────────┐
│ 1. Generate     │──────────────────┐
│ Answer & Graph  │                  │
└─────────────────┘                  │
    │                                │
    ▼                                ▼
┌─────────────────┐           ┌────────────┐
│ 2. Extract      │           │  OpenAI    │
│ Keywords        │◄──────────│  API       │
└─────────────────┘           └────────────┘
    │
    ▼
┌─────────────────┐           ┌────────────┐
│ 3. Web Search   │──────────►│  SearxNG   │
│                 │◄──────────│  API       │
└─────────────────┘           └────────────┘
    │
    ▼
┌─────────────────┐
│ 4. Fetch HTML   │──────────► Web Pages
│ Content         │◄──────────
└─────────────────┘
    │
    ▼
┌─────────────────┐           ┌────────────┐
│ 5. Score        │──────────►│  OpenAI    │
│ Relevance       │◄──────────│  API       │
└─────────────────┘           └────────────┘
    │
    ▼
┌─────────────────┐
│ 6. Rank &       │
│ Return Results  │
└─────────────────┘
    │
    ▼
Final Results
```

## Step-by-Step Process

### Step 1: Generate Answer and Knowledge Graph

**Input**: User query string

**Process**:
1. Query sent to OpenAI API
2. System prompt requests answer + knowledge graph
3. Response parsed as JSON

**Output**:
```javascript
{
  answer: "Machine learning is a subset of AI...",
  knowledge_graph: {
    entities: ["machine learning", "AI", "algorithms"],
    relationships: [
      { from: "machine learning", to: "AI", type: "subset_of" }
    ]
  }
}
```

**Tokens**: Counted and accumulated

### Step 2: Extract Keywords

**Input**: Knowledge graph from Step 1

**Process**:
1. Knowledge graph serialized to JSON
2. Sent to OpenAI for keyword extraction
3. Response parsed as array

**Output**:
```javascript
["machine learning", "AI", "neural networks", "algorithms"]
```

**Tokens**: Added to running count

### Step 3: Web Search

**Input**: Keywords array

**Process**:
1. Keywords joined into search query
2. POST request to SearxNG API
3. Results from multiple search engines aggregated

**Output**:
```javascript
[
  {
    url: "https://example.com/ml-intro",
    title: "Introduction to Machine Learning",
    content: "Preview snippet...",
    engine: "google"
  },
  // ... more results
]
```

### Step 4: Fetch HTML Content

**Input**: URLs from search results

**Process**:
1. HTTP GET request to each URL
2. HTML parsed with JSDOM
3. Text content extracted from body

**Output**: Plain text content from each page

### Step 5: Score Relevance

**Input**:
- Extracted HTML content
- Original query
- Generated answer

**Process**:
1. Content sent to OpenAI with context
2. AI analyzes relevance to query
3. Returns match score (0-1) and extracted content

**Output**:
```javascript
{
  matchScore: 0.92,
  extractedContent: "The relevant portion of the content..."
}
```

**Tokens**: Added to running count

### Step 6: Rank and Return

**Input**: All processed results

**Process**:
1. Results sorted by relevance score
2. Top N results selected
3. Final response assembled

**Output**:
```javascript
{
  answer: "Machine learning is...",
  knowledgeGraph: { ... },
  keywords: ["ML", "AI", ...],
  results: [
    {
      answer: "...",
      source: "https://...",
      score: 0.92,
      content: "...",
      title: "..."
    }
  ],
  tokenCount: 1523
}
```

## Data Transformations

### Query → Answer

```
"What is ML?" → "Machine learning is a subset of AI that enables..."
```

### Query → Knowledge Graph

```
"What is ML?" → {
  entities: [...],
  relationships: [...]
}
```

### Knowledge Graph → Keywords

```
{ entities: ["ML", "AI"] } → ["machine learning", "AI", "neural networks"]
```

### Keywords → Search Results

```
"machine learning AI" → [{ url, title, content }, ...]
```

### HTML → Relevance Score

```
"<html>...</html>" → { matchScore: 0.92, extractedContent: "..." }
```

## Token Usage

Tokens are consumed at these stages:

| Stage | Operation | Typical Tokens |
|-------|-----------|----------------|
| Step 1 | Answer + Graph | 500-800 |
| Step 2 | Keyword extraction | 100-200 |
| Step 5 | Content analysis (per page) | 200-400 |

Total per search: ~1000-3000 tokens (varies by query complexity and result count)

## Error Handling

Each step has error handling:

1. **OpenAI errors**: Retry or fail with message
2. **Search errors**: Return empty results, continue
3. **Fetch errors**: Skip URL, continue with others
4. **Parse errors**: Log warning, use defaults

## Next Steps

- [Components](components.md) - Component details
- [API Reference](../api-reference/lorg-search.md) - Method documentation
