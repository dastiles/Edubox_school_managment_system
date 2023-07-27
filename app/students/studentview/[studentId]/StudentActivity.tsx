import React from 'react'

interface StudentActivityProps {
    title?: string
    heading: string
}
const StudentActivity: React.FC<StudentActivityProps> = ({
    title,
    heading
}) => {
    return (
        <div className="personal-activity">
            <div className="personal-icons">
                <i className="feather-user">
                    {/* react icon  to be put here */}
                </i>
            </div>
            <div className="views-personal">
                <h4>{heading}</h4>
                <h5>{title}</h5>
            </div>
        </div>
    )
}

export default StudentActivity