import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, Plus, AlertCircle } from "lucide-react"

// ✅ Zod validation schema
const productSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Price must be a positive number"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  category: z.string().min(1, "Category is required"),
  image: z
    .string()
    .min(1, "Image URL is required")
    .url("Please enter a valid URL")
    .refine((url) => {
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
      return (
        imageExtensions.some((ext) => url.toLowerCase().includes(ext)) ||
        url.includes("placeholder")
      )
    }, "URL must be a valid image link"),
})

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"]

function AddProductForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  })

  // ✅ Close on ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // mock API delay

      const newProduct = {
        id: Date.now(),
        title: data.title,
        price: Number.parseFloat(data.price),
        description: data.description,
        category: data.category,
        image: data.image,
        rating: { rate: 0, count: 0 },
      }

      console.log("✅ Mock product created:", newProduct)
      alert("Product added successfully! (This is a mock submission)")

      reset()
      onClose()
    } catch (error) {
      console.error("❌ Error creating product:", error)
      alert("Error creating product. Please try again.")
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const imageUrl = watch("image")

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Product Title *
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter product title"
              />
              {errors.title && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title.message}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Price (USD) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register("price")}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.00"
              />
              {errors.price && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  {errors.price.message}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category *
              </label>
              <select
                id="category"
                {...register("category")}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  {errors.category.message}
                </div>
              )}
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL *
              </label>
              <input
                id="image"
                type="url"
                {...register("image")}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  {errors.image.message}
                </div>
              )}

              {imageUrl && !errors.image && (
                <div className="mt-2">
                  <p className="text-sm mb-2">Preview:</p>
                  <div className="w-32 h-32 border rounded-md overflow-hidden bg-gray-50">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none"
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description")}
                className="w-full px-3 py-2 border rounded-md resize-vertical"
                placeholder="Enter product description"
              />
              {errors.description && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description.message}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProductForm;