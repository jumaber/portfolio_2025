import { ButtonSmall } from "../components/dashboard/ButtonSmall";

export function Dashboard({ user = "Júlia" }) {
  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-start p-4 md:p-8 lg:p-16 overflow-x-hidden">
      <div className="flex flex-row w-full justify-between">
        <div>Welcome back, {user}! </div>
        <div>Log out</div>
      </div>
      <div className="flex flex-row w-full gap-18">
        <div className="flex flex-col w-3/5">
          {/* Summary */}
          <div className="flex flex-row justify-between gap-4 py-10">
            <div className="white-box">
              <h2 className="text-[var(--dark-grey,#333)] text-center font-bold text-[24px] leading-none pb-2">
                9
              </h2>
              <p className="text-[var(--dark-grey,#333)] text-center font-normal text-[14px] leading-none font-sans">
                Projects
              </p>
            </div>
            <div className="white-box ">
              <h2 className="text-[var(--dark-grey,#333)] text-center font-bold text-[24px] leading-none pb-2">
                9
              </h2>
              <p className="text-[var(--dark-grey,#333)] text-center font-normal text-[14px] leading-none font-sans">
                Projects
              </p>
            </div>
            <div className="white-box ">
              <h2 className="text-[var(--dark-grey,#333)] text-center font-bold text-[24px] leading-none pb-2">
                9
              </h2>
              <p className="text-[var(--dark-grey,#333)] text-center font-normal text-[14px] leading-none font-sans">
                Projects
              </p>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="flex flex-col w-2/5">
          <div className="flex flex-row justify-between gap-4 py-10">
            <div className="white-box">
              <div>
                <h2>Google Analytics</h2>
                <ButtonSmall />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
