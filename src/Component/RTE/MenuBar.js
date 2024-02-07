import {
	RiArrowGoBackLine,
	RiArrowGoForwardLine,
	RiBold,
	RiCodeBlock,
	RiCodeView,
	RiDoubleQuotesL,
	RiFormatClear,
	RiH1,
	RiH2,
	RiImageAddLine,
	RiItalic,
	RiListCheck2,
	RiListOrdered,
	RiListUnordered,
	RiMarkPenLine,
	RiSeparator,
	RiStrikethrough,
	RiText,
	RiTextWrap,
} from "@remixicon/react";
import { Flex } from "antd";
import { Fragment } from "react";
import { uploadFileAxios } from "../../Axios/utilAxios";
import UploadImage from "../Upload/UploadImage";
import MenuItem from "./MenuItem";

function MenuBar({ editor }) {
	const items = [
		{
			icon: <RiArrowGoBackLine size={18} />,
			title: "Undo",
			action: () => editor?.chain()?.focus()?.undo()?.run(),
		},
		{
			icon: <RiArrowGoForwardLine size={18} />,
			title: "Redo",
			action: () => editor.chain().focus().redo().run(),
		},
		{
			icon: <RiText size={20} />,
			title: "Paragraph",
			action: () => editor.chain().focus().setParagraph().run(),
			isActive: () => editor.isActive("paragraph"),
		},
		{
			icon: <RiH1 size={20} />,
			title: "Heading 1",
			action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
			isActive: () => editor.isActive("heading", { level: 1 }),
		},
		{
			icon: <RiH2 size={20} />,
			title: "Heading 2",
			action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
			isActive: () => editor.isActive("heading", { level: 2 }),
		},

		{
			icon: <RiBold size={20} />,
			title: "Bold",
			action: () => editor.chain().focus().toggleBold().run(),
			isActive: () => editor.isActive("bold"),
		},
		{
			icon: <RiItalic size={20} />,
			title: "Italic",
			action: () => editor.chain().focus().toggleItalic().run(),
			isActive: () => editor.isActive("italic"),
		},
		{
			icon: <RiStrikethrough size={20} />,
			title: "Strike",
			action: () => editor.chain().focus().toggleStrike().run(),
			isActive: () => editor.isActive("strike"),
		},
		{
			icon: <RiCodeView size={20} />,
			title: "Code",
			action: () => editor.chain().focus().toggleCode().run(),
			isActive: () => editor.isActive("code"),
		},
		{
			icon: <RiMarkPenLine size={20} />,
			title: "Highlight",
			action: () => editor.chain().focus().toggleHighlight().run(),
			isActive: () => editor.isActive("highlight"),
		},
		{
			icon: <RiListUnordered size={20} />,
			title: "Bullet List",
			action: () => editor.chain().focus().toggleBulletList().run(),
			isActive: () => editor.isActive("bulletList"),
		},
		{
			icon: <RiListOrdered size={20} />,
			title: "Ordered List",
			action: () => editor.chain().focus().toggleOrderedList().run(),
			isActive: () => editor.isActive("orderedList"),
		},

		{
			icon: <RiListCheck2 size={20} />,
			title: "Task List",
			action: () => editor.chain().focus().toggleTaskList().run(),
			isActive: () => editor.isActive("taskList"),
		},
		{
			icon: <RiCodeBlock size={20} />,
			title: "Code Block",
			action: () => editor.chain().focus().toggleCodeBlock().run(),
			isActive: () => editor.isActive("codeBlock"),
		},
		{
			icon: <RiDoubleQuotesL size={20} />,
			title: "Blockquote",
			action: () => editor.chain().focus().toggleBlockquote().run(),
			isActive: () => editor.isActive("blockquote"),
		},
		{
			icon: <RiSeparator size={20} />,
			title: "Horizontal Rule",
			action: () => editor.chain().focus().setHorizontalRule().run(),
		},

		{
			icon: <RiTextWrap size={20} />,
			title: "Hard Break",
			action: () => editor.chain().focus().setHardBreak().run(),
		},
		{
			icon: <RiFormatClear size={20} />,
			title: "Clear Format",
			action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
		},
		{
			icon: (
				<UploadImage
					uploadButton={
						<RiImageAddLine
							size={27}
							className="custom-center"
							style={{
								paddingTop: ".35rem",
							}}
						/>
					}
					uploadImageOnClick={(formdata) =>
						uploadFileAxios(formdata).then((url = "") => {
							if (url) {
								editor.chain().focus().setImage({ src: url }).run();
							}
						})
					}
				/>
			),
			title: "Add Image",
		},
	];

	return (
		<Flex wrap="wrap" gap={5} align="center">
			{items.map((item, index) => (
				<Fragment key={index}>
					{item.type === "divider" ? (
						<div className="divider" />
					) : (
						<MenuItem {...item} />
					)}
				</Fragment>
			))}
		</Flex>
	);
}

export default MenuBar;
