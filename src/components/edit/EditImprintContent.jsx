import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";

export function EditImprintContent({ data, onChange }) {

  const [form, setForm] = useState({
    imprintResponsible: "",
    imprintContactEmail: "",
    imprintDisclaimer: "",
    imprintDisclaimerEU: "",
    imprintDisclaimerFreelance: "",
   });

  useEffect(() => {
    console.log("Received data:", data);
    if (data) setForm(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onChange(updatedForm);
  }

  return (
    <div className="grey-box">
      <div className="flex flex-col w-full justify-between items-start cursor-pointer">
        <div className="component-title mb-4">Intro</div>
        <div className="w-full">
          <div className="form-header">Responsible for Content</div>
          <input
            type="text"
            name="imprintResponsible"
            value={form.imprintResponsible}
            onChange={handleChange}
            placeholder="Address"
            className="form-input"
          />

          <div className="form-header">Address</div>
          <input
            type="text"
            name="imprintStreet"
            value={form.imprintStreet}
            onChange={handleChange}
            placeholder="Street & Number"
            className="form-input"
          />

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full">
              <div className="form-header">Post Code</div>
              <input
                type="text"
                name="imprintPostCode"
                value={form.imprintPostCode}
                onChange={handleChange}
                placeholder="PLZ"
                className="form-input"
              />
            </div>

            <div className="w-full">
              <div className="form-header">City</div>
              <input
                type="text"
                name="imprintCity"
                value={form.imprintCity}
                onChange={handleChange}
                placeholder="City"
                className="form-input"
              />
            </div>

            <div className="w-full">
              <div className="form-header">Country</div>
              <input
                type="text"
                name="imprintCountry"
                value={form.imprintCountry}
                onChange={handleChange}
                placeholder="Country"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-header">Email</div>
          <input
            type="text"
            name="imprintContactEmail"
            value={form.imprintContactEmail}
            onChange={handleChange}
            placeholder="Email"
            className="form-input"
          />
          <div className="form-header">Disclaimer</div>
          <textarea
            name="imprintDisclaimer"
            value={form.imprintDisclaimer}
            onChange={handleChange}
            placeholder="Content Disclaimer in Germany"
            className="form-input"
          />
          <div className="form-header">EU Dispute Resolution</div>
          <textarea
            name="imprintDisclaimerEU"
            value={form.imprintDisclaimerEU}
            onChange={handleChange}
            placeholder="Content Dispute in EU"
            className="form-input"
          />
          <div className="form-header">Title for Link to EU law</div>
          <input
            type="text"
            name="imprintDisclaimerEUURLTitle"
            value={form.imprintDisclaimerEUURLTitle}
            onChange={handleChange}
            placeholder="Title for Link"
            className="form-input"
          />
          <div className="form-header">Link to EU law</div>
          <input
            type="text"
            name="imprintDisclaimerEUURL"
            value={form.imprintDisclaimerEUURL}
            onChange={handleChange}
            placeholder="Link"
            className="form-input"
          />
          <div className="form-header">Small Business Regulation</div>
          <textarea
            name="imprintDisclaimerFreelance"
            value={form.imprintDisclaimerFreelance}
            onChange={handleChange}
            placeholder="Kleinunternehmer Text"
            className="form-input"
          />
        </div>
      </div>
    </div>
  );
}
