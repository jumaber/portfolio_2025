import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListItem } from "./ListItem";

export function SortableItem({ project }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.slug });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
        featured={project.featured}
      />
    </div>
  );
}
