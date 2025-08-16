type RegistrationHeadingProps = {
  label: string
  subtitle?: string
}

const RegistrationHeading: React.FC<RegistrationHeadingProps> = ({ label, subtitle }) => {
  return (
    <div className="space-y-2 mb-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-tansa-blue border-b-3 pb-1">
        {label}
      </h3>
      {subtitle && <p className="text-sm text-gray-600 italic">{subtitle}</p>}
    </div>
  )
}

export default RegistrationHeading
