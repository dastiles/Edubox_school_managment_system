'use client'

import { FieldErrors, UseFormRegister, FieldValues } from 'react-hook-form'
interface InputsProps {
    label: string
    type?: string
    disabled?: boolean
    id: string
    errors: FieldErrors,
    register: UseFormRegister<FieldValues>
    required?: boolean

}

const Inputs: React.FC<InputsProps> = ({
    label,
    type = 'email',
    disabled,
    id,
    register,
    required,
    errors
}) => {
    return (
        <div className="col-12 col-sm-4">
            <div className="form-group local-forms">
                <label>
                    {label} <span className="login-danger">*</span>
                </label>
                <input
                    className="form-control"
                    type="text"

                    id={id} disabled={disabled}  {...register(id, { required })}
                />
            </div>
        </div>
    )
}

export default Inputs