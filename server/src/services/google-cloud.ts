import { Content, GoogleContent, GoogleAutoMLContent } from "./../models/content.model";

export async function process(content: Content) {
    console.log('> [google-cloud] Iniciando serviço...');

    content.googleContent = new GoogleContent();

    await extractTextFromImage(content);
    await processText(content);

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

async function processText(content: Content) {
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

export async function processAutoMl(content: Content){
    console.log('> [google-cloud] Analizando o tipo da imagem...');

    const automl = require('@google-cloud/automl');
    const client = new automl.PredictionServiceClient();

    const projectId = "fundacred-docs";
    const computeRegion = "us-central1";
    const modelId = "ICN4931389249632788988";

    const modelFullId = client.modelPath(projectId, computeRegion, modelId);

    const params = {
        score_threshold: 0.5
    };
    const payload = {
        image: {
            imageBytes: content.image.toString('base64')
        }
    };

    const [response] = await client.predict({
        name: modelFullId,
        payload: payload,
        params: params,
    });

    content.googleAutoMlContent = new GoogleAutoMLContent();
    if(response.payload[0]){
        content.googleAutoMlContent.name = response.payload[0].displayName;
        content.googleAutoMlContent.score = response.payload[0].classification.score;
    }else{
        content.googleAutoMlContent.name = 'Nao definido';
        content.googleAutoMlContent.score = '0';
    }
    
}
