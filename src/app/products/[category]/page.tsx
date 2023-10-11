export default function Page({ params }: { params: { category: string } }) {
  return (
    <main>
      <div>/products/[ID]:: Product ID: {params.category}</div>
    </main>
  );
}
