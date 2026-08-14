import { LevelPage } from "@/components/level/LevelPage";
import { getLevel } from "@/content/levels";
import { buildMetadata } from "@/lib/seo";

const level = getLevel("ilkokul");

export const metadata = buildMetadata({
  title: level.title,
  description: level.summary,
  path: "/ilkokul",
});

export default function IlkokulPage() {
  return <LevelPage level={level} />;
}
