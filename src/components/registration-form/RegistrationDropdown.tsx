import React from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Required from './Required'

type RegistrationDropdownOption = {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

type RegistrationDropdownProps = {
  label: string
  value: string
  onValueChange: (value: string) => void
  options: RegistrationDropdownOption[]
  placeholder?: string
  required?: boolean
  id?: string
}

const RegistrationDropdown: React.FC<RegistrationDropdownProps> = ({
  label,
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  required = false,
  id = label.toLowerCase().replace(/\s+/g, ''),
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <Required />}
      </Label>
      <Select value={value} onValueChange={onValueChange} required={required}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.icon ? (
                <div className="flex items-center gap-2">
                  <option.icon className="h-4 w-4" />
                  {option.label}
                </div>
              ) : (
                option.label
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default RegistrationDropdown
