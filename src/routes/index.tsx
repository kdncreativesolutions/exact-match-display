import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

const title = "Lead Learn & Inspire | Learn. Lead. Inspire.";
const description =
  "Develop leadership skills, entrepreneurial thinking and practical capabilities through mentorship, community and professional development with Lead Learn & Inspire.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});
