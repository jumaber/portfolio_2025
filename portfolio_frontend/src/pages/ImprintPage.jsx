import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";
export function ImprintPage() {
    return (
      <>
        <NavBar />
        <div className="flex flex-col items-center py-20 p-4 md:p-8 lg:p-16 w-screen h-full bg-[var(--color-cream)]">
          <div className="max-w-[1440px]">
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
                  className="text-[var(--color-blue)] underline hover:opacity-80"
                >
                  hi@juliamaribernaus.com
                </a>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h4 mb-2">
                Responsible for content according to § 55 Abs. 2 RStV
              </h2>
              <p className="paragraph">
                Júlia Marí Bernaus.
                <br />
                Geygerstrasse 8
                <br />
                12043, Berlin
                <br />
                Germany
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-h4 mb-2">Disclaimer</h2>
              <p className="paragraph">
                Despite careful content control, we assume no liability for the
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
                  className="text-[var(--color-blue)] underline hover:opacity-80"
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
