import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'

interface Props {
  setFilter: Function
  filters: filtros
  hide: string[]
}

interface filtros {
  headers: string[]
  objectKeys: string[]
}

const Filter = ({ setFilter, filters, hide }: Props) => {
  let { headers, objectKeys } = filters
  objectKeys = objectKeys.filter(function (val: any) {
    return hide.indexOf(val) == -1
  })

  let data = headers === undefined ? objectKeys : headers

  return (
    <Dropdown drop='start'>
      <Dropdown.Toggle variant='outline-light' className='txt-primary py-auto px-0 ms-2' id='dropdown-basic'>
        <FontAwesomeIcon icon={faSlidersH} />
      </Dropdown.Toggle>

      <Dropdown.Menu className='dropdown-fadeIn'>
        <ul className='m-0 px-3'>
          {data !== undefined && data.length > 0
            ? objectKeys.map((o: any, index: any) => (
                <li className='py-1' key={o}>
                  <input type='radio' name='c' id={o} className='me-2' onChange={() => setFilter(o)} />
                  <label htmlFor={o}>{data[index]}</label>
                </li>
              ))
            : null}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Filter
