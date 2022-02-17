import { Button, Dropdown, Menu, Skeleton, Space, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import React, { FC, useEffect } from "react"
import { FaArrowRight } from "react-icons/fa"
import { connect, ConnectedProps } from "react-redux"
import { useNavigate } from "react-router-dom"
import { prettyDate } from "../../../actions/PrettyDates/PrettyDate"
import { link_config } from "../../../configs/paths"
import { deleteAnonymization, duplicateAnonymization, getAnonymizations } from "../../../redux/actions/ciphercompute/anonymization"
import { Anonymization, InputDataset } from "../../../redux/reducers/ciphercompute/anonymization/types"
import { RootState } from "../../../redux/reducers/RootReducer"
import { DeleteButton, ItemType } from "../../../stories/cosmian/deleteButton/DeleteButton"
import OptionButton from "../../../stories/cosmian/OptionButton/OptionButton"
import PageTitle from "../../../stories/cosmian/PageTitle/PageTitle"
import TopButton from "../../../stories/cosmian/TopButton/TopButton"
import { Content } from "../layout/LayoutItems"

const mapDispatchToProps = {
  getAnonymizations,
  deleteAnonymization,
  duplicateAnonymization,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: RootState) => {
  return {
    anonymizationsList: state.ciphercompute.anonymizations.anonymizations,
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type AnonymizationsListProps = ConnectedProps<typeof connector>

const AnonymizationsList: FC<AnonymizationsListProps> = ({
  getAnonymizations,
  deleteAnonymization,
  duplicateAnonymization,
  anonymizationsList,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    getAnonymizations()
  }, [])

  const gotToCreate = (): void => {
    navigate(`${link_config.newAnonymization}`)
  }
  const goToEdit = (uuid: string): void => {
    navigate(`${link_config.anonymizations}/${uuid}/edit`)
  }
  const goToImport = (): void => {
    navigate(`${link_config.importAnonymization}`)
  }

  const handleOnDelete = async (anonymization_uuid: string): Promise<void> => {
    return deleteAnonymization(anonymization_uuid)
  }

  const handleOnDuplicate = (anonymization_uuid: string): void => {
    duplicateAnonymization(anonymization_uuid)
  }
  const handleOnUpdate = (anonymization_uuid: string): void => {
    navigate(`${link_config.anonymizations}/${anonymization_uuid}/update`)
  }

  const columns: ColumnsType<Anonymization> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span className="h4">{name}</span>,
    },
    {
      title: "Creation date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => <span>{prettyDate(created_at)}</span>,
    },
    {
      title: "Schema file",
      dataIndex: "input_dataset",
      key: "input_dataset",
      render: (input_dataset: InputDataset) => <span>{input_dataset.file_info.name}</span>,
    },
    {
      title: "",
      dataIndex: "",
      key: "options",
      width: 50,
      fixed: "right",
      render: (anonymization: Anonymization) => {
        const menu = (
          <Menu>
            <Menu.Item key="update" onClick={() => handleOnUpdate(anonymization.uuid)}>
              Update anonymization
            </Menu.Item>
            <Menu.Item key="duplicate" onClick={() => handleOnDuplicate(anonymization.uuid)}>
              Duplicate anonymization
            </Menu.Item>
            <Menu.Item key="delete" className="danger-status">
              <DeleteButton
                forcable={false}
                itemType={ItemType.Anonymization}
                itemName={anonymization.name}
                onDelete={() => handleOnDelete(anonymization.uuid)}
              />
            </Menu.Item>
          </Menu>
        )
        return (
          <Dropdown overlay={menu} placement="bottomRight" arrow trigger={["hover"]}>
            <span>
              <OptionButton testid={"anonymization.uuid"} />
            </span>
          </Dropdown>
        )
      },
    },
    {
      title: "",
      key: "actions",
      fixed: "right",
      width: 200,
      dataIndex: "",
      render: (anonymization: Anonymization) => {
        return (
          <Button type="primary" onClick={() => goToEdit(anonymization.uuid)} style={{ marginLeft: "auto" }}>
            Edit treatment
            <FaArrowRight style={{ marginLeft: ".5em" }} />
          </Button>
        )
      },
    },
  ]

  if (anonymizationsList == null) {
    return <Skeleton className="skeleton-margin" />
  }

  return (
    <>
      <PageTitle
        title="Anonymization"
        subtitle={`Secure your datasets with anonymization.`}
        option={
          <Space>
            <Button size="large" onClick={() => goToImport()}>
              Import configuration file
            </Button>
            <TopButton onClick={() => gotToCreate()}>Create new anonymization</TopButton>
          </Space>
        }
      ></PageTitle>
      <Content>
        <Table columns={columns} dataSource={anonymizationsList} scroll={{ x: 900 }} rowKey="uuid" style={{ tableLayout: "auto" }} />
      </Content>
    </>
  )
}

export default connector(AnonymizationsList)
