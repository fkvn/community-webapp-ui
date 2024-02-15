import {
	RiArrowGoBackLine,
	RiArrowGoForwardLine,
	RiBold,
	RiCodeBlock,
	RiCodeView,
	RiDoubleQuotesL,
	RiEmojiStickerLine,
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
import { Flex, Image, Popover, Select } from "antd";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { svgYoutubeLogo } from "../../Asset/Asset";
import { uploadFileAxios } from "../../Axios/utilAxios";
import UploadImage from "../Upload/UploadImage";
import MenuItem from "./MenuItem";

function MenuBar({ editor, className, menuProps }) {
	const { t } = useTranslation();

	const items = [
		{
			icon: <RiArrowGoBackLine size={18} />,
			action: () => editor?.chain()?.focus()?.undo()?.run(),
		},
		{
			icon: <RiArrowGoForwardLine size={18} />,
			action: () => editor.chain().focus().redo().run(),
		},
		{
			icon: <RiText size={20} />,
			action: () => editor.chain().focus().setParagraph().run(),
			isActive: () => editor.isActive("paragraph"),
		},
		{
			icon: <RiH1 size={20} />,
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
			action: () => editor.chain().focus().toggleBold().run(),
			isActive: () => editor.isActive("bold"),
		},
		{
			icon: <RiItalic size={20} />,
			action: () => editor.chain().focus().toggleItalic().run(),
			isActive: () => editor.isActive("italic"),
		},
		{
			icon: <RiStrikethrough size={20} />,
			action: () => editor.chain().focus().toggleStrike().run(),
			isActive: () => editor.isActive("strike"),
		},
		{
			icon: <RiCodeView size={20} />,
			action: () => editor.chain().focus().toggleCode().run(),
			isActive: () => editor.isActive("code"),
		},
		{
			icon: <RiMarkPenLine size={20} />,

			action: () => editor.chain().focus().toggleHighlight().run(),
			isActive: () => editor.isActive("highlight"),
		},
		{
			icon: <RiListUnordered size={20} />,

			action: () => editor.chain().focus().toggleBulletList().run(),
			isActive: () => editor.isActive("bulletList"),
		},
		{
			icon: <RiListOrdered size={20} />,

			action: () => editor.chain().focus().toggleOrderedList().run(),
			isActive: () => editor.isActive("orderedList"),
		},

		{
			icon: <RiListCheck2 size={20} />,

			action: () => editor.chain().focus().toggleTaskList().run(),
			isActive: () => editor.isActive("taskList"),
		},
		{
			icon: <RiCodeBlock size={20} />,

			action: () => editor.chain().focus().toggleCodeBlock().run(),
			isActive: () => editor.isActive("codeBlock"),
		},
		{
			icon: <RiDoubleQuotesL size={20} />,

			action: () => editor.chain().focus().toggleBlockquote().run(),
			isActive: () => editor.isActive("blockquote"),
		},
		{
			icon: <RiSeparator size={20} />,

			action: () => editor.chain().focus().setHorizontalRule().run(),
		},

		{
			icon: <RiTextWrap size={20} />,

			action: () => editor.chain().focus().setHardBreak().run(),
		},
		{
			icon: <RiFormatClear size={20} />,

			action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
		},
		{
			icon: (
				<UploadImage
					multiple={true}
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
								const beforeUploadPosition =
									editor.view.props.state.selection.anchor;

								editor.chain().setImage({ src: url }).run();

								// focus the editor 3 nodes after because one is for the new added picture, two is for the next nodes, otherwise, multiple urls will be overwritten at the same node
								editor.commands.enter();
								editor.commands.focus(beforeUploadPosition + 3);
							}
						})
					}
				/>
			),
		},
		{
			icon: <Image src={svgYoutubeLogo} width={22} preview={false} />,

			action: () => {
				const url = prompt("YouTube URL");

				if (url) {
					const beforeUploadPosition = editor.view.props.state.selection.anchor;

					editor
						.chain()
						.focus()
						.setYoutubeVideo({
							src: url,
						})
						.run();

					// focus the editor 3 nodes after because one is for the new added picture, two is for the next nodes, otherwise, multiple urls will be overwritten at the same node
					editor.commands.enter();
					editor.commands.focus(beforeUploadPosition + 3);
				}
			},
		},
		{
			icon: (
				<Popover
					content={
						<Select
							showSearch
							style={{ width: 200 }}
							placeholder={t("search_msg")}
							optionFilterProp="children"
							filterOption={(input, option) =>
								option?.shortcodes.find((shortcode) =>
									shortcode.startsWith(input.toLowerCase())
								) ||
								option?.tags.find((tag) => tag.startsWith(input.toLowerCase()))
							}
							fieldNames={{ label: "emoji", value: "name" }}
							options={editor?.storage?.emoji?.emojis}
							onSelect={(value) => editor.chain().focus().setEmoji(value).run()}
						/>
					}
					title={t("emoji_msg")}
					trigger="click"
					className="custom-center"
				>
					<RiEmojiStickerLine size={22} />{" "}
				</Popover>
			),
		},
	];

	return (
		<Flex
			wrap="wrap"
			gap={5}
			align="center"
			className={`${className}`}
			{...menuProps}
		>
			{(items || []).map((item, index) => (
				<Fragment key={index}>
					<MenuItem {...item} />
				</Fragment>
			))}
		</Flex>
	);
}

export default MenuBar;
