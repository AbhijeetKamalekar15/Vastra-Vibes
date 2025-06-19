export default function Images({
  data,
  setFeatureImage,
  featureImage,
  imageList,
  setImageList,
}) {
  return (
    <section className="flex flex-col gap-6 bg-white rounded-2xl p-6 md:p-8 border shadow-sm">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Images</h1>

      {/* Feature Image */}
      <div className="flex flex-col gap-2">
        <label
          className="text-gray-600 text-sm font-medium"
          htmlFor="product-feature-image"
        >
          Feature Image <span className="text-red-500">*</span>
        </label>

        <div className="flex justify-center">
          {data?.featureImageURL && !featureImage && (
            <img
              className="h-24 w-auto object-cover rounded-lg border"
              src={data?.featureImageURL}
              alt="Feature"
            />
          )}
          {featureImage && (
            <img
              className="h-24 w-auto object-cover rounded-lg border"
              src={URL.createObjectURL(featureImage)}
              alt="Feature"
            />
          )}
        </div>

        <input
          type="file"
          id="product-feature-image"
          name="product-feature-image"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setFeatureImage(e.target.files[0]);
            }
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image List */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-600 text-sm font-medium" htmlFor="product-images">
          Additional Images <span className="text-red-500">*</span>
        </label>

        {(imageList?.length === 0 && data?.imageList?.length !== 0) && (
          <div className="flex flex-wrap gap-3">
            {data?.imageList?.map((item, index) => (
              <img
                key={item || index}
                className="w-24 h-24 object-cover rounded-lg border"
                src={item}
                alt={`Image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {imageList?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {imageList?.map((item, index) => (
              <img
                key={index}
                className="w-24 h-24 object-cover rounded-lg border"
                src={URL.createObjectURL(item)}
                alt={`Image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <input
          type="file"
          id="product-images"
          name="product-images"
          multiple
          onChange={(e) => {
            const newFiles = [];
            for (let i = 0; i < e.target.files.length; i++) {
              newFiles.push(e.target.files[i]);
            }
            setImageList(newFiles);
          }}
          className="border px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </section>
  );
}
