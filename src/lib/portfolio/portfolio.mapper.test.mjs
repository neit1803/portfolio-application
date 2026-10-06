import assert from "node:assert/strict";
import test from "node:test";
import { mapPortfolio } from "./portfolio.mapper.ts";

test("maps ordered relational rows and handles missing optional values", () => {
  const data = mapPortfolio({
    profile: { full_name: "Ada", title: "Engineer", summary: null, email: null },
    educations: [],
    experiences: [{ id: "e1", company: "Acme", role: "Developer", technologies: null, sort_order: 1 }],
    responsibilities: [
      { experience_id: "e1", content: "Second", sort_order: 2 },
      { experience_id: "e1", content: "First", sort_order: 1 },
    ],
    projects: [{ id: "p1", name: "App", description: "", technologies: ["React"], github_url: "javascript:alert(1)", sort_order: 0 }],
    images: [{ project_id: "p1", storage_path: "app.png", sort_order: 0 }],
    skills: [{ id: "s1", name: "TypeScript", category: "frontend", level: 8, sort_order: 3 }],
    socialLinks: [{ platform: "GitHub", url: "http://example.com" }],
    resume: null,
  }, (bucket, path) => `https://assets.example/${bucket}/${path}`);
  assert.deepEqual(data.experiences[0].responsibilities, ["First", "Second"]);
  assert.deepEqual(data.experiences[0].technologies, []);
  assert.deepEqual(data.projects[0].images, ["https://assets.example/project-images/app.png"]);
  assert.equal(data.projects[0].githubUrl, undefined);
  assert.equal(data.skills[0].level, undefined);
  assert.deepEqual(data.socialLinks, []);
  assert.equal(data.resume.pdfUrl, undefined);
});

test("projects without images and resume paths remain empty", () => {
  const data = mapPortfolio({
    profile: { full_name: "A", title: "B", summary: "" },
    educations: [], experiences: [], responsibilities: [],
    projects: [{ id: "p", name: "No screenshots", description: "" }],
    images: [], skills: [], socialLinks: [], resume: { storage_path: null },
  }, () => undefined);
  assert.deepEqual(data.projects[0].images, []);
  assert.equal(data.resume.pdfUrl, undefined);
});
