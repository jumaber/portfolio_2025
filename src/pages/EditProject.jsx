import { Link } from "react-router-dom";
import { ButtonSmall } from "../components/dashboard/ButtonSmall";
import { EditIntro } from "../components/edit/EditIntro";


export function EditProject() {

  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-start p-4 md:p-8 lg:p-16 overflow-x-hidden">
      {/* Header*/}
      <div className="flex flex-col w-full pb-10">
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
      <div className="flex flex-row w-full justify-between gap-10">
        <div className="flex flex-row w-2/3">
          <div className="white-box">
            <div className="text-h3 blue pb-4">Content</div>
           <EditIntro />
          </div>
        </div>
        <div className="white-box">
          <div className="text-h3 blue">Components</div>
          <div>Project Components</div>
        </div>
      </div>
    </div>
  );
}
