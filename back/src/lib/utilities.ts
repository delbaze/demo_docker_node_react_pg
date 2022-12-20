import { AuthChecker } from "type-graphql";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import Wilder from "../entity/Wilder";
dotenv.config();

interface IContext {
  user: Wilder;
}

export const authChecker: AuthChecker<IContext> = (
  { root, args, context, info },
  roles
) => {
  // console.log(root);
  if (context.user) {
    return true;
  }
  return false;
};

export const getPayloadFromToken = (token: string) => {
  let payload: any;
  if (token && process.env.SECRET_KEY) {
    try {
      payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      // err
      console.log(err);
    }
  }

  return payload;
};
