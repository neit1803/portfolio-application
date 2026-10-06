import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PortfolioRows } from "./portfolio.mapper";

function checked<T>(result: { data: T; error: { message: string } | null }, table: string): T {
  if (result.error) throw new Error(`${table}: ${result.error.message}`);
  return result.data;
}

export async function readPortfolioRows(client: SupabaseClient): Promise<PortfolioRows | null> {
  const profileResult = await client.from("profiles").select("*").eq("is_published", true).limit(1).maybeSingle();
  const profile = checked(profileResult, "profiles");
  if (!profile) return null;
  const profileId = profile.id as string;
  const [education, experience, project, skill, socialLink, resume] = await Promise.all([
    client.from("educations").select("*").eq("profile_id", profileId),
    client.from("experiences").select("*").eq("profile_id", profileId),
    client.from("projects").select("*").eq("profile_id", profileId),
    client.from("skills").select("*").eq("profile_id", profileId),
    client.from("social_links").select("*").eq("profile_id", profileId),
    client.from("resumes").select("*").eq("profile_id", profileId).maybeSingle(),
  ]);
  const experiences = checked(experience, "experiences") ?? [];
  const projects = checked(project, "projects") ?? [];
  const experienceIds = experiences.map((row) => row.id as string);
  const projectIds = projects.map((row) => row.id as string);
  const [responsibility, image] = await Promise.all([
    experienceIds.length ? client.from("experience_responsibilities").select("*").in("experience_id", experienceIds) : Promise.resolve({ data: [], error: null }),
    projectIds.length ? client.from("project_images").select("*").in("project_id", projectIds) : Promise.resolve({ data: [], error: null }),
  ]);
  return {
    profile, educations: checked(education, "educations") ?? [], experiences,
    responsibilities: checked(responsibility, "experience_responsibilities") ?? [],
    projects, images: checked(image, "project_images") ?? [],
    skills: checked(skill, "skills") ?? [], socialLinks: checked(socialLink, "social_links") ?? [],
    resume: checked(resume, "resumes"),
  };
}
