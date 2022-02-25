import { Modal, ModalFuncProps, Typography } from "antd"
import React from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import TrashIcon from "../../assets/delete-modal-icon-optim.svg"
import { BigIcon } from "../icons/BigIcons"
import "./deleteButton.css"

const { confirm } = Modal

export interface DeleteButtonProps {
  /**
   * What is the object to delete
   */
  itemType: ItemType
  /**
   * Name of the object to delete
   */
  itemName: string
  /**
   * Allow user to force the deletion if normal deletion doesn't work?
   */
  forcable?: boolean
  /**
   * Optional click handler on 'Cancel' button
   */
  onCancel?: () => void
  /**
   * Click handler on 'Delete' button
   */
  onDelete: (force: boolean) => Promise<void>
}

export enum ItemType {
  Computation = "computation",
  Party = "participant",
  Datasource = "datasource",
  User = "user",
  Anonymization = "anonymization",
}

// Because ant didn't created this type I create it myself
interface ModalType {
  destroy: () => void
  update: (configUpdate: ModalFuncProps) => void | ((prevConfig: ModalFuncProps) => ModalFuncProps)
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onCancel, onDelete, itemType, itemName, forcable }) => {
  let displayForce = false

  const handleDelete = async (modal: ModalType, close: () => void): Promise<void> => {
    if (forcable) {
      if (displayForce) {
        await onDelete(true)
        close()
      } else {
        modal.update({
          okButtonProps: {
            disabled: true,
            danger: true,
            size: "large",
          },
        })
        try {
          await onDelete(false)
          close()
        } catch {
          modal.update({
            content: (
              <>
                <img src={TrashIcon} alt="trash" />
                <p className="modal-title">Delete {itemName}?</p>
                <p className="modal-text">Can't delete this {itemType}, do you want to force the deletion?</p>
              </>
            ),
            okText: "Force delete",
            okButtonProps: {
              disabled: true,
              danger: true,
              size: "large",
            },
          })
          displayForce = true
        } finally {
          modal.update({
            okButtonProps: {
              disabled: false,
              danger: true,
              size: "large",
            },
          })
        }
      }
    } else {
      await onDelete(false)
      close()
    }
  }

  const showDeleteConfirm = (): void => {
    const modal = confirm({
      centered: true,
      icon: "",
      closable: true,
      autoFocusButton: null,
      content: (
        <>
          <BigIcon type="trash" />
          <p className="modal-title">Delete {itemName}?</p>
          <p className="modal-text">
            If you delete this {itemType}, it will be gone forever. There is no chance to bring it back after this action.
          </p>
        </>
      ),
      okText: `Delete ${itemType}`,
      okType: "primary",
      className: "delete-modal",
      okButtonProps: {
        danger: true,
        size: "large",
      },
      cancelText: "Cancel",
      cancelButtonProps: {
        size: "large",
      },
      onOk(close) {
        handleDelete(modal, close)
      },
      onCancel() {
        displayForce = false
        if (onCancel) {
          onCancel()
        }
      },
    })
  }
  return (
    <div onClick={showDeleteConfirm} className="delete-custom-btn">
      <Typography.Text type="danger" className="trash-icon">
        <FaRegTrashAlt />
      </Typography.Text>
      <Typography.Text type="danger" className="delete-text">
        Delete
      </Typography.Text>
    </div>
  )
}
