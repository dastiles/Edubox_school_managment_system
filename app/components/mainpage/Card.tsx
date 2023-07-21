/* eslint-disable @next/next/no-img-element */

interface CardProps {
    title: string
    value: string
    src: string
}

const Card: React.FC<CardProps> = ({
    title,
    value,
    src
}) => {
    return (
        <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
                <div className="card-body">
                    <div className="db-widgets d-flex justify-content-between align-items-center">
                        <div className="db-info">
                            <h6>{title}</h6>
                            <h3>{value}</h3>
                        </div>
                        <div className="db-icon">
                            <img src={src} alt="Dashboard Icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card