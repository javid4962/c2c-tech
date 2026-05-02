import DOMPurify from "dompurify";

const RichTextRenderer = ({ content }) => (
  <div className="richtext text-slate-700" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content || "") }} />
);

export default RichTextRenderer;

