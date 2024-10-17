export async function generateAnswerAndGraph(query) {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generateAnswerAndGraph', payload: query })
    });
    return await response.json();
  }
  
  export async function extractKeywords(graph) {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'extractKeywords', payload: graph })
    });
    return await response.json();
  }
  
  export async function searchSearxNG(keywords) {
    const response = await fetch(`https://search-dev.d736.uk/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        q: keywords,
        format: 'json',
        engines: 'google,yahoo,bing,duckduckgo',
        limit: '20',
      }),
    });
    const data = await response.json();
    return data.results;
  }
  
  export async function fetchHtml(url) {
    const response = await fetch('/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await response.json();
    
    // Parse HTML and extract text content
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.content, 'text/html');
    const textContent = doc.body.textContent || "";
    
    return textContent.trim();
  }
  
  export async function processHtmlContent(html, query, originalAnswer) {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'processHtmlContent', payload: { html, query: query, answer: originalAnswer } })
    });
    return await response.json();
  }
