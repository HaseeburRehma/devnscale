import type { Metadata } from "next";
import StatusPage from "@/components/sections/StatusPage";

export const metadata: Metadata = {
  title: "Page not found — Dev N Scale",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="This page doesn't exist."
      body="The link may be old or mistyped. Head back home, or tell us what you were looking for."
    />
  );
}
