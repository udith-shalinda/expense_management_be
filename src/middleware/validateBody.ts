import { NextFunction, Request, Response } from 'express'

export const validateBody =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = await schema.validate(req.body)
      if (error) {
        return res.status(500).json({ error: error.details })
      }
      return next()
    } catch (err: any) {
      return res.status(500).json({ type: err.name, message: err.message })
    }
  }
