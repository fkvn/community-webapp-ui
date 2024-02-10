import { SearchOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line, RiEdit2Line } from "@remixicon/react";
import { Button, Flex, Input, Popconfirm, Table, Tag, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteGuideBookAxios } from "../../../../Axios/guideBookAxios";
import { GUIDE_BOOK_PATH, USER_REDUCER } from "../../../../Util/ConstVar";
import { formatString, formatTime } from "../../../../Util/Util";
import useGuideBookPost from "../../../Hook/PostHook/useGuideBookPost";

const GBPostTable = () => {
	const { profile } = useSelector((state) => state[`${USER_REDUCER}`]);

	const { fetchGuideBooks } = useGuideBookPost();
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

	const searchInput = useRef(null);

	const handleSearch = (selectedKeys, dataIndex) => {
		if (dataIndex === "details.title") {
			const keywords = selectedKeys?.[0];
			fetchData(
				getParams(
					tableParams?.pagination,
					{
						[`details.title`]: keywords,
					},
					{ ...tableParams?.sorter, field: "title", order: "descend" }
				)
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
					{formatString(status, "sentencecase")}
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
			width: "20%",
		},
		{
			title: t("updated_on_msg"),
			dataIndex: "updatedOn" || "",
			render: (date) => formatTime(date),
			width: "20%",
			sorter: true,
			defaultSortOrder: "descend",
		},
		{
			title: "Action",
			key: "operation",
			// fixed: "right",
			width: "12%",
			render: (_, record) => (
				<Flex gap={10}>
					<Popconfirm
						title={t("delete_record_msg")}
						description={
							<Typography.Text>
								<Trans
									i18nKey={"delete_record_confirm_msg"}
									ns="Default"
									components={{
										danger: <div className="text-danger"></div>,
									}}
								/>
							</Typography.Text>
						}
						// onConfirm={confirm}
						// onCancel={cancel}
						okText={t("yes_msg")}
						cancelText={t("no_msg")}
					>
						<Button type="default" className="border-0 ">
							<RiEdit2Line size={20} color="orange" />
						</Button>
					</Popconfirm>
					<Popconfirm
						title={t("delete_record_msg")}
						description={
							<Typography.Text>
								<Trans
									i18nKey={"delete_record_confirm_msg"}
									ns="Default"
									components={{
										danger: <div className="text-danger"></div>,
									}}
								/>
							</Typography.Text>
						}
						onConfirm={() => deleteGuideBookAxios(record?.id)}
						okButtonProps={{
							className: "custom-center m-2 flex-end",
							style: {
								padding: ".8rem",
							},
						}}
						showCancel={false}
						okText={t("yes_msg")}
					>
						<Button type="default" className="border-0 ">
							<RiDeleteBin6Line size={20} color="red" />
						</Button>
					</Popconfirm>
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
		<Table
			className="mh-30"
			columns={columns}
			rowKey={(record) => record.id}
			dataSource={data}
			pagination={tableParams.pagination}
			loading={loading}
			onChange={handleTableChange}
		/>
	);
};
export default GBPostTable;
