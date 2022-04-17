import React from "react";
import {Link} from "react-router-dom";
interface Props {
    data: any;
    accounts: any;
    functions: Array<any>;
    path: string;
    setItemsFunction: (path: string, item: any) => void;
}
export default class Registration extends React.Component<Props> {
    private usernameRef: React.RefObject<HTMLInputElement>;
    private passwordRef: React.RefObject<HTMLInputElement>;
    private emailRef: React.RefObject<HTMLInputElement>;
    private confirmRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.emailRef = React.createRef();
        this.confirmRef = React.createRef();
    }
    state = {
        isDisabled: true,
        isDisabledForce: false,
        areSame: false,
        canGoBack: true,
    };
    processForm = (disable: boolean) => {
        const username = this.usernameRef.current;
        const password = this.passwordRef.current;
        const email = this.emailRef.current;
        const confirm = this.confirmRef.current;
        if (username && password && email && confirm) {
            if (username.value.length >= 3 && username.value.length <= 20 && password.value.length >= 3 && password.value.length <= 20 && email.value.length >= 3 && email.value.length <= 40 && confirm.value === password.value) {
                this.setState({isDisabled: !disable});
                this.setState({areSame: false});
            } else this.setState({isDisabled: disable});
        } else return false;
    };
    registerAccount = (username: string, password: string, email: string) => {
        const register = (account: {email: string; password: string; username: string}) => {
            this.props.setItemsFunction(this.props.path, [...this.props.accounts, account]);
            return this.props.functions[2](true);
        };
        const newAccount = {
            email: email,
            password: password,
            username: username,
        };
        this.props.accounts.forEach((account: any) => {
            if (account.username === newAccount.username) {
                this.setState({areSame: true});
                setTimeout(() => this.props.functions[3](true), 1000);
            } else {
                setTimeout(() => {
                    if (!this.state.areSame) register(newAccount);
                    else return this.props.functions[3](true);
                }, 2000);
            }
        });
    };
    render() {
        return (
            <React.Fragment>
                {this.props.data.registration && this.props.data.main && this.props.data.icons ? (
                    <main
                        className="registration"
                        style={{
                            backgroundImage: "url(" + `${this.props.data.main.background}` + ")",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="registration__top">
                            <div className="registration__logo registration__top_item not-selectable">
                                <img src={this.props.data.main.logo} alt="" className="registration__logo_inner not-selectable" />
                            </div>
                            <div className="registration__form registration__top_item">
                                <form
                                    action=""
                                    className="registration__form_inner"
                                    onChange={() => this.processForm(true)}
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        this.setState({isDisabled: true});
                                        this.setState({isDisabledForce: true});
                                        this.setState({canGoBack: false});
                                        return this.usernameRef.current?.value && this.passwordRef.current?.value && this.emailRef.current?.value ? this.registerAccount(`${this.usernameRef.current.value}`, `${this.passwordRef.current.value}`, `${this.emailRef.current.value}`) : false;
                                    }}
                                >
                                    <div className="registration__form_item not-selectable">
                                        <img src={this.props.data.icons.username} alt="" className="registration__form_icon not-selectable" />
                                        <input type={this.props.data.main.username} className="registration__form_input" placeholder={this.props.data.main.username} ref={this.usernameRef} disabled={this.state.isDisabledForce} />
                                    </div>
                                    <div className="registration__form_item not-selectable">
                                        <img src={this.props.data.icons.username} alt="" className="registration__form_icon not-selectable" />
                                        <input type={this.props.data.main.email} className="registration__form_input" placeholder={this.props.data.main.email} ref={this.emailRef} disabled={this.state.isDisabledForce} />
                                    </div>
                                    <div className="registration__form_item not-selectable">
                                        <img src={this.props.data.icons.password} alt="" className="registration__form_icon not-selectable" />
                                        <input type={this.props.data.main.password} className="registration__form_input" placeholder={this.props.data.main.password} ref={this.passwordRef} disabled={this.state.isDisabledForce} />
                                    </div>
                                    <div className="registration__form_item not-selectable">
                                        <img src={this.props.data.icons.password} alt="" className="registration__form_icon not-selectable" />
                                        <input type={this.props.data.main.password} className="registration__form_input" placeholder={this.props.data.main.confirm} ref={this.confirmRef} disabled={this.state.isDisabledForce} />
                                    </div>
                                    <button className="registration__form_button" disabled={this.state.isDisabled}>
                                        {this.props.data.registration.registration}
                                    </button>
                                    {this.state.canGoBack ? (
                                        <Link to={this.props.data.registration.return_back_href} className="registration__return_inner">
                                            {this.props.data.registration.return_back}
                                        </Link>
                                    ) : null}
                                </form>
                            </div>
                        </div>
                        <div className="registration__bottom">
                            <p className="registration__bottom_item">
                                <span className="registration__bottom_inner">{this.props.data.registration.bottom_title} </span>
                                <a href={this.props.data.registration.bottom_href} className="registration__bottom_inner" target={"_blank"}>
                                    {this.props.data.registration.bottom}
                                </a>
                            </p>
                        </div>
                    </main>
                ) : null}
            </React.Fragment>
        );
    }
}
