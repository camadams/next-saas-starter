import { db } from "./db/drizzle";
import { categoryTable, Spending } from "./db/schema";

const jsonString =
  '{"date": "09/09/2024","price": 300.00,"description": "Indoor plants: Bluncorn and Purple Queen","category": "other"}';
const jsonString2 =
  '{"date": "09/09/2024","price": 300,"description": "Indoor plants purchase","category": null}';
// Use JSON.parse to convert it into an object
const data = JSON.parse(jsonString2);

// TypeScript will infer the types based on the structure of the object
// console.log({ data });

export const typedData: Spending = JSON.parse(jsonString);

// console.log({ typedData });
// console.log(typeof typedData.price);
// console.log(isTypeOfSpending(typedData));

export function isTypeOfSpending(obj: any): obj is Spending {
  return (
    typeof obj.date === "string" &&
    typeof obj.price === "number" &&
    typeof obj.description === "string" &&
    typeof obj.category === "string"
  );
}

export type ChartDataType = {
  category: string;
  price: number;
  fill: string;
};

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any; // This allows for additional properties
};

export async function getPrompt(): Promise<string> {
  const categories = await db.select().from(categoryTable);
  const categoriesFormated = categories.map((cat) => cat.name).join(",");
  // console.log({ categoriesFormated });
  const queryy = `Analyze the image and extract the the date, price (only return a number), description summary (3-10 words) and category (classify the purchase into one of the following categories: ${categoriesFormated}. After analyzing the image, provide your findings in the following serialized json format only: {"date": "[Insert extracted date here]","price": "[Insert extracted price here]","description": "[Insert brief description summary here]","category": "[Insert category here]"}. If any information is unclear or cannot be determined from the image, use null for that specific field.`;
  // console.log({ queryy });
  return queryy;
  //  const queryy = 'You are an AI assistant tasked with extracting key information from receipt images. Your goal is to find the date, price, description summary, and category for the receipt in the provided image. Carefully analyze the image and extract the following information:\n\n1. Date: Look for a date format (e.g., DD/MM/YYYY or MM/DD/YYYY) typically found at the top of the receipt.\n2. Price: Identify the total amount paid, only return a number.\n3. Description summary: Provide a brief summary 3-10 words of what was purchased based on the items listed on the receipt.\n4. Category: Classify the purchase into one of the following categories: groceries, petrol, eating out, or other. Use the items and establishment name to determine the most appropriate category.\n\nAfter analyzing the image, provide your findings in the following serialized json format only:\n\n{"date": "[Insert extracted date here]","price": "[Insert extracted price here]","description": "[Insert brief description summary here]","category": "[Insert category: groceries, petrol, eating out, or other]"}\n\nIf any information is unclear or cannot be determined from the image, use null for that specific field.\n\nRemember to base your analysis solely on the information visible in the provided image. Do not make assumptions about information that is not clearly presented in the receipt.'
}
