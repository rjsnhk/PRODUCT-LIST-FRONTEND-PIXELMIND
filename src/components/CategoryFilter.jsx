import React from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "../utils/api"
import { useSearchStore } from "../store/useStore"

function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useSearchStore()

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories,
  })

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-24 bg-muted rounded-md animate-pulse flex-shrink-0"
          ></div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-sm text-destructive">Failed to load categories</div>
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap">
      <button
        onClick={() => setSelectedCategory("")}
        className={`px-3 py-2 sm:px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
          !selectedCategory
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        All Categories
      </button>
      {categories?.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-3 py-2 sm:px-4 rounded-md text-sm font-medium transition-colors capitalize whitespace-nowrap flex-shrink-0 ${
            selectedCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter;