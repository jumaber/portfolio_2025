// Import the hook that makes the component draggable/sortable
import { useSortable } from "@dnd-kit/sortable";

// Import a utility to convert transform objects into inline styles
import { CSS } from "@dnd-kit/utilities";

// Import the reusable ListItem component you want to make sortable
import { ListItem } from "./ListItem";

// This component wraps a project in sortable functionality from dnd-kit
export function SortableItem({ project, setProjects, showBorder }) {


  // Destructure helpers returned by useSortable
  // - id must be unique for each item (we use project.slug)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.slug });

  // Convert the transform + transition into an inline style for animation
  const style = {
    transform: CSS.Transform.toString(transform), // e.g., "translateY(10px)"
    transition, // smooth movement animation
  };

  const API = import.meta.env.VITE_API_BASE_URL;

  // Function to update the 'featured' status of a project when toggled
  const handleFeaturedToggle = async (newValue) => {
    try {
      // Send a PATCH request to update the backend with the new value
      await fetch(`${API}/api/projects/${project.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: newValue }),
      });

      // Update the local state to reflect the change
      setProjects((prev) =>
        prev.map((p) =>
          p.slug === project.slug ? { ...p, featured: newValue } : p
        )
      );
    } catch (err) {
      console.error("Failed to update featured:", err);
    }
  };

  // Return the draggable wrapper with ListItem inside
  return (
    <div
      ref={setNodeRef} // connect this div to dnd-kit so it can be dragged
      style={style} // apply movement styling
      {...attributes} // accessibility attributes (like role="button")
      {...listeners} // event listeners (e.g., for drag start)
      className="group" // grouping so that when the user hovers sees the drag button
    >
      <ListItem
        id={project.slug} // optional prop for later use
        title={project.cardTitle}
        image={project.cardImage}
        slug={project.slug}
        featured={project.featured}
        onToggleFeatured={handleFeaturedToggle} // callback for switch toggle
        showBorder={showBorder} // whether to show the bottom border
      />
    </div>
  );
}
