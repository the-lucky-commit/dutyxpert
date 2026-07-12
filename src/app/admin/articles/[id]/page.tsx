import { ArticleAdminShell } from "../../_components/article-admin-client"

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ArticleAdminShell mode="edit" groupId={decodeURIComponent(id)} />
}
