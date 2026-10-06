import "server-only";
import { createPortfolioClient } from "@/src/lib/supabase/server";
import { mapPortfolio } from "./portfolio.mapper";
import { readPortfolioRows } from "./portfolio.repository";
import type { PortfolioResult } from "./portfolio.types";

export async function getPortfolio(): Promise<PortfolioResult> {
  const client = createPortfolioClient();
  if (!client) return { status: "unavailable" };
  try {
    const rows = await readPortfolioRows(client);
    if (!rows) return { status: "empty" };
    const data = mapPortfolio(rows, (bucket, path) => {
      // Storage paths are bucket-relative, never full URLs or traversal paths.
      if (!path || path.startsWith("/") || path.split("/").includes("..")) return undefined;
      return client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    });
    return { status: "ready", data };
  } catch (error) {
    console.error("Failed to load portfolio from Supabase", error);
    return { status: "unavailable" };
  }
}
