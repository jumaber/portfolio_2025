import { Link } from "react-router-dom";
import { ButtonSmall } from "../components/dashboard/ButtonSmall";

export function EditProject(
  projectName="Project Name",
) {

  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-start p-4 md:p-8 lg:p-16 overflow-x-hidden">
      {/* Header*/}
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full justify-between items-center">
          <Link to="/dashboard">
            <div className="back-button">← Back to Dashboard</div>
          </Link>
          <div className="flex flex-row gap-2">
            <ButtonSmall text={"Visit"} className={"bg-[#0C0093] text-white"} />
            <ButtonSmall
              text={"Save"}
              className={"bg-[#FFA7A7] text-white"}
              image={null}
            />
          </div>
        </div>
        <div>
          <div className="project-title pt-6">Project Name</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row w-full">Col Left</div>
        <div>Col Right</div>
      </div>
    </div>
  );
}
