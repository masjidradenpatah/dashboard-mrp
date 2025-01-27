"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { LinkSelector } from "@/components/editor/selectors/LinkSelector";
import { MathSelector } from "@/components/editor/selectors/MathSelector";
import { TextButtons } from "@/components/editor/selectors/TextButtons";
import { ColorSelector } from "@/components/editor/selectors/ColorSelector";
import { EditorBubble, useEditor } from "novel";
import { NodeSelector } from "@/components/editor/selectors/NodeSelector";
import { Button } from "@/components/ui/button";
import { AISelector } from "@/components/editor/generative/ai-selector";
import Magic from "@/components/editor/icons/magic";
import { removeAIHighlight } from "novel/extensions";
import { Editor } from "@tiptap/core";

const EditorBubbleMenu = () => {
  const { editor } = useEditor();
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  useEffect(() => {
    if (!open) removeAIHighlight(editor as Editor);
  }, [editor]);

  return (
    <EditorBubble
      tippyOptions={{
        placement: openAI ? "bottom-start" : "top",
        onHidden: () => {
          setOpenAI(false);
          if (!editor) return null;
          editor.chain().unsetHighlight().run();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
      pluginKey={""}
    >
      {openAI && <AISelector open={openAI} onOpenChange={setOpenAI} />}
      {!openAI && (
        <Fragment>
          <Button
            className="gap-1 rounded-none text-purple-500"
            variant="ghost"
            onClick={() => {
              return setOpenAI(true);
            }}
            size="sm"
          >
            <Magic className="size-5" />
            Ask AI
          </Button>
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <MathSelector />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </Fragment>
      )}
    </EditorBubble>
  );
};
export default EditorBubbleMenu;
