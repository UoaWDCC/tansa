import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import Required from './Required'

type RegistrationTextInputProps = {
  label: string
  value: string
  subtitle?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  required?: boolean
  type?: string
}

const RegistrationTextInput: React.FC<RegistrationTextInputProps> = ({
  label,
  value,
  subtitle,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={label}>
        {label}
        {required && <Required />}
      </Label>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      <Input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default RegistrationTextInput
