import { BigFillIcon, Modal } from "cosmian_ui"
import { useEffect, useState } from "react"

type DeleteModalProps = {
  visible: boolean
  onCancel: () => void
  onDelete: () => void
}

export const DeleteAnonymizationModal: React.FC<DeleteModalProps> = ({
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
      okText={"Delete Anonymization"}
      onCancel={() => onCancel()}
      okButtonType={"danger"}
      centerBody={true}
      centerFooter={true}
    >
      <>
        <div className="header">
          <h1 className="h4">Anonymization deletion</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to delete this Anonymization?</p>
        </div>
      </>
    </Modal>
  )
}
