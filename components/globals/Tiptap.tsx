'use client'

import { useEditor, EditorContent } from '@tiptap/react'

const Tiptap = () => {
  const editor = useEditor();
  return <EditorContent editor={editor} />
}

export default Tiptap
