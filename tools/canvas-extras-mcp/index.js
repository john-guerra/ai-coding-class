#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const CANVAS_DOMAIN = process.env.CANVAS_DOMAIN;
const CANVAS_API_TOKEN = process.env.CANVAS_API_TOKEN;
const DEFAULT_COURSE_ID = "246270";

async function canvas(method, path, body) {
  const url = `https://${CANVAS_DOMAIN}/api/v1${path}`;
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${CANVAS_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  const text = await res.text();
  if (!res.ok) throw new Error(`Canvas ${res.status}: ${text}`);
  return JSON.parse(text);
}

const server = new McpServer({
  name: "canvas-extras-mcp",
  version: "1.0.0",
});

// --- Tool: Create Discussion Topic ---
server.tool(
  "canvas_create_discussion_topic",
  "Create a discussion topic in a Canvas course",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    title: z.string().describe("Discussion topic title"),
    message: z.string().optional().describe("Discussion topic body (HTML)"),
    discussion_type: z.enum(["side_comment", "threaded"]).default("threaded").describe("Discussion type"),
    published: z.boolean().default(false).describe("Whether to publish immediately"),
    allow_rating: z.boolean().default(false).describe("Allow liking/rating of entries"),
    require_initial_post: z.boolean().default(false).describe("Require students to post before seeing others"),
  },
  async ({ course_id, title, message, discussion_type, published, allow_rating, require_initial_post }) => {
    const result = await canvas("POST", `/courses/${course_id}/discussion_topics`, {
      title,
      message,
      discussion_type,
      published,
      allow_rating,
      require_initial_post,
    });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Tool: Create Quiz ---
server.tool(
  "canvas_create_quiz",
  "Create a new quiz in a Canvas course",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    title: z.string().describe("Quiz title"),
    description: z.string().optional().describe("Quiz description/instructions (HTML)"),
    quiz_type: z.enum(["practice_quiz", "assignment", "graded_survey", "survey"]).default("assignment").describe("Quiz type"),
    time_limit: z.number().optional().describe("Time limit in minutes"),
    shuffle_answers: z.boolean().default(true).describe("Shuffle answer choices"),
    allowed_attempts: z.number().default(1).describe("Number of allowed attempts"),
    one_question_at_a_time: z.boolean().default(false).describe("Show one question at a time"),
    cant_go_back: z.boolean().default(false).describe("Lock questions after answering"),
    published: z.boolean().default(false).describe("Whether to publish immediately"),
  },
  async ({ course_id, title, description, quiz_type, time_limit, shuffle_answers, allowed_attempts, one_question_at_a_time, cant_go_back, published }) => {
    const quiz = { title, quiz_type, shuffle_answers, allowed_attempts, one_question_at_a_time, cant_go_back, published };
    if (description) quiz.description = description;
    if (time_limit != null) quiz.time_limit = time_limit;
    const result = await canvas("POST", `/courses/${course_id}/quizzes`, { quiz });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Tool: List Quizzes ---
server.tool(
  "canvas_list_quizzes",
  "List all quizzes in a Canvas course",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
  },
  async ({ course_id }) => {
    const result = await canvas("GET", `/courses/${course_id}/quizzes`);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Tool: List Quiz Questions ---
server.tool(
  "canvas_list_quiz_questions",
  "List all questions in a Canvas quiz",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    quiz_id: z.string().describe("Canvas quiz ID"),
  },
  async ({ course_id, quiz_id }) => {
    const result = await canvas("GET", `/courses/${course_id}/quizzes/${quiz_id}/questions`);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Tool: Create Quiz Question ---
server.tool(
  "canvas_create_quiz_question",
  "Add a question to a Canvas quiz",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    quiz_id: z.string().describe("Canvas quiz ID"),
    question_name: z.string().optional().describe("Question title/name"),
    question_text: z.string().describe("The question body (HTML)"),
    question_type: z
      .enum([
        "multiple_choice_question",
        "true_false_question",
        "short_answer_question",
        "essay_question",
        "matching_question",
        "multiple_answers_question",
        "multiple_dropdowns_question",
        "fill_in_multiple_blanks_question",
        "numerical_question",
        "text_only_question",
      ])
      .describe("Question type"),
    points_possible: z.number().default(1).describe("Point value"),
    position: z.number().optional().describe("Position in quiz (1-indexed)"),
    answers: z
      .array(
        z.object({
          answer_text: z.string().describe("Answer text"),
          answer_weight: z.number().describe("100 for correct, 0 for incorrect"),
          answer_comment: z.string().optional().describe("Feedback shown when selected"),
        })
      )
      .optional()
      .describe("Answer choices (for MC, TF, multiple-answer, short-answer types)"),
  },
  async ({ course_id, quiz_id, question_name, question_text, question_type, points_possible, position, answers }) => {
    const question = { question_name, question_text, question_type, points_possible };
    if (position != null) question.position = position;
    if (answers) question.answers = answers;
    const result = await canvas("POST", `/courses/${course_id}/quizzes/${quiz_id}/questions`, { question });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Tool: Update Quiz Question ---
server.tool(
  "canvas_update_quiz_question",
  "Update an existing question in a Canvas quiz",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    quiz_id: z.string().describe("Canvas quiz ID"),
    question_id: z.string().describe("Question ID to update"),
    question_name: z.string().optional().describe("Question title/name"),
    question_text: z.string().optional().describe("The question body (HTML)"),
    question_type: z
      .enum([
        "multiple_choice_question",
        "true_false_question",
        "short_answer_question",
        "essay_question",
        "matching_question",
        "multiple_answers_question",
        "multiple_dropdowns_question",
        "fill_in_multiple_blanks_question",
        "numerical_question",
        "text_only_question",
      ])
      .optional()
      .describe("Question type"),
    points_possible: z.number().optional().describe("Point value"),
    position: z.number().optional().describe("Position in quiz (1-indexed)"),
    answers: z
      .array(
        z.object({
          answer_text: z.string().describe("Answer text"),
          answer_weight: z.number().describe("100 for correct, 0 for incorrect"),
          answer_comment: z.string().optional().describe("Feedback shown when selected"),
        })
      )
      .optional()
      .describe("Answer choices"),
  },
  async ({ course_id, quiz_id, question_id, question_name, question_text, question_type, points_possible, position, answers }) => {
    const question = {};
    if (question_name != null) question.question_name = question_name;
    if (question_text != null) question.question_text = question_text;
    if (question_type != null) question.question_type = question_type;
    if (points_possible != null) question.points_possible = points_possible;
    if (position != null) question.position = position;
    if (answers) question.answers = answers;
    const result = await canvas("PUT", `/courses/${course_id}/quizzes/${quiz_id}/questions/${question_id}`, { question });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
