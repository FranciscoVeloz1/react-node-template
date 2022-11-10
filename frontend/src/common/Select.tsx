import { ChangeEventHandler } from 'react'

interface props {
  id: string
  name: string
  text: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  value: string
  option: string
  data: object[]
}

const Select = ({ id, name, text, onChange, value, option, data }: props) => {
  return (
    <>
      <label className='txt-secondary ms-1 mb-1' htmlFor={id}>
        {text}
      </label>

      <select className='form-control' name={name} id={id} onChange={onChange} required>
        <option value={value}>{option}</option>
        {data !== undefined && data !== null && data.length > 0
          ? data.map((d) => {
              const obj = Object.values(d)

              return (
                <option key={obj[0]} value={obj[0]}>
                  {obj[1]}
                </option>
              )
            })
          : null}
      </select>
    </>
  )
}

export default Select
