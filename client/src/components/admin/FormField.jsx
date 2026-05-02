import ReactQuill from "react-quill-new";
import ImageUploadField from "../common/ImageUploadField";

const baseInputClass = "w-full rounded-2xl border-slate-200 bg-white text-sm";

const fieldHelpText = {
  "multiline-list": "Enter one item per line.",
  "comma-list": "Separate items with commas.",
  metrics: "Enter one metric per line in the format Label|Value.",
};

const FormField = ({ field, value, onChange }) => {
  const handleSimpleChange = (event) => {
    if (field.type === "checkbox") {
      onChange(field.name, event.target.checked);
      return;
    }

    onChange(field.name, event.target.value);
  };

  return (
    <div className={field.type === "richtext" ? "sm:col-span-2" : ""}>
      {field.type !== "image" ? <label className="mb-2 block text-sm font-semibold text-midnight">{field.label}</label> : null}

      {field.type === "textarea" ? (
        <textarea
          rows="5"
          value={value || ""}
          onChange={handleSimpleChange}
          required={field.required}
          className={baseInputClass}
        />
      ) : null}

      {field.type === "text" || field.type === "number" || field.type === "date" ? (
        <input
          type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
          value={value || ""}
          onChange={handleSimpleChange}
          required={field.required}
          className={baseInputClass}
        />
      ) : null}

      {field.type === "select" ? (
        <select value={value || ""} onChange={handleSimpleChange} className={baseInputClass}>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : null}

      {field.type === "checkbox" ? (
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          <input type="checkbox" checked={Boolean(value)} onChange={handleSimpleChange} />
          Enable this option
        </label>
      ) : null}

      {field.type === "richtext" ? (
        <div className="rounded-[24px] border border-slate-200 bg-white p-3">
          <ReactQuill theme="snow" value={value || ""} onChange={(content) => onChange(field.name, content)} />
        </div>
      ) : null}

      {field.type === "image" ? (
        <ImageUploadField label={field.label} value={value || ""} onChange={(next) => onChange(field.name, next)} />
      ) : null}

      {["multiline-list", "comma-list", "metrics"].includes(field.type) ? (
        <>
          <textarea rows="5" value={value || ""} onChange={handleSimpleChange} className={baseInputClass} />
          <p className="mt-2 text-xs text-slate-500">{fieldHelpText[field.type]}</p>
        </>
      ) : null}
    </div>
  );
};

export default FormField;
