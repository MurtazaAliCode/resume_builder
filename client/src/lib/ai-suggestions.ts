import { GoogleGenAI } from "@google/genai";

const mockSuggestions = {
  title: [
    'Senior Software Engineer',
    'Full Stack Developer',
    'Frontend Specialist',
    'Software Development Engineer'
  ],
  technical: [
    'JavaScript, TypeScript, React, Node.js, Python, SQL, MongoDB, AWS',
    'React, Vue.js, Angular, Next.js, Express.js, PostgreSQL, Docker',
    'Python, Django, FastAPI, PostgreSQL, Redis, AWS, Kubernetes',
    'Java, Spring Boot, Microservices, MySQL, Apache Kafka, Jenkins'
  ],
  description: [
    'Developed scalable web applications serving 100K+ users with React and Node.js',
    'Led a team of 5 engineers to deliver high-quality software solutions on time',
    'Implemented responsive designs and optimized application performance by 40%',
    'Collaborated with cross-functional teams to define and implement new features'
  ]
};

export async function generateAISuggestions(field: string, value: string): Promise<string[]> {
  // Try to use the real Gemini API first
  try {
    return await generateAISuggestionsWithGemini(field, value);
  } catch (error) {
    console.warn('Falling back to mock suggestions:', error);
    return generateMockSuggestions(field, value);
  }
}

function generateMockSuggestions(field: string, value: string): string[] {
  // Simulate API delay
  setTimeout(() => {}, 500);
  
  // Return mock suggestions based on field type
  if (field in mockSuggestions) {
    return mockSuggestions[field as keyof typeof mockSuggestions];
  }
  
  return [];
}

// Real Gemini API implementation
export async function generateAISuggestionsWithGemini(field: string, value: string): Promise<string[]> {
  try {
    // Make request to our backend API endpoint which has the Gemini API key
    const response = await fetch('/api/ai/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        field,
        value
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    throw error;
  }
}
