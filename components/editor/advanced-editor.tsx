"use client";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import EditorBubbleMenu from "@/components/editor/EditorBubble";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./TailwindEditorExtensions";
import {
  slashCommand,
  suggestionItems,
} from "@/components/editor/TailwindEditorSlashCommands";

const extensions = [...defaultExtensions, slashCommand];

interface AdvancedEditorProps {
  onUpdate: (content: string) => void;
  // type: "NEW" | "EDIT";
  initialData: JSONContent;
}

const TailwindAdvancedEditor = ({
  onUpdate,
  // type,
  initialData,
}: AdvancedEditorProps) => {
  const [saveStatus, setSaveStatus] = useState<string>("Saved");

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  // const highlightCodeblocks = (content: string) => {
  //   const doc = new DOMParser().parseFromString(content, "text/html");
  //   doc.querySelectorAll("pre code").forEach((el) => {
  //     // @ts-expect-error from documentation
  //     // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
  //     hljs.highlightElement(el);
  //   });
  //   return new XMLSerializer().serializeToString(doc);
  // };

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      // debounse selama 1 menit

      // const json = editor.getJSON();
      // window.localStorage.setItem(
      //   "html-content",
      //   highlightCodeblocks(editor.getHTML()),
      // );
      // window.localStorage.setItem("novel-content", JSON.stringify(json));

      // update database kemungkinan disini
      setSaveStatus("Saving");
      onUpdate(editor.getHTML());
      setSaveStatus("Saved");
    },
    500,
  );

  return (
    <div className="relative flex w-full flex-col gap-2">
      <p className={"text-sm font-medium text-black"}>Konten</p>

      <EditorRoot>
        <EditorContent
          initialContent={initialData}
          extensions={extensions}
          className="relative !m-0 min-h-[500px] w-full grow-0 border bg-white sm:mb-[calc(20vh)] sm:rounded-md"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class:
                "prose !p-8 prose-lg dark:prose-invert prose-headings:font-title font-default  focus:outline-none max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
          slotAfter={<ImageResizer />}
        >
          <div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
            <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
              {saveStatus}
            </div>
          </div>
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  // @ts-expect-error just leave it like this for today
                  onCommand={(val) => item.command(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
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

          <EditorBubbleMenu />
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default TailwindAdvancedEditor;
