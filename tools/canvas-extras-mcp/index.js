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
  return text ? JSON.parse(text) : {};
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
    assignment: z.object({
      points_possible: z.number().optional().describe("Point value for the graded discussion"),
      grading_type: z.string().optional().describe("Grading type (e.g. points, letter_grade)"),
      assignment_group_id: z.number().optional().describe("Assignment group ID"),
    }).optional().describe("Assignment settings to create a graded discussion"),
  },
  async ({ course_id, title, message, discussion_type, published, allow_rating, require_initial_post, assignment }) => {
    const body = {
      title,
      message,
      discussion_type,
      published,
      allow_rating,
      require_initial_post,
    };
    if (assignment) body.assignment = assignment;
    const result = await canvas("POST", `/courses/${course_id}/discussion_topics`, body);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Tool: Delete Discussion Topic ---
server.tool(
  "canvas_delete_discussion_topic",
  "Delete a discussion topic from a Canvas course",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    topic_id: z.string().describe("Discussion topic ID to delete"),
  },
  async ({ course_id, topic_id }) => {
    const result = await canvas("DELETE", `/courses/${course_id}/discussion_topics/${topic_id}`);
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

// --- Tool: List Discussion Topics ---
server.tool(
  "canvas_list_discussion_topics",
  "List all discussion topics in a Canvas course",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
  },
  async ({ course_id }) => {
    const result = await canvas("GET", `/courses/${course_id}/discussion_topics?per_page=50`);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Tool: Get Discussion Topic ---
server.tool(
  "canvas_get_discussion_topic",
  "Get a specific discussion topic by ID",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    topic_id: z.string().describe("Discussion topic ID"),
  },
  async ({ course_id, topic_id }) => {
    const result = await canvas("GET", `/courses/${course_id}/discussion_topics/${topic_id}`);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Tool: Update Discussion Topic ---
server.tool(
  "canvas_update_discussion_topic",
  "Update an existing discussion topic in a Canvas course",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    topic_id: z.string().describe("Discussion topic ID to update"),
    title: z.string().optional().describe("New title for the discussion topic"),
    message: z.string().optional().describe("New body/message (HTML) for the discussion topic"),
    published: z.boolean().optional().describe("Whether the discussion is published"),
  },
  async ({ course_id, topic_id, title, message, published }) => {
    const body = {};
    if (title != null) body.title = title;
    if (message != null) body.message = message;
    if (published != null) body.published = published;
    const result = await canvas("PUT", `/courses/${course_id}/discussion_topics/${topic_id}`, body);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// --- Tool: Create Rubric ---
server.tool(
  "canvas_create_rubric",
  "Create a rubric and optionally associate it with an assignment for grading",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    title: z.string().describe("Rubric title"),
    criteria: z
      .array(
        z.object({
          description: z.string().describe("Criterion name/description"),
          points: z.number().describe("Maximum points for this criterion"),
          ratings: z
            .array(
              z.object({
                description: z.string().describe("Rating level name"),
                points: z.number().describe("Points for this rating level"),
              })
            )
            .describe("Rating levels from best to worst"),
        })
      )
      .describe("Rubric criteria with rating scales"),
    association_id: z.number().optional().describe("Assignment ID to associate the rubric with"),
    association_type: z.enum(["Assignment", "Course"]).default("Assignment").describe("Type of association"),
    use_for_grading: z.boolean().default(true).describe("Whether to use this rubric for grading"),
  },
  async ({ course_id, title, criteria, association_id, association_type, use_for_grading }) => {
    // Convert array-based criteria to Canvas indexed-hash format
    const criteriaHash = {};
    criteria.forEach((c, i) => {
      const ratingsHash = {};
      c.ratings.forEach((r, j) => {
        ratingsHash[String(j)] = { description: r.description, points: r.points };
      });
      criteriaHash[String(i)] = {
        description: c.description,
        points: c.points,
        ratings: ratingsHash,
      };
    });

    const body = {
      rubric: { title, criteria: criteriaHash },
    };

    if (association_id != null) {
      body.rubric_association = {
        association_id,
        association_type,
        use_for_grading,
        purpose: "grading",
      };
    }

    const result = await canvas("POST", `/courses/${course_id}/rubrics`, body);
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

// --- Tool: Update Assignment (extras) ---
server.tool(
  "canvas_update_assignment",
  "Update an existing assignment with fields not supported by canvas-lms (e.g. assignment_group_id)",
  {
    course_id: z.string().default(DEFAULT_COURSE_ID).describe("Canvas course ID"),
    assignment_id: z.string().describe("Assignment ID to update"),
    assignment_group_id: z.number().optional().describe("Assignment group ID to move the assignment into"),
    name: z.string().optional().describe("Assignment name"),
    position: z.number().optional().describe("Position within the assignment group"),
  },
  async ({ course_id, assignment_id, assignment_group_id, name, position }) => {
    const assignment = {};
    if (assignment_group_id != null) assignment.assignment_group_id = assignment_group_id;
    if (name != null) assignment.name = name;
    if (position != null) assignment.position = position;
    const result = await canvas("PUT", `/courses/${course_id}/assignments/${assignment_id}`, { assignment });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
