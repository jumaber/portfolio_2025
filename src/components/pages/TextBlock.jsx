import { EditTextBlock } from "../edit/EditTextBlock";

export function TextBlock({ data, onChange }) {
  return <EditTextBlock data={data} onChange={onChange} />;
}
