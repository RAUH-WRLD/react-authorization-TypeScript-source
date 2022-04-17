import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
interface Props {
    data: any;
    accounts: any;
    functions: Array<any>;
    path: string;
    setItemsFunction: (path: string, item: any) => void;
}
export default class Reset extends React.Component<Props> {
    private usernameRef: React.RefObject<HTMLInputElement>;
    private emailRef: React.RefObject<HTMLInputElement>;
    private codeRef: React.RefObject<HTMLInputElement>;
    private passwordRef: React.RefObject<HTMLInputElement>;
    private confirmRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.usernameRef = React.createRef();
        this.emailRef = React.createRef();
        this.codeRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirmRef = React.createRef();
    }
    state = {
        isDisabled: true,
        isDisabledForce: false,
        canGoBack: true,
        couldFind: false,
        requestedAccount: {
            username: "",
            email: "",
        },
        code: "",
        isSent: false,
        shouldChangePassword: false,
        numberOfFoundAccount: 0,
    };
    getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
    processForm = (disable: boolean) => {
        const username = this.usernameRef.current;
        const email = this.emailRef.current;
        if (username && email) {
            if (username.value.length >= 3 && email.value.length >= 3) this.setState({isDisabled: !disable});
            else this.setState({isDisabled: disable});
        } else return false;
    };
    processFormCode = (disable: boolean) => {
        const code = this.codeRef.current;
        if (code) {
            if (code.value.length === 6) this.setState({isDisabled: !disable});
            else this.setState({isDisabled: disable});
        } else return false;
    };
    processFormPassword = (disable: boolean) => {
        const password = this.passwordRef.current;
        const confirm = this.confirmRef.current;
        if (password && confirm) {
            if (password.value.length >= 3 && password.value.length <= 20 && confirm.value === password.value) this.setState({isDisabled: !disable});
            else this.setState({isDisabled: disable});
        } else return false;
    };
    checkAccount = (username: string, email: string) => {
        const requestedAccount = {
            email: email,
            username: username,
        };
        this.props.accounts.forEach((account: any, index: number) => {
            if (account.username === requestedAccount.username && account.email === requestedAccount.email) {
                this.setState({couldFind: true});
                this.setState({requestedAccount});
                this.setState({numberOfFoundAccount: index});
            } else {
                setTimeout(() => {
                    if (this.state.requestedAccount.username.length === 0) this.setState({couldFind: false});
                    else return false;
                }, 0);
            }
        });
    };
    sendVerifyCode = (account: {username: string; email: string}) => {
        const codeArr: Array<number> = [];
        for (let index = 0; index < 6; index++) {
            codeArr.push(this.getRandomNum(0, 9));
        }
        setTimeout(() => {
            const code = codeArr.join("");
            const text = this.props.data.reset.email_text.replace(/{username}/g, `${account.username}`).replace(/{code}/g, `${code}`);
            const data = {
                name: account.username,
                email: account.email,
                text: text,
                subject: this.props.data.reset.email_subject,
            };
            this.setState({code});
            this.setState({canGoBack: true});
            this.setState({isDisabledForce: false});
            this.setState({isSent: true});
            axios.post("/api/sendMail", data);
            return this.codeRef.current ? (this.codeRef.current.value = "") : false;
        }, 0);
    };
    resetPassword = () => this.sendVerifyCode(this.state.requestedAccount);
    checkAccountFindStatus = () => {
        if (this.state.couldFind) {
            this.resetPassword();
        } else {
            if (!this.state.couldFind) setTimeout(() => this.props.functions[0](true), 0);
            else return false;
        }
    };
    checkCode = (code: string) => {
        if (code == this.state.code) {
            this.setState({shouldChangePassword: true});
            this.setState({isDisabled: true});
        } else {
            alert(this.props.data.reset.invalidCode);
            this.setState({isDisabled: false});
        }
        this.setState({canGoBack: true});
        this.setState({isDisabledForce: false});
    };
    changePassword = (new_password: string) => {
        const account = Object.assign({email: "", password: "", username: ""}, this.state.requestedAccount);
        account.password = new_password;
        const new_data = [...this.props.accounts];
        new_data[this.state.numberOfFoundAccount] = account;
        this.props.setItemsFunction(this.props.path, new_data);
        setTimeout(() => this.props.functions[1](true), 1000);
    };
    componentDidUpdate() {
        if (!this.state.canGoBack && !this.state.isSent) this.checkAccountFindStatus();
        else return false;
    }
    render() {
        return (
            <React.Fragment>
                {this.props.data.reset && this.props.data.main && this.props.data.icons ? (
                    <main
                        className="reset"
                        style={{
                            backgroundImage: "url(" + `${this.props.data.main.background}` + ")",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="reset__top">
                            <div className="reset__logo reset__top_item not-selectable">
                                <img src={this.props.data.main.logo} alt="" className="reset__logo_inner not-selectable" />
                            </div>
                            <div className="reset__form reset__top_item">
                                {!this.state.couldFind ? (
                                    <form
                                        action=""
                                        className="reset__form_inner"
                                        onChange={() => this.processForm(true)}
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            this.setState({isDisabled: true});
                                            this.setState({isDisabledForce: true});
                                            this.setState({canGoBack: false});
                                            return this.usernameRef.current?.value && this.emailRef.current?.value ? this.checkAccount(`${this.usernameRef.current.value}`, `${this.emailRef.current.value}`) : false;
                                        }}
                                    >
                                        <div className="reset__form_item not-selectable">
                                            <img src={this.props.data.icons.username} alt="" className="reset__form_icon not-selectable" />
                                            <input type={this.props.data.main.username} className="reset__form_input" placeholder={this.props.data.main.username} ref={this.usernameRef} disabled={this.state.isDisabledForce} />
                                        </div>
                                        <div className="reset__form_item not-selectable">
                                            <img src={this.props.data.icons.password} alt="" className="reset__form_icon not-selectable" />
                                            <input type={this.props.data.main.email} className="reset__form_input" placeholder={this.props.data.main.email} ref={this.emailRef} disabled={this.state.isDisabledForce} />
                                        </div>
                                        <button className="reset__form_button" disabled={this.state.isDisabled}>
                                            {this.props.data.reset.reset}
                                        </button>
                                        {this.state.canGoBack ? (
                                            <Link to={this.props.data.reset.return_back_href} className="reset__return_inner">
                                                {this.props.data.reset.return_back}
                                            </Link>
                                        ) : null}
                                    </form>
                                ) : null}
                                {this.state.couldFind && !this.state.shouldChangePassword ? (
                                    <form
                                        action=""
                                        className="reset__form_inner"
                                        onChange={() => this.processFormCode(true)}
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            this.setState({isDisabled: true});
                                            this.setState({isDisabledForce: true});
                                            this.setState({canGoBack: false});
                                            return this.codeRef.current?.value ? this.checkCode(`${this.codeRef.current.value}`) : false;
                                        }}
                                    >
                                        <div className="reset__form_item not-selectable">
                                            <img src={this.props.data.icons.password} alt="" className="reset__form_icon not-selectable" />
                                            <input type={this.props.data.reset.type} className="reset__form_input" placeholder={this.props.data.reset.code} ref={this.codeRef} disabled={this.state.isDisabledForce} />
                                        </div>
                                        <button className="reset__form_button" disabled={this.state.isDisabled}>
                                            {this.props.data.reset.confirm}
                                        </button>
                                        {this.state.canGoBack ? (
                                            <Link to={this.props.data.reset.return_back_href} className="reset__return_inner">
                                                {this.props.data.reset.return_back}
                                            </Link>
                                        ) : null}
                                    </form>
                                ) : null}
                                {this.state.shouldChangePassword ? (
                                    <form
                                        action=""
                                        className="reset__form_inner"
                                        onChange={() => this.processFormPassword(true)}
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            this.setState({isDisabled: true});
                                            this.setState({isDisabledForce: true});
                                            this.setState({canGoBack: false});
                                            return this.passwordRef.current?.value ? this.changePassword(`${this.passwordRef.current.value}`) : false;
                                        }}
                                    >
                                        <div className="reset__form_item not-selectable">
                                            <img src={this.props.data.icons.password} alt="" className="reset__form_icon not-selectable" />
                                            <input type={this.props.data.main.password} className="reset__form_input" placeholder={this.props.data.main.new_password} ref={this.passwordRef} disabled={this.state.isDisabledForce} />
                                        </div>
                                        <div className="reset__form_item not-selectable">
                                            <img src={this.props.data.icons.password} alt="" className="reset__form_icon not-selectable" />
                                            <input type={this.props.data.main.password} className="reset__form_input" placeholder={this.props.data.main.confirm} ref={this.confirmRef} disabled={this.state.isDisabledForce} />
                                        </div>
                                        <button className="reset__form_button" disabled={this.state.isDisabled}>
                                            {this.props.data.reset.confirm}
                                        </button>
                                        {this.state.canGoBack ? (
                                            <Link to={this.props.data.reset.return_back_href} className="reset__return_inner">
                                                {this.props.data.reset.return_back}
                                            </Link>
                                        ) : null}
                                    </form>
                                ) : null}
                            </div>
                        </div>
                        <div className="reset__bottom">
                            <p className="reset__bottom_item">
                                <span className="reset__bottom_inner">{this.props.data.reset.registration_title} </span>
                                <Link to={this.props.data.reset.registration_href} className="reset__bottom_inner">
                                    {this.props.data.reset.registration}
                                </Link>
                            </p>
                        </div>
                    </main>
                ) : null}
            </React.Fragment>
        );
    }
}
