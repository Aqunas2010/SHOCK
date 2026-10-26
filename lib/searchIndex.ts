import { LESSONS } from "./data/lessons";

export interface SearchResult {
  lessonSlug: string;
  lessonNumber: number;
  lessonTitle: string;
  category: string;
  matchedField: "title" | "section" | "bullet" | "pearl" | "takeaway";
  matchedText: string;
  sectionId?: string;
}

export function searchLessons(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];
  const addedSlugs = new Set<string>();

  for (const lesson of LESSONS) {
    // Check title or subtitle
    if (lesson.title.toLowerCase().includes(q) || lesson.subtitle.toLowerCase().includes(q)) {
      results.push({
        lessonSlug: lesson.slug,
        lessonNumber: lesson.number,
        lessonTitle: lesson.title,
        category: lesson.category,
        matchedField: "title",
        matchedText: lesson.subtitle,
      });
      addedSlugs.add(lesson.slug);
      continue;
    }

    // Check pearl
    if (lesson.pearl && lesson.pearl.toLowerCase().includes(q)) {
      results.push({
        lessonSlug: lesson.slug,
        lessonNumber: lesson.number,
        lessonTitle: lesson.title,
        category: lesson.category,
        matchedField: "pearl",
        matchedText: lesson.pearl,
      });
      addedSlugs.add(lesson.slug);
      continue;
    }

    // Check sections
    let foundInSection = false;
    for (const sec of lesson.sections) {
      if (sec.title.toLowerCase().includes(q) || (sec.content && sec.content.toLowerCase().includes(q))) {
        results.push({
          lessonSlug: lesson.slug,
          lessonNumber: lesson.number,
          lessonTitle: lesson.title,
          category: lesson.category,
          matchedField: "section",
          matchedText: `${sec.title}: ${sec.content?.slice(0, 110) || ""}`,
          sectionId: sec.id,
        });
        foundInSection = true;
        addedSlugs.add(lesson.slug);
        break;
      }

      if (sec.bullets) {
        const matchingBullet = sec.bullets.find((b) => b.toLowerCase().includes(q));
        if (matchingBullet) {
          results.push({
            lessonSlug: lesson.slug,
            lessonNumber: lesson.number,
            lessonTitle: lesson.title,
            category: lesson.category,
            matchedField: "bullet",
            matchedText: matchingBullet,
            sectionId: sec.id,
          });
          foundInSection = true;
          addedSlugs.add(lesson.slug);
          break;
        }
      }
    }

    if (foundInSection) continue;

    // Check key takeaways
    const matchingTakeaway = lesson.keyTakeaways.find((t) => t.toLowerCase().includes(q));
    if (matchingTakeaway) {
      results.push({
        lessonSlug: lesson.slug,
        lessonNumber: lesson.number,
        lessonTitle: lesson.title,
        category: lesson.category,
        matchedField: "takeaway",
        matchedText: matchingTakeaway,
      });
      addedSlugs.add(lesson.slug);
    }
  }

  return results;
}
