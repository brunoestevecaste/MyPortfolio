import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      images: [absoluteUrl("/hero/bruno-esteve-hero-monocromo-editorial.webp")],
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      images: [absoluteUrl(project.image)],
    })),
  ];
}
