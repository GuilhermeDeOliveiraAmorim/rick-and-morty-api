import React from "react";

interface IAlert {
    msg: string;
    status: string;
}

function Alert(props: IAlert) {

    const { msg, status } = props;

    return (
        <div className="bg-red p-4" >
            {msg}
        </div>
    )
}

export { Alert };