import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";


export function EditorJSBlock({ data, onChange }) {
  const holderId = "editor-js-text-block";
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: holderId,
      autofocus: false,
      data: data?.blocks?.length
        ? data
        : {
            time: Date.now(),
            blocks: [],
            version: "2.28.2",
          },
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: "Start typing...",
          },
        },
        header: Header,
      },
      onReady: () => {
        editorRef.current = editor;
      },
      onChange: async () => {
        const content = await editor.save();
        onChange(content);
      },
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
      <div id={holderId} className="form-input" />
  );
}
