import { Request, Response, NextFunction } from 'express';

export const validateTask = (req: Request, res: Response, next: NextFunction): void => {
    // Validation logic here
    const { placa } = req.params;

    if (!placa) {
        res.status(400).json({ message: 'La placa es requerida' });
        return;
    }

    next();
};