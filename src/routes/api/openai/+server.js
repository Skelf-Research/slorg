import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { encoding_for_model } from 'tiktoken';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

function countTokens(text, model = 'gpt-4o') {
  //const encoder = encoding_for_model(model);
  //const tokens = encoder.encode(text);
  //encoder.free();
  return 0;
  //return tokens.length;
}

async function callOpenAI(system, user) {
  const inputTokens = countTokens(system) + countTokens(user);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: `${system} Provide your response as a valid JSON object.` },
      { role: "user", content: user }
    ],
    response_format: { "type": "json_object" }
  });
  const totalTokens = inputTokens + completion.usage.total_tokens;
  return { content: completion.choices[0].message.content, tokens: totalTokens };
}

export async function POST({ request }) {
  const { action, payload } = await request.json();
  let result, tokens;

  // Get additional context from request headers
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'Unknown';
  const acceptLanguage = request.headers.get('accept-language') || 'Unknown';
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
  const currentDate = new Date().toISOString();

  try {
    switch (action) {
      case 'generateAnswerAndGraph':
        ({ content: result, tokens } = await callOpenAI(
          "Generate an answer and a knowledge graph for the given query. The answer should be a concise and accurate response to the query. The knowledge graph should be a structured representation of the query, including entities, relationships, and other relevant information.",
          payload
        ));
        break;
      case 'extractKeywords':
        ({ content: result, tokens } = await callOpenAI(
          "Extract a list of potential search keywords from the given knowledge graph. The keywords should be a concise and accurate representation of the query, including entities, relationships, and other relevant information.",
          JSON.stringify(payload)
        ));
        break;
      case 'processHtmlContent':
        ({ content: result, tokens } = await callOpenAI(
          "Analyze HTML content and determine its relevance (as a score between 0 and 1) to the given query. Extract the main textual content from the HTML, ignoring boilerplate elements like headers, footers, and navigation. Then, determine how well this query is answered by the extracted content and strict about the rating. Consider the provided context information when analyzing relevance. Return the matchScore and the extractedContent.",
          `Query: ${payload.query}

Context Information:
- Current Date: ${currentDate}
- User IP: ${ipAddress}
- User Agent: ${userAgent}
- Accept-Language: ${acceptLanguage}
- Timezone: ${timezone}

HTML content: ${payload.html}`
        ));
        break;
      default:
        return json({ error: 'Invalid action' }, { status: 400 });
    }

    // Parse the JSON result
    const parsedResult = JSON.parse(result);
    return json({ result: parsedResult, tokens });
  } catch (error) {
    console.error('Error processing request:', error);
    return json({ error: 'Error processing request' }, { status: 500 });
  }
}
