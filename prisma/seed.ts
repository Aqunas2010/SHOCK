import { PrismaClient } from "@prisma/client";
import { LESSONS } from "../lib/data/lessons";
import { QUIZ_QUESTIONS } from "../lib/data/quiz";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding SHOCK platform data...");

  // Seed Lessons
  for (const lesson of LESSONS) {
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      update: {
        title: lesson.title,
        subtitle: lesson.subtitle,
        description: lesson.description,
        estimatedMinutes: lesson.estimatedMinutes,
        category: lesson.category,
        keyTakeaways: lesson.keyTakeaways,
        pearl: lesson.pearl || null,
        caution: lesson.caution || null,
      },
      create: {
        number: lesson.number,
        slug: lesson.slug,
        tag: lesson.tag,
        title: lesson.title,
        subtitle: lesson.subtitle,
        description: lesson.description,
        estimatedMinutes: lesson.estimatedMinutes,
        category: lesson.category,
        keyTakeaways: lesson.keyTakeaways,
        pearl: lesson.pearl || null,
        caution: lesson.caution || null,
      },
    });
  }

  // Seed Quiz Questions
  for (const q of QUIZ_QUESTIONS) {
    const questionRecord = await prisma.quizQuestion.upsert({
      where: { number: q.number },
      update: {
        category: q.category,
        question: q.question,
        correctOptionId: q.correctOptionId,
        explanation: q.explanation,
        clinicalPearl: q.clinicalPearl,
      },
      create: {
        number: q.number,
        category: q.category,
        question: q.question,
        correctOptionId: q.correctOptionId,
        explanation: q.explanation,
        clinicalPearl: q.clinicalPearl,
      },
    });

    // Delete existing options and recreate
    await prisma.quizOption.deleteMany({
      where: { questionId: questionRecord.id },
    });

    for (const opt of q.options) {
      await prisma.quizOption.create({
        data: {
          optionKey: opt.id,
          text: opt.text,
          questionId: questionRecord.id,
        },
      });
    }
  }

  console.log("Database seeded successfully with 10 lessons and 10 quiz questions.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
