"use client";

import { EditorContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic, List, ListOrdered, Redo, Redo2,
  Underline, Undo2
} from "lucide-react";
import React from "react";
import { Editor } from "@tiptap/core";

const Tiptap = ({ editor }: { editor: Editor }) => {
  return (
    <div className={"mx-auto rounded-lg "}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor}></EditorContent>
    </div>
  );
};

const Toolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex  justify-center  mb-2">
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        disabled={!editor.can().undo()}
      ><Undo2 /></Button>
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        disabled={!editor.can().redo()}
      ><Redo2 /></Button>

      <div className="min-h-1/3 w-px mx-1 bg-black/25" />
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={editor.isFocused && editor.isActive("bold") ? "bg-primary" : ""}
      ><Bold /></Button>
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={editor.isFocused && editor.isActive("italic") ? "bg-primary" : ""}
      ><Italic /></Button>

      <div className="min-h-1/3 w-px mx-1 bg-black/25" />

      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={editor.isFocused && editor.isActive("heading", { level: 1 }) ? "bg-primary" : ""}
      ><Heading1 /></Button>
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={editor.isFocused && editor.isActive("heading", { level: 2 }) ? "bg-primary" : ""}
      ><Heading2 /></Button>
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
        className={editor.isFocused && editor.isActive("heading", { level: 3 }) ? "bg-primary" : ""}
      ><Heading3 /></Button>
      <div className="min-h-1/3 w-px mx-1 bg-black/25" />
      {/* paragraph*/}
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isFocused && editor.isActive("bulletList") ? "bg-primary" : ""}
      ><List /></Button>
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isFocused && editor.isActive("orderedList") ? "bg-primary" : ""}
      ><ListOrdered /></Button>
      <div className="min-h-1/3 w-px mx-1 bg-black/25" />
      {/* paragraph*/}
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign('center').run();
        }}
        className={editor.isFocused && editor.isActive("bulletList") ? "bg-primary" : ""}
      ><AlignCenter /></Button>
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign('justify').run();
        }}
        className={editor.isFocused && editor.isActive("bulletList") ? "bg-primary" : ""}
      ><AlignJustify /></Button>
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign('left').run();
        }}
        className={editor.isFocused && editor.isActive("bulletList") ? "bg-primary" : ""}
      ><AlignLeft /></Button>
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign('right').run();
        }}
        className={editor.isFocused && editor.isActive("bulletList") ? "bg-primary" : ""}
      ><AlignRight /></Button>
    </div>
  );
};

export default Tiptap;
