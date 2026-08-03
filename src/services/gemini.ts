import { type Language } from '../utils/translations';

export function generateAIRecommendationsFallback(
  businessName: string,
  challenge: string,
  support: string,
  lang: Language
): string[] {
  if (lang === 'hn') {
    return [
      `"${businessName}" के लिए मोबाइल-फ्रेंडली लैंडिंग पेज बनाएं ताकि "${challenge}" जैसी चुनौतियों का समाधान हो।`,
      `ग्राहकों की पूछताछ को आसान बनाने के लिए "${support}" के लिए स्पष्ट बुकिंग फ्लो जोड़ें।`,
      `स्थानीय खोज और गूगल बिजनेस प्रोफाइल से दृश्यता बढ़ाएं।`,
      `एक सरल अनुवर्ती अनुक्रम (follow-up sequence) शुरू करें ताकि ग्राहक सक्रिय रहें।`,
    ];
  }

  return [
    `Create a mobile-friendly landing page for "${businessName}" to help resolve "${challenge}".`,
    `Add a clear booking/contact flow optimized for your "${support}" needs.`,
    `Improve local visibility with search optimization and a Google Business Profile.`,
    `Set up a simple client follow-up system so inquiries stay engaged.`,
  ];
}

export async function fetchGeminiRecommendations(
  businessName: string,
  challenge: string,
  support: string,
  lang: Language
): Promise<string[]> {
  const apiKey = (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY || 'AIzaSyD5xHl0CYLutvpL8EFyRSICTwesXHycv_0';
  const langPrompt = lang === 'hn' ? 'in Hindi language' : 'in English language';
  const prompt = `Provide exactly 4 concise actionable recommendation points for the business: "${businessName}". Their main challenge is "${challenge}" and they prefer "${support}". Return only a JSON array of 4 strings (e.g. ["point 1", "point 2", "point 3", "point 4"]) ${langPrompt}. Do not use markdown format or wrap in code blocks.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API request failed with status ${response.status}`);
    }

    const data = await response.json();
    let responseText: string = data.candidates[0].content.parts[0].text.trim();
    if (responseText.startsWith('```')) {
      responseText = responseText.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    }

    const parsed = JSON.parse(responseText);
    if (Array.isArray(parsed) && parsed.length >= 4) {
      return parsed.slice(0, 4);
    }
  } catch (error) {
    console.warn('Gemini API call failed, using fallback generator:', error);
  }

  return generateAIRecommendationsFallback(businessName, challenge, support, lang);
}
