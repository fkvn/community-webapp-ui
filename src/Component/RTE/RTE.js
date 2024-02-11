import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Divider } from "antd";
import MenuBar from "./MenuBar";

/**
 *
 * @editor functions: editor.getHTML()
 * @returns
 */
function RTE({ defaultContent = "", onUpdate = () => {} }) {
	console.log(defaultContent);
	// define your extension array
	const editor = useEditor({
		extensions: [
			StarterKit,
			Highlight,
			TaskList,
			TaskItem,
			Image,
			CharacterCount.configure({
				limit: 10000,
			}),
			Youtube.configure({
				controls: true,
				allowFullscreen: true,
			}),
			Link.configure({
				openOnClick: true,
				autolink: true,
			}),
		],
		content:
			defaultContent || window.localStorage.getItem("editor-content") || "",
		onUpdate: ({ editor }) => {
			window.localStorage.setItem("editor-content", editor.getHTML());

			// this is to call a custom update event when the content is updated
			onUpdate && onUpdate(editor);
		},
		onCreate({ editor }) {
			// this is to call a custom update event when we have the defaultContent
			onUpdate && onUpdate(editor);
		},
	});

	return (
		<div
			className=" py-2 px-4 editor rounded-3"
			style={{
				minHeight: "20rem",
			}}
		>
			{editor && <MenuBar editor={editor} />}
			<Divider className="my-2 mx-0" />
			<EditorContent editor={editor} className="py-3" />
		</div>
	);
}

export default RTE;
