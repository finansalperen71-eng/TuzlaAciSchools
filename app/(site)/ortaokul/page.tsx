import { LevelPage } from "@/components/level/LevelPage";
import { getLevel } from "@/content/levels";
import { buildMetadata } from "@/lib/seo";

const level = getLevel("ortaokul");

export const metadata = buildMetadata({
  title: level.title,
  description: level.summary,
  path: "/ortaokul",
});

export default function OrtaokulPage() {
  return <LevelPage level={level} />;
}
