import { GoogleGenAI, Type } from "@google/genai";
import { PropertyType } from '../types';

// FIX: Removed conditional API_KEY assignment to strictly adhere to using environment variables as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const searchSchema = {
  type: Type.OBJECT,
  properties: {
    type: {
      type: Type.STRING,
      description: "The type of property to search for.",
      enum: Object.values(PropertyType),
    },
    location: {
      type: Type.STRING,
      description: "The city, country, or specific area for the property. E.g., 'Downtown Dubai'",
    },
    dateFrom: {
      type: Type.STRING,
      description: "The desired move-in or check-in date. Format: YYYY-MM-DD. Infer from phrases like 'next month', 'immediately', or specific dates.",
    },
    guests: {
      type: Type.INTEGER,
      description: "The number of people for a resort, room, or PG.",
    },
  },
  required: ["type", "location"],
};


export const parseTravelQuery = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse the following user query for a property search and extract the details. Today's date is ${new Date().toISOString().split('T')[0]}. Query: "${query}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: searchSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Basic validation
    if (!parsedData.type || !Object.values(PropertyType).includes(parsedData.type)) {
        throw new Error("Invalid property type returned by AI.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error parsing property query with Gemini:", error);
    throw new Error("Sorry, I couldn't understand your request. Please try rephrasing or use the manual search form.");
  }
};
