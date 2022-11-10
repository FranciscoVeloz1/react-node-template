import { ChangeEventHandler } from 'react'

interface Props {
  type?: string
  className?: string
  id?: string
  value?: string
  name: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  labelStyle?: string
}

const Input = ({ type, className, id, value, name, onChange, placeholder, labelStyle }: Props) => {
  return (
    <div className='form-floating'>
      <input
        type={type}
        className={`form-control ${className}`}
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      
      <label htmlFor={id} className={labelStyle}>
        {placeholder}
      </label>
    </div>
  )
}

export default Input
