import React from "react";
import {Link} from "react-router-dom";
interface Props {
    data: any;
    accounts: any;
    functions: Array<any>;
}
export default class Login extends React.Component<Props> {
    private usernameRef: React.RefObject<HTMLInputElement>;
    private passwordRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }
    state = {
        isDisabled: true,
        isLogged: false,
        numberOfCheckedAccounts: 0,
    };
    processForm = (disable: boolean) => {
        const username = this.usernameRef.current;
        const password = this.passwordRef.current;
        if (username && password) {
            if (username.value.length >= 3 && password.value.length >= 3) this.setState({isDisabled: !disable});
            else this.setState({isDisabled: disable});
        } else return false;
    };
    loginAccount = (username: string, password: string) => {
        this.props.accounts.forEach((account: {username: string; password: string}, index: number) => {
            if (username === account.username && password === account.password) {
                this.props.functions[0](false);
                this.props.functions[1](true);
                return this.setState({isLogged: true});
            } else {
                if (!this.state.isLogged) this.setState({numberOfCheckedAccounts: (index += 1)});
                else {
                    this.setState({isLogged: false});
                    this.setState({numberOfCheckedAccounts: 0});
                }
            }
        });
        setTimeout(() => this.checkAccount(), 0);
    };
    checkAccount = () => {
        if (!this.state.isLogged && this.state.numberOfCheckedAccounts === this.props.accounts.length) {
            this.props.functions[0](true);
            this.props.functions[1](false);
        } else return false;
    };
    render() {
        return (
            <React.Fragment>
                {this.props.data.login && this.props.data.main && this.props.data.icons ? (
                    <main
                        className="login"
                        style={{
                            backgroundImage: "url(" + `${this.props.data.main.background}` + ")",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="login__top">
                            <div className="login__logo login__top_item not-selectable">
                                <img src={this.props.data.main.logo} alt="" className="login__logo_inner not-selectable" />
                            </div>
                            <div className="login__form login__top_item">
                                <form
                                    action=""
                                    className="login__form_inner"
                                    onChange={() => this.processForm(true)}
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        return this.usernameRef.current?.value && this.passwordRef.current?.value ? this.loginAccount(`${this.usernameRef.current.value}`, `${this.passwordRef.current.value}`) : false;
                                    }}
                                >
                                    <div className="login__form_item not-selectable">
                                        <img src={this.props.data.icons.username} alt="" className="login__form_icon not-selectable" />
                                        <input type={this.props.data.main.username} className="login__form_input" placeholder={this.props.data.main.username} ref={this.usernameRef} />
                                    </div>
                                    <div className="login__form_item not-selectable">
                                        <img src={this.props.data.icons.password} alt="" className="login__form_icon not-selectable" />
                                        <input type={this.props.data.main.password} className="login__form_input" placeholder={this.props.data.main.password} ref={this.passwordRef} />
                                    </div>
                                    <button className="login__form_button" disabled={this.state.isDisabled}>
                                        {this.props.data.login.login}
                                    </button>
                                    <Link to={this.props.data.login.reset_href} className="login__reset_inner">
                                        {this.props.data.login.reset}
                                    </Link>
                                </form>
                            </div>
                        </div>
                        <div className="login__bottom">
                            <p className="login__bottom_item">
                                <span className="login__bottom_inner">{this.props.data.login.registration_title} </span>
                                <Link to={this.props.data.login.registration_href} className="login__bottom_inner">
                                    {this.props.data.login.registration}
                                </Link>
                            </p>
                        </div>
                    </main>
                ) : null}
            </React.Fragment>
        );
    }
}
