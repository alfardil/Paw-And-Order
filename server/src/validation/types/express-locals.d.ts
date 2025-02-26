import { Session, User } from "shared/db";

declare global {
  namespace Express {
    interface Locals {
      user: User | null;
      session: Session | null;
      cookie: Record<string, string | undefined>;
    }
  }
}
