import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='mt-5 container'>
      <div className='d-flex justify-content-center'>
        <Spinner animation='border' variant='primary' />
      </div>
    </div>
  )
}

export default Loading
