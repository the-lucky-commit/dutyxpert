import { defineField, defineType } from "sanity"

export default defineType({
  name: "service",
  title: "Security Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleTh",
      title: "Title (Thai)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug / Anchor ID",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "standards",
      title: "Operational Standards",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "value",
      title: "Business Value",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
})
