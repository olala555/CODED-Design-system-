import { notFound, redirect } from "next/navigation";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  redirect(`/brand-book/${product.id}`);
}
