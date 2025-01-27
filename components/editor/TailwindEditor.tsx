"use client";

import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  JSONContent,
} from "novel";
import { useState } from "react";
import { defaultExtensions } from "@/components/editor/TailwindEditorExtensions";
import {
  slashCommand,
  suggestionItems,
} from "@/components/editor/TailwindEditorSlashCommands";
import { NodeSelector } from "@/components/editor/selectors/NodeSelector";
import { LinkSelector } from "@/components/editor/selectors/LinkSelector";
import { TextButtons } from "@/components/editor/selectors/TextButtons";
import { ColorSelector } from "@/components/editor/selectors/ColorSelector";

const extensions = [...defaultExtensions, slashCommand];

const TailwindEditor = () => {
  const [content, setContent] = useState<JSONContent>();

  // const debouncedUpdates = useDebouncedCallback(
  //   async (editor: EditorInstance) => {
  //     const json = editor.getJSON();
  //     setContent(json);
  //     setSaveStatus("Saved");
  //   },
  //   500,
  // );
  const openAI = false;
  const [openNode, setOpenNode] = useState<boolean>(false);
  const [openLink, setOpenLink] = useState<boolean>(false);
  const [openColor, setOpenColor] = useState<boolean>(false);
  return (
    <EditorRoot>
      <EditorContent
        className={"size-full"}
        initialContent={content}
        immediatelyRender={false}
        // onUpdate={debouncedUpdates}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
        extensions={extensions}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={() => {
                  // if (item) item.command(val);
                }}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent`}
                key={item.title}
              >
                <div className="flex size-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
        <EditorBubble
          tippyOptions={{
            placement: openAI ? "bottom-start" : "top",
          }}
          className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
        >
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <TextButtons />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
        <div className="min-h-screen w-full bg-red-800"></div>
      </EditorContent>
    </EditorRoot>
  );
};
export default TailwindEditor;
