import { Content, GoogleContent } from "./../models/content.model";

export async function process(content: Content) {
    console.log('> [google-cloud] Iniciando serviço...');

    content.googleContent = new GoogleContent();

    await extractTextFromImage(content);
    await understandingText(content);

    console.log('> [google-cloud] Serviço finalizado...');
    return content;
}

async function extractTextFromImage(content: Content) {
    console.log('> [google-cloud] Extraindo texto da imagem...');

    const vision = require('@google-cloud/vision');

    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.documentTextDetection(content.image);
    const text = result.fullTextAnnotation.text;

    content.googleContent.text = text;
}

async function understandingText(content: Content) {
    console.log('> [google-cloud] Analizando o texto...');

    const language = require('@google-cloud/language');
    const client = new language.LanguageServiceClient();

    const document = {
        content: content.googleContent.text,
        type: 'PLAIN_TEXT'
    };

    const [result] = await client.analyzeEntities({document: document});
    content.googleContent.analyzedText = result.entities;
}
