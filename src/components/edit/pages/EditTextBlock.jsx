import { EditorJSBlock } from "./EditorJSBlock";

export function EditTextBlock({ data, onChange }) {
  return (
    <div className="grey-box">
      <div className="form-header mb-4">Text Editor</div>
      <EditorJSBlock data={data} onChange={onChange} />
    </div>
  );
}
