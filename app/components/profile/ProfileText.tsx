'use client'

interface ProfileTextProps {
    name: string
    value: String
}

const ProfileText: React.FC<ProfileTextProps> = ({
    name,
    value
}) => {
    return (
        <div className="row">
            <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                {name}
            </p>
            <p className="col-sm-9">{value}</p>
        </div>
    )
}

export default ProfileText