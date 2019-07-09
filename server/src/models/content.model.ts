export class Content {
    image: Buffer;
    googleContent: GoogleContent;
    watsonContent: WatsonContent;
    googleAutoMlContent: GoogleAutoMLContent;
}

export class GoogleContent {
    text: string;
    analyzedText: Object;
}

export class WatsonContent {
    text: string;
    analyzedText: Object;
}

export class GoogleAutoMLContent{
    name: string;
    score: string;
}