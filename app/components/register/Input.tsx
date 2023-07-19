'use client'
import { FieldErrors, UseFormRegister, FieldValues } from 'react-hook-form'


interface InputProps {
    label: string
    icon_string: string
    type?: string
    disabled?: boolean
    id: string
    errors: FieldErrors,
    register: UseFormRegister<FieldValues>
    required?: boolean
}



const Input: React.FC<InputProps> = ({
    label,
    icon_string,
    type = 'text',
    register,
    errors,
    disabled,
    id,
    required
}) => {
    console.log(errors[id])
    return (
        <div className="form-group">
            <label>
                {label} <span className="login-danger">*</span>
            </label>
            <input type={type} className="form-control" id={id} disabled={disabled}  {...register(id, { required })} />
            <span className="profile-views">
                <i className={`fas ${icon_string}`} />
            </span>
        </div>
    )
}

export default Input