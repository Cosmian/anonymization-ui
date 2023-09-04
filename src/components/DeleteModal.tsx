import { BigFillIcon, Modal } from "cosmian_ui"
import { useEffect, useState } from "react"

type DeleteModalProps = {
  visible: boolean
  type: "configuration" | "anonymization"
  onCancel: () => void
  onDelete: () => void
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ visible, type, onCancel, onDelete }) => {
  const [open, setOpen] = useState(visible)

  useEffect(() => {
    setOpen(visible)
  }, [visible])

  return (
    <Modal
      open={open}
      icon={<BigFillIcon type="trash" />}
      onOk={() => onDelete()}
      okText={type === "configuration" ? "Delete Configuration" : "Delete Anonymization"}
      onCancel={() => onCancel()}
      okButtonType={"danger"}
      centerBody={true}
      centerFooter={true}
    >
      <>
        <div className="header">
          {type === "configuration" ? <p className="h4">Configuration deletion</p> : <p className="h4">Anonymization deletion</p>}
        </div>
        <div className="body">
          {type === "configuration" ? (
            <p>Are you sure you want to delete this Configuration?</p>
          ) : (
            <p>Are you sure you want to delete this Anonymization?</p>
          )}
        </div>
      </>
    </Modal>
  )
}
