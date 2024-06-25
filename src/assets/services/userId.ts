import { v4 as uuidv4 } from "uuid";

export function getOrCreateUserId() {
  const userIdKey = "user_id";
  let userId = document.cookie
    .split("; ")
    .find((row) => row.startsWith(userIdKey))
    ?.split("=")[1];

  if (!userId) {
    userId = uuidv4();
    document.cookie = `${userIdKey}=${userId}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`; // 1 year
  }

  return userId;
}
