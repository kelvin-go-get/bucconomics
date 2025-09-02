import { Request, Response } from "express";
import KYC from "../models/kyc.model";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const submitKYC = async (req: Request, res: Response) => {
  const { idType, idNumber, documentUrl } = req.body;
  if (!req.user || !req.user.id) {
    return res.status(400).json({ error: "User information is missing." });
  }
  const kyc = await KYC.create({
    userId: req.user.id,
    idType,
    idNumber,
    documentUrl,
  });
  res.status(201).json(kyc);
};

export const approveKYC = async (req: Request, res: Response) => {
  await KYC.updateStatus(req.params.id, "approved");
  res.status(200).json({ message: "KYC approved" });
};
