import { Link } from "react-router-dom";

export function Card({ slug, image, title, subtitle, roles, tech }) {
  return (
    <Link to={`/project/${slug}`}>
      <div className="bg-white p-4 rounded-sm shadow-soft hover:shadow-md transition-all">
        <img src={image} alt={title} />
        <div className="text-h3">{title}</div>
        <div className="subparagraph">{subtitle}</div>
        <div className="flex flex-wrap gap-3 pt-2">
          {roles.map((role, i) => (
            <div key={i} className="tag blue">
              {role}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          {tech.map((item, i) => (
            <div key={i} className="tag blue">
              {item}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
