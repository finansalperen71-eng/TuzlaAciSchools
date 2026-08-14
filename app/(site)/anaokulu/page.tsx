import { LevelPage } from "@/components/level/LevelPage";
import { getLevel } from "@/content/levels";
import { buildMetadata } from "@/lib/seo";

const level = getLevel("anaokulu");

export const metadata = buildMetadata({
  title: level.title,
  description: level.summary,
  path: "/anaokulu",
});

export default function AnaokuluPage() {
  return <LevelPage level={level} />;
}
