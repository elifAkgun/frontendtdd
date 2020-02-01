import React from 'react';

const ButtonWithProgress = (props) => {
    return (
        <button className="btn btn-primary"
            onClick={props.onClick}
            disabled={props.disabled}>
            {props.pendingApiCall && (
                <div className="spinner-border">
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            {props.text}
        </button>
    )
}


ButtonWithProgress.defaultProps = {
    onClick: () => { }
};

export default ButtonWithProgress;