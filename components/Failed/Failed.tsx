import React from "react";
import {Link} from "react-router-dom";
interface Props {
    data: any;
    accounts: any;
    functions: Array<any>;
    isReg: boolean;
    isRes: boolean;
}
export default class Failed extends React.Component<Props> {
    state = {
        reason: [],
    };
    componentDidMount() {
        if (this.props.isReg) this.setState({reason: this.props.data.failed.reg_fail.split(" ")});
        if (this.props.isRes) this.setState({reason: this.props.data.failed.res_fail.split(" ")});
        if (!this.props.isReg && !this.props.isRes) this.setState({reason: this.props.data.failed.fail.split(" ")});
    }
    render() {
        return (
            <React.Fragment>
                {this.props.data.failed && this.props.data.main ? (
                    <main
                        className="failed"
                        style={{
                            backgroundImage: "url(" + `${this.props.data.main.background}` + ")",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="failed__top">
                            <div className="failed__logo failed__top_item not-selectable">
                                <img src={this.props.data.main.logo} alt="" className="failed__logo_inner not-selectable" />
                            </div>
                            <div className="failed__info failed__top_item">
                                <p className="failed__reason">
                                    <span className="failed__reason_inner">{this.state.reason.shift()} </span>
                                    <span className="failed__reason_inner">{this.state.reason.join(" ")}</span>
                                </p>
                                <Link
                                    to={this.props.data.failed.return_back_href}
                                    className="failed__button"
                                    onClick={() => {
                                        if (this.props.isReg) {
                                            this.props.functions[0](false);
                                            this.props.functions[2](false);
                                        } else this.props.functions[0](false);
                                    }}
                                >
                                    {this.props.data.failed.return_back}
                                </Link>
                                {!this.props.isReg ? (
                                    <Link
                                        to={this.props.data.failed.reset_href}
                                        className="failed__reset"
                                        onClick={() => {
                                            if (this.props.isReg) {
                                                this.props.functions[0](false);
                                                this.props.functions[2](false);
                                            } else this.props.functions[0](false);
                                        }}
                                    >
                                        {this.props.data.failed.reset}
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                        <div className="failed__bottom">
                            <p className="failed__bottom_item">
                                {!this.props.isReg ? (
                                    <React.Fragment>
                                        <span className="failed__bottom_inner">{this.props.data.failed.registration_title} </span>
                                        <Link to={this.props.data.failed.registration_href} className="failed__bottom_inner" onClick={() => this.props.functions[0](false)}>
                                            {this.props.data.failed.registration}
                                        </Link>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <span className="failed__bottom_inner">{this.props.data.failed.bottom_title} </span>
                                        <a href={this.props.data.failed.bottom_href} className="failed__bottom_inner" target={"_blank"}>
                                            {this.props.data.failed.bottom}
                                        </a>
                                    </React.Fragment>
                                )}
                            </p>
                        </div>
                    </main>
                ) : null}
            </React.Fragment>
        );
    }
}
