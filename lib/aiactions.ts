"use server";
import Anthropic from "@anthropic-ai/sdk";
import { ContentBlock } from "@anthropic-ai/sdk/resources/messages.mjs";
import { Spending, spendingTable } from "./db/schema";
import { db } from "./db/drizzle";
import { testPhoto } from "./testPhotoBase64String";
import { getPrompt, typedData } from "./prompt";
import { isDummyEnv } from "./utils";


export async function llmWork(photo: string) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  if (isDummyEnv()) {
    photo = testPhoto;
  }

  photo = photo.split(",")[1];

  let parsedResponse : Spending;

  if (isDummyEnv()) {
    console.log("in dev mode so not doing claude api call")
    parsedResponse = typedData;
  }
  else {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: await getPrompt(),
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: photo,
              },
            },
          ],
        },
      ],
    });
    const msgContent = msg.content[0] as ContentBlock & { content: string, text:string };
    console.log({msgContent})
    parsedResponse = JSON.parse(msgContent.text)
  }

  console.log({ parsedResponse });
  const newSpendingToAdd = {
    category: parsedResponse.category,
    date: parsedResponse.date ? new Date(parsedResponse.date) : null,
    description: parsedResponse.description,
    price: parsedResponse.price,
  };
  // alert(parsedResponse);
  //upload to db
  const [result] = await db.insert(spendingTable).values(newSpendingToAdd).returning();
  console.log("done uploading to db");
  return result;
}
