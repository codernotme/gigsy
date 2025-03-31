export async function generateStaticParams() {
  // Replace this with your logic to fetch project IDs
  const projectIds = ["1", "2", "3"]; // Example project IDs
  return projectIds.map((id) => ({ params: { id } }));
}
