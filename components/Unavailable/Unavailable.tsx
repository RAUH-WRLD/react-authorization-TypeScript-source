import React from "react";
export default class Unavailable extends React.Component {
    render() {
        return (
            <main className="unavailable">
                <div className="unavailable__item">
                    <p className="unavailable__item_inner">React Authorization is unavailable because the application was opened via the desktop version. Open the app via your smartphone.</p>
                </div>
            </main>
        );
    }
}
