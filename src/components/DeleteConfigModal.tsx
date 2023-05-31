import { BigFillIcon, Modal } from "cosmian_ui"
import { useEffect, useState } from "react"

type DeleteConfigModalProps = {
  visible: boolean
  onCancel: () => void
  onDelete: () => void
}

export const DeleteConfigModal: React.FC<DeleteConfigModalProps> = ({
  visible,
  onCancel,
  onDelete,
}) => {
  const [open, setOpen] = useState(visible)

  useEffect(() => {
    setOpen(visible)
  }, [visible])

  return (
    <Modal
      open={open}
      icon={<BigFillIcon type="trash" />}
      onOk={() => onDelete()}
      okText={"Delete Configuration"}
      onCancel={() => onCancel()}
      okButtonType={"danger"}
      centerBody={true}
      centerFooter={true}
    >
      <>
        <div className="header">
          <h1 className="h4">Configuration deletion</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to delete this Configuration?</p>
        </div>
      </>
    </Modal>
  )
}
