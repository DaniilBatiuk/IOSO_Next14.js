import { z } from "zod";
export const AccessCodeScheme = z.string().min(6).max(50);
