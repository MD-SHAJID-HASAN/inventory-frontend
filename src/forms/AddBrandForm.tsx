import { PlusCircle } from "lucide-react";
import { useState } from "react";// or your icon library

function BrandManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandName, setBrandName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call your API to add brand
    console.log("Submitting brand:", brandName);
    setBrandName(""); // clear input
    setIsModalOpen(false); // close modal
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="border p-2 bg-blue-500 rounded flex gap-2 items-center cursor-pointer text-white"
      >
        <PlusCircle size={18} />
        Add Brand
      </button>

      //test comment

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-4">Add New Brand</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Brand Name"
                className="border p-2 rounded w-full"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrandManager;
