import { useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";

export const EditorJSBlock = forwardRef(({ data, onChange }, ref) => {
  const holderId = useRef(
    `editor-js-${Math.random().toString(36).substr(2, 9)}`
  ).current;
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    async save() {
      if (editorRef.current) {
        const content = await editorRef.current.save();
        onChange(content);
        return content;
      }
    },
  }));

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }

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
        onChange(content); // auto update on blur/typing
      },
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data, onChange, holderId]);

  return <div id={holderId} className="form-input" />;
});
