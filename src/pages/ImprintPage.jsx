import { useEffect, useState } from "react";
import { NavBar } from "../components/other/NavBar";
import { LoadingAnimation } from "../components/other/LoadingAnimation";


export function ImprintPage() {
  const [imprint, setImprint] = useState(null);

   useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/pages/imprint`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched page:", data);
          setImprint(data);
        })
        .catch((err) => console.error("Failed to fetch page:", err));
    }, []);
  
    if (!imprint) return <LoadingAnimation />;


  return (
    <>
      <NavBar />
      <div className="h-full bg-[#FFF6F6] flex flex-col items-start py-20 px-4 md:px-8 lg:px-48 max-w-full overflow-x-hidden">
        <div className="w-full max-w-[800px] mx-auto">
          <h1 className="text-h1 mb-10">{imprint.title}</h1>

          <section className="mb-10">
            <h2 className="text-h4 mb-2">Information according to § 5 TMG</h2>
            <p className="paragraph">
              {imprint.imprintResponsible}
              <br />
              {imprint.imprintStreet}
              <br />
              {imprint.imprintPostCode}, {imprint.imprintCity}
              <br />
              {imprint.imprintCountry}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-h4 mb-2">Contact</h2>
            <p className="paragraph">
              Email:{" "}
              <a href={imprint.imprintEmailURL} className="links links:hover">
                {imprint.imprintContactEmail}
              </a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-h4 mb-2">Disclaimer</h2>
            <p className="paragraph">{imprint.imprintDisclaimer}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-h4 mb-2">EU Dispute Resolution</h2>
            <p className="paragraph">
              {imprint.imprintDisclaimerEU}
              <a
                href={imprint.imprintDisclaimerEUURL}
                target="_blank"
                rel="noopener noreferrer"
                className="links links:hover"
              >
                {imprint.imprintDisclaimerEUURLTitle}
              </a>
              .
            </p>
          </section>

          <p className="text-h4">{imprint.imprintDisclaimerFreelance}</p>
        </div>
      </div>
    </>
  );
}
