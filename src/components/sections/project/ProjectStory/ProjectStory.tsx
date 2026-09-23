import { StoryChapter } from "@/components/sections/project/StoryChapter/StoryChapter";
import { StoryMedia } from "@/components/sections/project/StoryMedia/StoryMedia";
import { StoryPalette } from "@/components/sections/project/StoryPalette/StoryPalette";
import { StoryQuote } from "@/components/sections/project/StoryQuote/StoryQuote";
import { StoryTips } from "@/components/sections/project/StoryTips/StoryTips";
import type { ProjectStoryBlock } from "@/content/projects";

interface ProjectStoryProps {
  blocks: ProjectStoryBlock[];
}

/** "01", "02"… for each chapter block, keyed by block index. */
function chapterNumerals(blocks: ProjectStoryBlock[]) {
  const chapterIndexes = blocks.flatMap((block, index) => (block.type === "chapter" ? [index] : []));
  return new Map(chapterIndexes.map((blockIndex, n) => [blockIndex, String(n + 1).padStart(2, "0")]));
}

/** Renders a case study from ordered content blocks; chapters are numbered automatically. */
export function ProjectStory({ blocks }: ProjectStoryProps) {
  const numerals = chapterNumerals(blocks);

  return (
    <article className="flex flex-col gap-14 pb-14 md:gap-26 md:pb-26">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "chapter":
            return (
              <StoryChapter
                key={key}
                numeral={numerals.get(index) ?? ""}
                title={block.title}
                body={block.body}
              />
            );
          case "palette":
            return <StoryPalette key={key} title={block.title} swatches={block.swatches} />;
          case "media":
            return <StoryMedia key={key} layout={block.layout} images={block.images} caption={block.caption} />;
          case "quote":
            return <StoryQuote key={key} quote={block.quote} attribution={block.attribution} detail={block.detail} />;
          case "tips":
            return <StoryTips key={key} title={block.title} items={block.items} />;
        }
      })}
    </article>
  );
}
