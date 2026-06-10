const serviceSchema = {
  name: "service",
  title: "Security Service",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "titleTh",
      title: "Title (Thai)",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug / Anchor ID",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "standards",
      title: "Operational Standards",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "value",
      title: "Business Value",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    }
  ]
}

export default serviceSchema
