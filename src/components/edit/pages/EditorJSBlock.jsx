import { useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";

export const EditorJSBlock = forwardRef(({ data, onChange }, ref) => {
  const holderId = useRef(
    `editor-js-${Math.random().toString(36).substr(2, 9)}`
  ).current;
  const editorRef = useRef(null);

  // Expose save() to parent
  useImperativeHandle(ref, () => ({
    async save() {
      if (editorRef.current) {
        const content = await editorRef.current.save();
        onChange(content);
        return content;
      }
    },
  }));

  // Initialize Editor.js once
  useEffect(() => {
    if (editorRef.current) return; // ✅ prevent double init

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

  return <div id={holderId} className="form-input" />;
});
