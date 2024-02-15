import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Youtube from "@tiptap/extension-youtube";
import {
	BubbleMenu,
	EditorContent,
	FloatingMenu,
	useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Divider } from "antd";
import MenuBar from "./MenuBar";
import suggestion from "./suggestion";

/**
 *
 * @editor functions: editor.getHTML()
 * @returns
 */
function RTE({
	mainClassName = "",
	mainProps = {},
	editorClassName = "",
	editorProps = {},
	defaultContent = "",
	onUpdate = () => {},
}) {
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
			Emoji.configure({
				emojis: gitHubEmojis,
				enableEmoticons: true,
				suggestion,
			}),
		],
		editorProps: {
			handleDOMEvents: {
				keydown: (view, event) => {
					if (event.key === "/") {
						view.setProps({
							floatMenu: true,
						});
					} else {
						view.setProps({
							floatMenu: false,
						});
					}

					return false;
				},
			},
		},
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
		<main
			className={`py-2 px-4 editor mh-20 rounded-3  ${mainClassName}`}
			{...mainProps}
		>
			{editor && <MenuBar editor={editor} />}
			<Divider className="my-2 mx-0" />
			{editor && (
				<FloatingMenu
					editor={editor}
					shouldShow={({ view }) => view.props.floatMenu}
					tippyOptions={{ duration: 100 }}
				>
					<MenuBar editor={editor} className="shadow p-2" />
				</FloatingMenu>
			)}

			{editor && (
				<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
					<MenuBar editor={editor} className="shadow p-2" />
				</BubbleMenu>
			)}

			<EditorContent
				editor={editor}
				className={`py-3 ${editorClassName}`}
				{...editorProps}
			/>
		</main>
	);
}

export default RTE;
