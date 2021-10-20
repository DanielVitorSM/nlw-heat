import { Request, Response } from 'express';
import { GetLastMessagesService } from '../services/GetLastMessagesService';

export class GetLastMessagesController {
    async handler(req: Request, res: Response) {
        const service = new GetLastMessagesService();
        
        const result = await service.execute();

        return res.json(result);
    }
}