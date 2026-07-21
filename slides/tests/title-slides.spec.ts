import { test, expect } from "@playwright/test";

const LECTURE_FOLDERS = [
  "01_Introduction",
  "02_LLMs_fundamentals",
  "03_Prompt_Engineering",
  "04_User_Research_Prototyping",
  "05_Claude_Web_Projects",
  "06_IDE_AI_Coding",
  "07_Advanced_IDE_Agile",
  "08_Advanced_IDE_Features",
  "09_Claude_Code_Foundations",
  "10_Claude_Code_Workflows",
  "11_Claude_Code_Extensibility",
  "12_Agent_Architectures",
  "13_AI_Security_Code_Quality",
  "14_Production_Synthesis",
];

const EXPECTED_NAME = "John Alexis Guerra Gomez";

for (const folder of LECTURE_FOLDERS) {
  test.describe(`${folder} title slide`, () => {
    test("contains instructor name", async ({ page }) => {
      await page.goto(`/${folder}/index.md`);
      // Wait for reveal.js to render the markdown into slides
      await page.waitForSelector(".reveal .slides section.present");

      const titleSlide = page.locator(
        ".reveal .slides > section.present"
      );
      await expect(titleSlide).toContainText(EXPECTED_NAME);
    });

    test("does not overflow", async ({ page }) => {
      await page.goto(`/${folder}/index.md`);
      await page.waitForSelector(".reveal .slides section.present");

      const overflow = await page.evaluate(() => {
        const slide = document.querySelector(
          ".reveal .slides > section.present"
        ) as HTMLElement | null;
        if (!slide) return { overflows: false, details: "no slide found" };

        return {
          overflows:
            slide.scrollWidth > slide.clientWidth ||
            slide.scrollHeight > slide.clientHeight,
          scrollWidth: slide.scrollWidth,
          clientWidth: slide.clientWidth,
          scrollHeight: slide.scrollHeight,
          clientHeight: slide.clientHeight,
        };
      });

      expect(
        overflow.overflows,
        `Title slide overflows: scroll(${overflow.scrollWidth}x${overflow.scrollHeight}) > client(${overflow.clientWidth}x${overflow.clientHeight})`
      ).toBe(false);
    });
  });
}
