import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import { useForm, useFieldArray } from "react-hook-form";
import { API_URL } from "@/config";
import usePostData from "@/hooks/usePostData";

type Item = {
  category: string;
  brand: string;
  productModel: string;
  ProductModelId?: string;
  hasVariation?: boolean;
  size?: string;
  sizeUnit?: string;
  quantity: number;
  unitPrice: number;
};

type FormData = {
  shopId: string;
  transactionType: "incoming" | "outgoing";
  date: string;
  party: string;
  items: Item[];
  createdBy: string;
};

export default function TransactionTableForm() {
  const [productModelsCache, setProductModelsCache] = useState<
    Record<string, any[]>
  >({});

  // Fetch all shops
  const {
    data: shops,
    error: shopsError,
    loading: shopsLoading,
  } = useFetchData<any[]>("/shops");

  const { control, handleSubmit, watch, register, reset, setValue, getValues } =
    useForm<FormData>({
      defaultValues: {
        shopId: "",
        transactionType: "incoming",
        date: "",
        party: "",
        createdBy: "Admin", // TODO: replace with logged-in user
        items: [
          {
            category: "",
            brand: "",
            productModel: "",
            quantity: 0,
            unitPrice: 0,
          },
        ],
      },
    });

  const watchShopId = watch("shopId");
  // Fetch categories for a given shop
  const { data: categories } = useFetchData<any[]>(
    watchShopId ? `/categories/shop/${watchShopId}` : ""
  );

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");
  // const watchShopId = watch("shopId");

  // Row-specific product model fetching
  // useEffect(() => {

  //   console.log('UseEffect is running now.')
  //   items.forEach((row) => {
  //     if (row.category && row.brand) {
  //       const key = `${row.category}-${row.brand}`;
  //       console.log('key...', key)
  //       if (!productModelsCache[key]) {
  //         console.log('Category and Brand!',row.category, row.brand)
  //         fetch(`${API_URL}/productModels/${row.category}/${row.brand}`)
  //           .then((res) => res.json())
  //           .then((data) => {
  //             console.log('data', data)
  //             setProductModelsCache((prev) => ({
  //               ...prev,
  //               [key]: data?.data || [],

  //             }));
  //           })
  //           .catch((err) => {
  //             console.error("Error fetching product models:", err);
  //           });
  //       }
  //     }
  //   });
  // }, [items, productModelsCache]);

  const {post} = usePostData(`/transactions`)

  const onSubmit = (data: FormData) => {
    const payload = {
      shopId: data.shopId,
      party: data.party || "N/A",
      transactionType: data.transactionType,
      createdBy: data.createdBy,
      items: data.items.map((i) => ({
        ProductModelId: i.productModel,
        size: i.size || "",
        sizeUnit: i.sizeUnit || "",
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    };
    console.log("Payload to send:", payload);
    // TODO: POST payload to backend
    post(payload);
  };

  if (shopsLoading) return <p>Loading shops...</p>;
  if (shopsError) return <p>Error loading shops.</p>;

  const initialItem: Item = {
    category: "",
    brand: "",
    productModel: "",
    quantity: 0,
    unitPrice: 0,
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto mt-10"
      >
        {/* Header */}
        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2 w-full">
            <label>Shop</label>
            <select
              {...register("shopId", {
                onChange: (e) => {
                  const value = e.target.value;
                  reset({
                    shopId: value,
                    transactionType: "incoming",
                    date: "",
                    party: "",
                    createdBy: "Admin",
                    items: [initialItem],
                  });
                },
              })}
              className="border p-2 rounded"
            >
              <option value="">-- Select Shop --</option>
              {(shops as any)?.data?.map((s: any) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <label>Transaction Type</label>
            <select
              {...register("transactionType")}
              className="border p-2 rounded"
            >
              <option value="incoming">Incoming</option>
              <option value="outgoing">Outgoing</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label>Date</label>
            <input
              type="date"
              {...register("date")}
              className="border p-2 rounded"
            />

            <label>Customer/Supplier</label>
            <input
              type="text"
              {...register("party")}
              placeholder="Name"
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Items Table */}
        <h2 className="text-xl font-bold my-4">Add Transaction Items</h2>
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Brand</th>
              <th className="p-2 border">Product Model</th>
              <th className="p-2 border">Size</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Unit Price</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              const row = items[index];
              const total = (row.quantity || 0) * (row.unitPrice || 0);

              const brandsForRow =
                (categories as any)?.data?.find(
                  (c: any) => c._id === row?.category
                )?.brandIds || [];

              const productModelsForRow =
                productModelsCache[`${row.category}-${row.brand}`] || [];

              const selectedProduct = productModelsForRow.find(
                (pm: any) => pm._id === row?.productModel
              );

              return (
                <tr key={field.id}>
                  <td className="p-2 border text-center">{index + 1}</td>

                  {/* Category */}
                  <td className="p-2 border">
                    <select
                      {...register(`items.${index}.category`, {
                        onChange: (e) => {
                          const value = e.target.value;
                          setValue(`items.${index}.brand`, "");
                          setValue(`items.${index}.productModel`, "");
                        },
                      })}
                      className="w-full p-1 border rounded"
                      disabled={!watchShopId}
                    >
                      <option value="">Select Category</option>
                      {(categories as any)?.data?.map((c: any) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Brand */}
                  <td className="p-2 border">
                    <select
                      {...register(`items.${index}.brand`, {
                        onChange: (e) => {
                          const value = e.target.value;
                          setValue(`items.${index}.productModel`, "");
                          const category = getValues(`items.${index}.category`);
                          if (category && value) {
                            const key = `${category}-${value}`;
                            if (!productModelsCache[key]) {
                              fetch(`${API_URL}/productModels/${category}/${value}`)
                                .then((res) => res.json())
                                .then((data) => {
                                  setProductModelsCache((prev) => ({
                                    ...prev,
                                    [key]: data?.data || [],
                                  }));
                                });
                                console.log(productModelsCache)
                            }
                          }
                        },
                      })}
                      className="w-full p-1 border rounded"
                      disabled={!brandsForRow.length}
                    >
                      <option value="">Select Brand</option>
                      {brandsForRow.map((b: any) => (
                        <option key={b._id} value={b._id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Product Model */}
                  <td className="p-2 border">
                    <select
                      {...register(`items.${index}.productModel`, {
                        onChange: (e) => {
                          const value = e.target.value;
                          const pm = productModelsForRow.find(
                            (p: any) => p._id === value
                          );
                          setValue(
                            `items.${index}.hasVariation`,
                            pm?.hasVariation || false
                          );
                          if (!pm?.hasVariation) {
                            setValue(`items.${index}.size`, "");
                            setValue(`items.${index}.sizeUnit`, "");
                          }
                        },
                      })}
                      className="w-full p-1 border rounded"
                      disabled={!productModelsForRow.length}
                    >
                      <option value="">Select Product</option>
                      {productModelsForRow.map((pm: any) => (
                        <option key={pm._id} value={pm._id}>
                          {pm.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Size */}
                  <td className="p-2 border">
                    {selectedProduct?.hasVariation ? (
                      <select
                        {...register(`items.${index}.size`)}
                        className="w-full p-1 border rounded"
                      >
                        <option value="">Select Size</option>
                        {selectedProduct?.sizes?.map((sz: any) => (
                          <option key={sz.size} value={sz.size}>
                            {sz.size} {sz.sizeUnit} (Stock: {sz.currentStock})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>

                  {/* Quantity */}
                  <td className="p-2 border">
                    <input
                      type="number"
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      className="w-full p-1 border rounded"
                    />
                  </td>

                  {/* Unit Price */}
                  <td className="p-2 border">
                    <input
                      type="number"
                      {...register(`items.${index}.unitPrice`, {
                        valueAsNumber: true,
                      })}
                      className="w-full p-1 border rounded"
                    />
                  </td>

                  {/* Total */}
                  <td className="p-2 border text-right font-medium">
                    {total.toFixed(2)}
                  </td>

                  {/* Remove */}
                  <td className="p-2 border text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Subtotal */}
            <tr>
              <td colSpan={8} className="text-right p-2 font-semibold border">
                Subtotal
              </td>
              <td className="text-right p-2 border font-bold">
                {items
                  ?.reduce(
                    (sum, i) => sum + (i.quantity || 0) * (i.unitPrice || 0),
                    0
                  )
                  .toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={() => append(initialItem)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Row
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
