import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListItem } from "./ListItem";

export function SortableItem({ project, setProjects }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.slug });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleFeaturedToggle = async (newValue) => {
    try {
      await fetch(
        `https://portfolio-2025-wyed.onrender.com/api/projects/${project.slug}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ featured: newValue }),
        }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p.slug === project.slug ? { ...p, featured: newValue } : p
        )
      );
    } catch (err) {
      console.error("Failed to update featured:", err);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="py-2 border-b border-gray-200"
    >
      <ListItem
        id={project.slug}
        title={project.cardTitle}
        image={project.cardImage}
        slug={project.slug}
        featured={project.featured}
        onToggleFeatured={handleFeaturedToggle}
      />
    </div>
  );
}
