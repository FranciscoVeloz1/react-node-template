import { Modal } from 'react-bootstrap'

interface props {
  show: boolean
  setShow: Function
  title: string
  children: JSX.Element
}

const ModalComponent = ({ show, setShow, title, children }: props) => {
  return (
    <Modal centered show={show} onHide={() => setShow(false)} className='ani-growInOut'>
      <Modal.Header closeButton>
        <Modal.Title className='title'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='py-4'>{children}</Modal.Body>
    </Modal>
  )
}

export default ModalComponent
