"use client";

import { useMemo, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Import specific extensions for desired features
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
// REMOVE THIS LINE: import { FontSize } from '@tiptap/extension-font-size'; // This module does not exist

export default function Description({ data, handleData }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // If you don't want the default Heading from StarterKit, you'd disable it here:
        // Heading: false,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      FontFamily,
      // REMOVE THIS LINE: FontSize // This extension is not available directly
    ],
    content: data?.description || "",
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      handleData("description", htmlContent);
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none p-4 min-h-[150px] overflow-y-auto tiptap-editor",
      },
    },
  });

  useEffect(() => {
    if (editor && data?.description !== undefined) {
      const currentHtml = editor.getHTML();
      if (currentHtml !== data.description) {
        editor.commands.setContent(data.description, false);
      }
    } else if (editor && data?.description === undefined && editor.getHTML() !== "") {
        editor.commands.setContent("", false);
    }
  }, [data, editor]);

  if (!editor) {
    return null;
  }

  const MenuBar = () => {
    if (!editor) {
      return null;
    }

    return (
      <div className="flex flex-wrap items-center p-2 border-b bg-gray-50 toolbar-tiptap">
        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          aria-label="Bold"
        >
          <span className="font-bold">B</span>
        </button>
        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          aria-label="Italic"
        >
          <span className="italic">I</span>
        </button>
        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          aria-label="Underline"
        >
          <span className="underline">U</span>
        </button>
        {/* Strikethrough */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${editor.isActive('strike') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          aria-label="Strikethrough"
        >
          <span className="line-through">S</span>
        </button>
        {/* Paragraph / Headings (BlockType equivalent for "size") */}
        <select
          onChange={(e) => {
            const level = e.target.value === 'paragraph' ? 0 : parseInt(e.target.value.replace('h', ''));
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
          value={
            editor.isActive('heading', { level: 1 }) ? 'h1' :
            editor.isActive('heading', { level: 2 }) ? 'h2' :
            editor.isActive('heading', { level: 3 }) ? 'h3' :
            editor.isActive('heading', { level: 4 }) ? 'h4' :
            editor.isActive('heading', { level: 5 }) ? 'h5' :
            editor.isActive('heading', { level: 6 }) ? 'h6' :
            'paragraph'
          }
          className="p-1 mx-1 border rounded text-sm"
        >
          <option value="paragraph">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>

        {/* Font Family */}
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          value={editor.getAttributes('textStyle').fontFamily || ''}
          className="p-1 mx-1 border rounded text-sm"
        >
          <option value="">Font Family</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Impact">Impact</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>

        {/* Text Color */}
        <input
          type="color"
          onInput={(event) => editor.chain().focus().setColor(event.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="p-1 mx-1 border rounded w-8 h-8 cursor-pointer"
          aria-label="Text Color"
        />

        {/* Text Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          aria-label="Align Left"
        >
          <span className="text-sm">Left</span>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          aria-label="Align Center"
        >
          <span className="text-sm">Center</span>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          aria-label="Align Right"
        >
          <span className="text-sm">Right</span>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-2 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          aria-label="Align Justify"
        >
          <span className="text-sm">Justify</span>
        </button>

        {/* Undo / Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          aria-label="Undo"
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          aria-label="Redo"
        >
          Redo
        </button>
      </div>
    );
  };

  return (
    <div className="border rounded-md flex flex-col">
      <MenuBar />
      <EditorContent editor={editor} className="flex-grow" />
    </div>
  );
}