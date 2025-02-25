import { Response } from "express";
import { s } from "./s";
import { ErrorType, SuccessType } from "./types/ErrorType";

type Success = Omit<SuccessType, "_debug">;

type Fail = Omit<ErrorType, "_debug">;

/**
 * A helper function that sends a response via the superjson package.
 * Can also attach a _debug object that can be used to provide information only in production.
 */
export const sendSuperJson = (
  res: Response,
  statusCode = 200,
  object: Success | Fail,
  devTools?: Record<string, unknown> & { message: string },
) => {
  res
    .status(statusCode)
    .contentType("application/json")
    .send(
      s.stringify(
        ["development", "test"].includes(process.env.NODE_ENV) ?
          { ...object, _debug: { ...devTools, date: new Date() } }
        : object,
      ),
    );
};
