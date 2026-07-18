import { GoogleGenAI } from '@google/genai';

export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeQuotation(text) {
    const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
        You are an expert procurement analyst.

        Analyze the following quotation.

        Return ONLY Valid JSON.

        Do not include markdown.
        Do not use triple backticks.

        Return this format:
        {
        "vendorName":"",
        "totalAmount":"",
        "gst":"",
        "currency":"",
        "paymentTerms":"",
        "deliveryTime":"",
        "warranty":"",
        "missingInformation":[],
        "riskScore":0
        }

        Quotation:
        ${text}
        `
    });
    return res.text;
}

export const compareQuotationsAI = async (quotationData) => {
    const prompt = `You are an expert Procurement AI Assistant
    Compare the following vendor quotations.
    ${JSON.stringify(quotationData, null, 2)}
    Compare them based on:
    1.Total Amount
    2.GST
    3.Delivery Time
    4.Warranty
    5.Payment Terms
    6.Missiing Information
    7.Risk Score
    
    Assign a riskScore from 0 to 100.

Scoring guidelines:
- 0–20: Very Low Risk
- 21–40: Low Risk
- 41–60: Medium Risk
- 61–80: High Risk
- 81–100: Critical Risk

Consider:
- Missing information
- Payment terms
- Delivery timeline
- Warranty
- Price transparency
- Currency availability
- Overall quotation completeness

Return only the numeric riskScore.
    
    Recommend the best vendor.
    Return ONLY valid JSON in the following formate.
    {
        "bestVendor":"",
        "reason":"",
        "ComparisonSummary":[],
        "weaknesses":[]
    }
    
    Do not return markdown.
    Do not return explanation outside JSON
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text.replace(/```json/g, "").replace(/```/g, "").trim();

}