import React from "react";

interface DangerModalProps {
  title: string;
  info: string;
  btn_text: string;
  onClick: () => void;
}

const DangerModal: React.FC<DangerModalProps> = ({
  title,
  info,
  btn_text,
  onClick,
}) => {
  return (
    <div
      id="danger-alert-modal"
      className="modal fade"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm">
        <div className="modal-content modal-filled bg-danger">
          <div className="modal-body p-4">
            <div className="text-center">
              <i className="dripicons-wrong h1 text-white" />
              <h4 className="mt-2 text-white">{title}</h4>
              <p className="mt-3 text-white">{info}</p>
              <button
                type="button"
                className="btn btn-light my-2"
                data-bs-dismiss="modal"
                onClick={onClick}
              >
                {btn_text}
              </button>
            </div>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  );
};

export default DangerModal;
