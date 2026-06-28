import { defineField, defineType } from "sanity"

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title / Result Description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Client Business Category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client Corporate Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metrics",
      title: "Key Outcome Metrics (e.g. 100% security)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "challenge",
      title: "Client Challenges (Before)",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "solution",
      title: "Duty Xpert Implemented Solution",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "result",
      title: "Key Performance Results",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
})
