import React from "react";
import {Link} from "react-router-dom";
interface Props {
    data: any;
    accounts: any;
    functions: Array<any>;
    isReg: boolean;
    isRes: boolean;
}
export default class Success extends React.Component<Props> {
    state = {
        reason: [],
    };
    componentDidMount() {
        if (this.props.isReg) this.setState({reason: this.props.data.success.reg_success.split(" ")});
        if (this.props.isRes) this.setState({reason: this.props.data.success.res_success.split(" ")});
        if (!this.props.isReg && !this.props.isRes) this.setState({reason: this.props.data.success.success.split(" ")});
    }
    render() {
        return (
            <React.Fragment>
                {this.props.data.success && this.props.data.main ? (
                    <main
                        className="success"
                        style={{
                            backgroundImage: "url(" + `${this.props.data.main.background}` + ")",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="success__top">
                            <div className="success__logo success__top_item not-selectable">
                                <img src={this.props.data.main.logo} alt="" className="success__logo_inner not-selectable" />
                            </div>
                            <div className="success__info success__top_item">
                                <p className="success__reason">
                                    <span className="success__reason_inner">{this.state.reason.shift()} </span>
                                    <span className="success__reason_inner">{this.state.reason.join(" ")}</span>
                                </p>
                                <Link
                                    to={this.props.data.success.return_back_href}
                                    className="success__button"
                                    onClick={() => {
                                        if (this.props.isReg) {
                                            this.props.functions[1](false);
                                            this.props.functions[2](false);
                                        } else this.props.functions[1](false);
                                    }}
                                >
                                    {this.props.data.success.return_back}
                                </Link>
                            </div>
                        </div>
                        <div className="success__bottom">
                            <p className="success__bottom_item">
                                <span className="success__bottom_inner">{this.props.data.success.bottom_title} </span>
                                <a href={this.props.data.success.bottom_href} className="success__bottom_inner" target={"_blank"}>
                                    {this.props.data.success.bottom}
                                </a>
                            </p>
                        </div>
                    </main>
                ) : null}
            </React.Fragment>
        );
    }
}
