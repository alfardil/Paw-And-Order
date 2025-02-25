export default function cookieGen({
    name,
    value,
    path = "/",
    httpOnly,
    secure,
    maxAge,
    sameSite = "Lax",
    expires,
  }: {
    name: string;
    value?: string;
    path: string;
    httpOnly?: boolean;
    secure?: boolean;
    maxAge?: number;
    sameSite: "Strict" | "Lax" | "None";
    expires?: string;
  }) {
    let res = "";
  
    res += `${name}=${value ?? ""}`;
    res += `; path=${path}`;
  
    if (httpOnly) {
      res += `; HttpOnly`;
    }
  
    if (secure) {
      res += `; Secure`;
    }
  
    if (maxAge) {
      res += `; Max-Age=${maxAge}`;
    }
  
    if (expires) {
      res += `; Expires=${expires}`;
    }
  
    res += `; SameSite=${sameSite}`;
    res += `;`;
  
    return res;
  }
  