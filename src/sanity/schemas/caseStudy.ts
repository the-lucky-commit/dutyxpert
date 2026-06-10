const caseStudySchema = {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title / Result Description",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Client Business Category",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "client",
      title: "Client Corporate Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "metrics",
      title: "Key Outcome Metrics (e.g. 100% security)",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "challenge",
      title: "Client Challenges (Before)",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "solution",
      title: "Duty Xpert Implemented Solution",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "result",
      title: "Key Performance Results",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    }
  ]
}

export default caseStudySchema
