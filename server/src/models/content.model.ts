export class Content {
    image: Buffer;
    googleContent: GoogleContent;
    watsonContent: WatsonContent;
}

export class GoogleContent {
    text: string;
    analyzedText: Object;
}

export class WatsonContent {
    text: string;
    analyzedText: Object;
}