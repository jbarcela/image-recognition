import * as express from 'express';
import * as multer from 'multer';

import { Content } from './../models/content.model';

import * as Google from './../services/google-cloud';

class ImageController{
    public path = "/image";
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.post(this.path, multer().single('image'), this.extractDataFromImage);
    }

    extractDataFromImage = async (req: express.Request, res: express.Response) => {
        var content = new Content();
        content.image = req.file.buffer;

        //extraindo texto da imagem utilizando o Google
        await Google.processAutoMl(content);

        //extraindo texto da imagem utilizando o Watson
        
        //process response  
        
        //response
        res.json(content.googleAutoMlContent);
    }
}

export default ImageController;