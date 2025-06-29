import { Link } from "react-router-dom";
import { NavBar } from "../components/other/NavBar";
export function ImprintPage() {
    return (
      <>
        <NavBar />
        <div className="h-full bg-[#FFF6F6] flex flex-col items-start py-20 px-4 md:px-8 lg:px-48 max-w-full overflow-x-hidden">
          <div className="w-full max-w-[800px] mx-auto">
            <h1 className="text-h1 mb-10">Imprint</h1>

            <section className="mb-10">
              <h2 className="text-h4 mb-2">Information according to § 5 TMG</h2>
              <p className="paragraph">
                Júlia Marí Bernaus
                <br />
                Geygerstrasse 8
                <br />
                12043, Berlin
                <br />
                Germany
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h4 mb-2">Contact</h2>
              <p className="paragraph">
                Email:{" "}
                <a
                  href="mailto:hi@juliamaribernaus.com"
                  className="links links:hover"
                >
                  hi@juliamaribernaus.com
                </a>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h4 mb-2">Disclaimer</h2>
              <p className="paragraph">
                Despite careful content control, I assume no liability for the
                content of external links. The operators of the linked pages are
                solely responsible for their content.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h4 mb-2">EU Dispute Resolution</h2>
              <p className="paragraph">
                Online dispute resolution in accordance with Art. 14 Para. 1
                ODR-VO: The European Commission provides a platform for online
                dispute resolution (ODR) available at&nbsp;
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="links links:hover"
                >
                  ec.europa.eu/consumers/odr/
                </a>
                .
              </p>
            </section>

            <p className="text-h4">
              Freelancer under § 19 UStG – VAT not shown due to small business
              regulation.
            </p>
          </div>
        </div>
      </>
    );
}
