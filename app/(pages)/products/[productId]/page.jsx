import { getProduct } from "../../../../lib/firestore/products/read_server";
import Photos from "./components/Photos";
import Details from "./components/Details";
import Reviews from "./components/Reviews";
import RelatedProducts from "./components/RelatedProducts";
import AddReview from "./components/AddReview";
import AuthContextProvider from "../../../../context/AuthContext";

export async function generateMetadata({ params }) {
  const { productId } = params;
  const product = await getProduct({ id: productId });

  return {
    title: `${product?.title} | Product`,
    description: product?.shortDescription ?? "",
    openGraph: {
      images: [product?.featureImageURL],
    },
  };
}

export default async function Page({ params }) {
  const { productId } = params;
  const product = await getProduct({ id: productId });
  
  return (
    <main className="flex flex-col gap-8 bg-[#dbe5e4] min-h-screen py-6 px-4 md:px-10">
      
      {/* Product Info */}
      <section className="flex flex-col-reverse md:flex-row gap-5 md:gap-8 max-w-7xl mx-auto w-full bg-white rounded-xl shadow-sm p-5 md:p-8">
        <Photos
          imageList={[product?.featureImageURL, ...(product?.imageList ?? [])]}
        />
        <Details product={product} />
      </section>

      {/* Reviews */}
      <div className="flex justify-center w-full">
        <AuthContextProvider>
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 max-w-5xl w-full bg-white rounded-xl shadow-sm p-5 md:p-8">
            <AddReview productId={productId} />
            <Reviews productId={productId} />
          </div>
        </AuthContextProvider>
      </div>

      {/* Related Products */}
      <RelatedProducts categoryId={product?.categoryId} />
    </main>
  );
}
