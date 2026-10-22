import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { applications } from "@/data/applications";
import { projects } from "@/data/projects";
import { pro } from "@/data/application";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.vaibhavientp.com";

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/enquiry",
    "/products",
    "/projects",
    "/applications",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const applicationRoutes = applications.map((app) => ({
    url: `${baseUrl}/applications/${app.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const industryRoutes = pro.map((industry) => ({
    url: `${baseUrl}/industry/${industry.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...projectRoutes,
    ...applicationRoutes,
    ...industryRoutes,
  ];
}
