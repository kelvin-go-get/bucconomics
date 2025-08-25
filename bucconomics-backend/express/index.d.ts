import { DecodedToken } from "../src/utils/token.util";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
