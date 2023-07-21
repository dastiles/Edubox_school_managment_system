import Link from 'next/link'
import React from 'react'

const AccountSkills = () => {
    return (
        <div className="col-lg-3">
            {/* Account Status */}
            <div className="card">
                <div className="card-body profile-blog">
                    <h5 className="card-title d-flex justify-content-between">
                        <span>Account Status</span>
                        <Link className="edit-link" href="#">
                            <i className="far fa-edit me-1" /> Edit
                        </Link>
                    </h5>
                    <button className="btn btn-success" type="button">
                        {/* <i className="fe fe-check-verified" >
                                                                <FeatherIcon icon="check-verified" />
                                                                </i>  */}
                        Active
                    </button>
                </div>
            </div>
            {/* /Account Status */}
            {/* Skills */}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between">
                        <span>Skills </span>
                        <Link className="edit-link" href="#">
                            <i className="far fa-edit me-1" /> Edit
                        </Link>
                    </h5>
                    <div className="skill-tags">
                        <span>Html5</span>
                        <span>CSS3</span>
                        <span>WordPress</span>
                        <span>Javascript</span>
                        <span>Android</span>
                        <span>iOS</span>
                        <span>Angular</span>
                        <span>PHP</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSkills