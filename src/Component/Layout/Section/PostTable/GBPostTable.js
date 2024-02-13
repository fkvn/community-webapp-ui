import { SearchOutlined } from "@ant-design/icons";
import { RiEdit2Line } from "@remixicon/react";
import { Button, Flex, Input, Table, Tag, Tooltip } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	GUIDE_BOOK_EDIT_POST_PATH,
	GUIDE_BOOK_NEW_POST_PATH,
	GUIDE_BOOK_PATH,
	MY_PROFILE_PATH,
	REDIRECT_URI,
	USER_REDUCER,
} from "../../../../Util/ConstVar";
import { formatString, formatTime } from "../../../../Util/Util";
import DeleteBtn from "../../../Button/DeleteBtn";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";

const GBPostTable = () => {
	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);
	const navigate = useNavigate();
	const { fetchGuideBooks, fetchGuideBookCategories, deleteGuideBook } =
		useGuideBookPost();
	const { t } = useTranslation(["Default", "Form"]);
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 20,
			showTotal: (total, range) =>
				t("pagination_item_count_msg", {
					value: `${range[0]}-${range[1]}`,
					total: total,
				}),
		},
		sorter: {
			field: "updatedOn",
			order: "descend",
		},
	});

	const newPostAuthorities = [
		"ROLE_ADMIN",
		"ROLE_SUPER_ADMIN",
		"ROLE_CONTRIBUTOR",
		"GUIDEBOOK_CREATE",
	];

	const isUserAuthorizedCreateNewPost = () =>
		(profile?.authorities || []).some((v) => newPostAuthorities.includes(v));

	const categoryList = fetchGuideBookCategories();

	const searchInput = useRef(null);

	const handleSearch = (selectedKeys, dataIndex) => {
		if (dataIndex === "details.title") {
			const keywords = selectedKeys?.[0];
			fetchData(
				getParams(tableParams?.pagination, {
					[`details.title`]: keywords,
				})
			);
		}
	};

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, close, confirm }) => (
			<div
				style={{
					padding: 8,
				}}
				// onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={t("search_msg")}
					allowClear
					value={selectedKeys[0]}
					onChange={(e) => {
						const newSelectedKeys = e.target.value ? [e.target.value] : [];
						setSelectedKeys(newSelectedKeys);
						handleSearch(newSelectedKeys, dataIndex);
						confirm({
							closeDropdown: false,
						});
					}}
					onPressEnter={() => {
						if (selectedKeys[0] !== tableParams?.filters?.[`details.title`]) {
							handleSearch(selectedKeys, dataIndex);
							confirm();
						} else close();
					}}
					style={{
						padding: ".5rem",
						marginBottom: 8,
						// display: "block",
					}}
				/>
				<Flex
					justify="flex-end"
					gap={20}
					style={{
						width: "20rem",
					}}
				>
					<Button
						className="custom-center"
						type="primary"
						onClick={() => {
							handleSearch(selectedKeys, dataIndex);
							confirm();
						}}
						icon={<SearchOutlined />}
						size="middle"
					>
						Search
					</Button>
					<Button
						className="custom-center"
						type="secondary"
						size="middle"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Flex>
			</div>
		),
		// filteredValue: tableParams?.filters?.[`details.title`] || "",
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					margin: ".4rem",
					color: filtered ? "#1677ff" : undefined,
				}}
			/>
		),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
	});

	const columns = [
		{
			title: (
				<Flex gap={20}>
					{t("form_title_msg", { ns: "Form" })}

					{tableParams?.filters?.[`details.title`]?.[0] && (
						<Tag
							className="custom-center"
							bordered={false}
							closable
							color="processing"
							onClose={() => {
								const { pagination, filters, sorter } = tableParams;
								filters[`details.title`] = "";
								fetchData(getParams(pagination, filters, sorter));
							}}
						>
							<span
								className="pr-2"
								style={{
									fontSize: ".8rem",
								}}
							>
								{tableParams?.filters?.[`details.title`] || ""}
							</span>
						</Tag>
					)}
				</Flex>
			),
			dataIndex: ["details", "title"] || "",
			sorter: true,
			render: (title, record) => {
				return <Link to={`${GUIDE_BOOK_PATH}/${record?.id}`}>{title}</Link>;
			},
			fixed: "left",
			ellipsis: true,
			...getColumnSearchProps(
				"details.title",
				t("form_title_msg", { ns: "Form" })
			),
		},
		{
			title: t("form_category_msg", { ns: "Form" }),
			dataIndex: ["details", "category"] || "",
			render: (category) => {
				const { title, color } = categoryList.filter(
					(v) => v.key === category
				)?.[0];

				return (
					<span
						style={{
							color: color || "black",
						}}
					>
						{formatString(title, "sentencecase")}
					</span>
				);
			},
			width: "18%",
			filters: categoryList.map((v) => {
				return {
					...v,
					text: v?.title,
					value: v?.key,
				};
			}),
			filterMultiple: false,
			sorter: true,
			ellipsis: true,
		},
		{
			title: t("form_status_msg", { ns: "Form" }),
			dataIndex: "status" || "",
			render: (status) => (
				<span
					className={`${
						status === "PUBLIC"
							? "text-success"
							: status === "REMOVED"
								? "text-danger"
								: status === "PRIVATE"
									? "text-warning"
									: "text-dark"
					}`}
				>
					{formatString(
						t(`${status?.toLowerCase()}_msg`) || status || "",
						"sentencecase"
					)}
				</span>
			),

			filters: [
				{
					text: t("public_msg"),
					value: "PUBLIC",
				},
				{
					text: t("private_msg"),
					value: "PRIVATE",
				},
			],
			width: "12%",
			ellipsis: true,
		},
		{
			title: t("updated_on_msg"),
			dataIndex: "updatedOn" || "",
			render: (date) => formatTime(date),
			width: "14%",
			sorter: true,
			defaultSortOrder: "descend",
			ellipsis: true,
		},
		{
			title: "Action",
			key: "operation",
			// fixed: "right",
			width: "12%",
			render: (_, record) => (
				<Flex gap={10}>
					<Button
						type="default"
						className="border-0"
						onClick={() =>
							navigate(
								`${GUIDE_BOOK_EDIT_POST_PATH}/${record?.id}?redirectUri=${MY_PROFILE_PATH.slice(1)}?menu=post`
							)
						}
					>
						<Tooltip title={t("edit_record_msg")}>
							<RiEdit2Line size={20} color="orange" />
						</Tooltip>
					</Button>
					<DeleteBtn
						btnProps={{
							type: "primary",
							size: "large",
							className: " custom-center bg-danger",
						}}
						iconProps={{
							color: "white",
						}}
						onConfirm={() =>
							deleteGuideBook(record?.id).then(() =>
								setData(data?.filter((v) => v.id !== record.id))
							)
						}
					/>
				</Flex>
			),
		},
	];

	const getParams = (pagination, filters, sorter) => {
		return {
			params: {
				limit: pagination?.pageSize,
				title: filters?.[`details.title`]?.[0] || "",
				page: pagination?.current,
				category: filters?.[`details.category`]?.[0] || "",
				status: filters?.status || [],
				sortBy:
					Array.isArray(sorter?.field) && sorter?.field?.length > 1
						? sorter?.field?.slice(-1)
						: sorter?.field || "",
				sortByOrder: sorter?.order || "",
			},
			filters,
		};
	};

	const fetchData = async ({ params = {}, filters }) => {
		setLoading(true);

		fetchGuideBooks({
			profileId: profile?.id,
			requesterId: profile?.id,
			...params,
		}).then(({ fetchResult = [], totalCount = 0 } = {}) => {
			setData(fetchResult || []);
			setLoading(false);
			setTableParams({
				...tableParams,
				totalCount: totalCount,
				pagination: {
					...tableParams.pagination,
					total: totalCount,
				},
				filters,
			});
		});
	};

	useEffect(() => {
		const { pagination, filters, sorter } = tableParams;
		fetchData(getParams(pagination, filters, sorter));
	}, []);

	const handleTableChange = (pagination, filters, sorter) => {
		fetchData(getParams(pagination, filters, sorter));
	};
	return (
		<>
			<Table
				className="mh-30"
				columns={columns}
				title={() => {
					return (
						<Flex justify="space-between">
							<Title level={2}>{t("post_msg_other")}</Title>
							{isUserAuthorizedCreateNewPost() && (
								<>
									<Button
										type="primary"
										className="border-0"
										size="large"
										onClick={() => {
											navigate(
												`${GUIDE_BOOK_NEW_POST_PATH}?${REDIRECT_URI}=${MY_PROFILE_PATH.slice(1)}?menu=post`
											);
										}}
									>
										{t("new_post_msg")}
									</Button>
								</>
							)}
						</Flex>
					);
				}}
				locale={{
					triggerAsc: t("trigger_asc_msg"),
					triggerDesc: t("trigger_desc_msg"),
					cancelSort: t("cancel_sort_msg"),
					filterReset: t("form_reset_msg", { ns: "Form" }),
				}}
				rowKey={(record) => record.id}
				dataSource={data}
				pagination={tableParams.pagination}
				loading={loading}
				onChange={handleTableChange}
			/>
		</>
	);
};
export default GBPostTable;
