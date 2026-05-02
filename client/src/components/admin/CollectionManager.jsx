import { Edit3, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { arrayToComma, arrayToLines, commaToArray, linesToArray, linesToMetrics, metricsToLines } from "../../utils/formatters";
import LoadingScreen from "../common/LoadingScreen";
import FormField from "./FormField";

const createEmptyState = (fields) =>
  fields.reduce((accumulator, field) => {
    accumulator[field.name] = field.type === "checkbox" ? false : "";
    return accumulator;
  }, {});

const formatDateInput = (value) => (value ? new Date(value).toISOString().split("T")[0] : "");

const prepareFormState = (item, fields) =>
  fields.reduce((accumulator, field) => {
    const sourceValue = item?.[field.name];

    if (field.type === "multiline-list") {
      accumulator[field.name] = arrayToLines(sourceValue);
    } else if (field.type === "comma-list") {
      accumulator[field.name] = arrayToComma(sourceValue);
    } else if (field.type === "metrics") {
      accumulator[field.name] = metricsToLines(sourceValue);
    } else if (field.type === "checkbox") {
      accumulator[field.name] = Boolean(sourceValue);
    } else if (field.type === "date") {
      accumulator[field.name] = formatDateInput(sourceValue);
    } else {
      accumulator[field.name] = sourceValue ?? "";
    }

    return accumulator;
  }, {});

const serializePayload = (formState, fields) =>
  fields.reduce((accumulator, field) => {
    const value = formState[field.name];

    if (field.type === "multiline-list") {
      accumulator[field.name] = linesToArray(value);
    } else if (field.type === "comma-list") {
      accumulator[field.name] = commaToArray(value);
    } else if (field.type === "metrics") {
      accumulator[field.name] = linesToMetrics(value);
    } else if (field.type === "number") {
      accumulator[field.name] = Number(value || 0);
    } else if (field.type === "checkbox") {
      accumulator[field.name] = Boolean(value);
    } else if (field.type === "date") {
      accumulator[field.name] = value || null;
    } else {
      accumulator[field.name] = value;
    }

    return accumulator;
  }, {});

const previewValue = (item, key) => {
  const value = item[key];

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return value || "Not set";
};

const CollectionManager = ({ title, config, items, loading, onCreate, onUpdate, onDelete }) => {
  const initialState = useMemo(() => createEmptyState(config.fields), [config.fields]);
  const [formState, setFormState] = useState(initialState);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormState(initialState);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormState(prepareFormState(item, config.fields));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    setFormState(initialState);
  };

  const handleChange = (name, value) => {
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const payload = serializePayload(formState, config.fields);

      if (editingItem?._id) {
        await onUpdate(editingItem._id, payload);
        toast.success("Entry updated.");
      } else {
        await onCreate(payload);
        toast.success("Entry created.");
      }

      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save changes.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title || item.client}"?`)) {
      return;
    }

    try {
      await onDelete(item._id);
      toast.success("Item deleted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete item.");
    }
  };

  if (loading) {
    return <LoadingScreen label={`Loading ${title.toLowerCase()}...`} />;
  }

  return (
    <>
      <div className="glass-panel p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Content Manager</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-midnight">{title}</h1>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
          >
            <Plus className="h-4 w-4" />
            New Entry
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {items?.map((item) => (
          <article key={item._id} className="glass-panel p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-midnight">{item.title || item.client}</h2>
                <p className="mt-2 text-sm text-slate-500">{item.slug || item.category || item.location}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="rounded-full border border-slate-200 p-3 text-slateblue"
                  aria-label="Edit item"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="rounded-full border border-slate-200 p-3 text-rose-500"
                  aria-label="Delete item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {config.previewFields.map((fieldName) => (
                <div key={fieldName}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{fieldName}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{previewValue(item, fieldName)}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {!items?.length ? (
        <div className="glass-panel p-10 text-center text-slate-500">No content exists yet. Create the first entry to get started.</div>
      ) : null}

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-midnight/45 p-4">
          <div className="w-full max-w-5xl rounded-[32px] bg-[#f7f9fc] shadow-soft">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                  {editingItem ? "Edit Entry" : "New Entry"}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-midnight">{title}</h2>
              </div>
              <button type="button" onClick={closeModal} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {config.fields.map((field) => (
                  <FormField key={field.name} field={field} value={formState[field.name]} onChange={handleChange} />
                ))}
              </div>

              <div className="flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CollectionManager;
