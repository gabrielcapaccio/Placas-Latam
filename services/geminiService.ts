import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from '../utils/fileUtils';
import { UploadedFile } from '../types';

// FIX: Per coding guidelines, the API key must be sourced from process.env.API_KEY
// and the client should be initialized directly with it.
// The original code used Vite-specific environment variables which is not allowed
// and also caused a TypeScript error.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GenerateImageParams {
  prompt: string;
  styleImages: UploadedFile[];
}

export const generateStyledImage = async ({ prompt, styleImages }: GenerateImageParams): Promise<string> => {
  if (styleImages.length === 0) {
    throw new Error("Se requiere al menos una imagen de estilo.");
  }

  const imageParts = await Promise.all(
    styleImages.map(async (uploadedFile) => {
      const base64Data = await fileToBase64(uploadedFile.file);
      return {
        inlineData: {
          data: base64Data,
          mimeType: uploadedFile.file.type,
        },
      };
    })
  );

  const textPart = {
    text: `Genera una imagen con el sujeto: "${prompt}". El estilo visual debe estar inspirado y ser consistente exclusivamente con las imágenes proporcionadas.`,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [...imageParts, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64ImageBytes = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        return `data:${mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error("El modelo no generó ninguna imagen.");

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error("Error al generar la imagen. Por favor, revisa la consola para más detalles.");
  }
};
