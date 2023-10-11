export default function Page({ params }: { params: { orderId: string } }) {
  return (
    <main>
      <div>Order ID: {params.orderId}</div>
    </main>
  );
}
