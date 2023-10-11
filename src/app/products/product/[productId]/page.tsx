export default function Page({ params }: { params: { productID: string } }) {
  return (
    <main>
      <div>Product ID: {params.productID}</div>
    </main>
  );
}
