import React from "react";
import {BrowserRouter, Routes, Navigate, Route} from "react-router-dom";
import Authorization from "./Authorization/Authorization";
import Failed from "./Failed/Failed";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import Reset from "./Reset/Reset";
import Success from "./Success/Success";
import Unavailable from "./Unavailable/Unavailable";
interface Props {
    databaseApp: any;
    firebase: any;
}
export default class Router extends React.Component<Props> {
    state = {
        shouldRenderFail: false,
        shouldRenderSuccess: false,
        shouldRenderRegistrationComplete: false,
        shouldRenderRegistrationFail: false,
        shouldRenderResetFail: false,
        shouldRenderResetComplete: false,
    };
    setFail = (status: boolean) => this.setState({shouldRenderFail: status});
    setSuccess = (status: boolean) => this.setState({shouldRenderSuccess: status});
    setRegSuccess = (status: boolean) => this.setState({shouldRenderRegistrationComplete: status});
    setRegFail = (status: boolean) => (!this.state.shouldRenderRegistrationFail ? this.setState({shouldRenderRegistrationFail: status}) : false);
    forcedSetRegFail = (status: boolean) => this.setState({shouldRenderRegistrationFail: status});
    setResFail = (status: boolean) => this.setState({shouldRenderResetFail: status});
    setResSuccess = (status: boolean) => this.setState({shouldRenderResetComplete: status});
    render() {
        return (
            <BrowserRouter>
                {/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (
                    <React.Fragment>
                        {!this.state.shouldRenderFail && !this.state.shouldRenderSuccess && !this.state.shouldRenderRegistrationComplete && !this.state.shouldRenderRegistrationFail && !this.state.shouldRenderResetFail && !this.state.shouldRenderResetComplete ? (
                            <Routes>
                                <Route path="*" element={<Navigate to="/authorization/login" />} />
                                <Route path="/authorization/login" element={<Authorization databaseApp={this.props.databaseApp} firebase={this.props.firebase} componentToRender={Login} functions={[this.setFail, this.setSuccess]} shouldSetItemsToDatabase={false} path="" isReg={false} isRes={false} />} />
                                <Route path="/authorization/registration" element={<Authorization databaseApp={this.props.databaseApp} firebase={this.props.firebase} componentToRender={Registration} functions={[this.setFail, this.setSuccess, this.setRegSuccess, this.setRegFail]} shouldSetItemsToDatabase={true} path="/accounts" isReg={false} isRes={false} />} />
                                <Route path="/authorization/reset" element={<Authorization databaseApp={this.props.databaseApp} firebase={this.props.firebase} componentToRender={Reset} functions={[this.setResFail, this.setResSuccess]} shouldSetItemsToDatabase={true} path="/accounts" isReg={false} isRes={false} />} />
                            </Routes>
                        ) : (
                            <React.Fragment>
                                {this.state.shouldRenderFail ? (
                                    <Routes>
                                        <Route path="*" element={<Navigate to="/authorization/failed" />} />
                                        <Route path="/authorization/failed" element={<Authorization databaseApp={this.props.databaseApp} firebase={this.props.firebase} componentToRender={Failed} functions={[this.setFail, this.setSuccess]} shouldSetItemsToDatabase={false} path="" isReg={false} isRes={false} />} />
                                    </Routes>
                                ) : null}
                                {this.state.shouldRenderRegistrationFail ? (
                                    <Routes>
                                        <Route path="*" element={<Navigate to="/authorization/failed" />} />
                                        <Route path="/authorization/failed" element={<Authorization databaseApp={this.props.databaseApp} firebase={this.props.firebase} componentToRender={Failed} functions={[this.setFail, this.setSuccess, this.forcedSetRegFail]} shouldSetItemsToDatabase={true} path="" isReg={true} isRes={false} />} />
                                    </Routes>
                                ) : null}
                                {this.state.shouldRenderResetFail ? (
                                    <Routes>
                                        <Route path="*" element={<Navigate to="/authorization/failed" />} />
                                        <Route path="/authorization/failed" element={<Authorization databaseApp={this.props.databaseApp} firebase={this.props.firebase} componentToRender={Failed} functions={[this.setResFail, this.setSuccess]} shouldSetItemsToDatabase={true} path="" isReg={false} isRes={true} />} />
                                    </Routes>
                                ) : null}
                                {this.state.shouldRenderSuccess ? (
                                    <Routes>
                                        <Route path="*" element={<Navigate to="/authorization/success" />} />
                                        <Route path="/authorization/success" element={<Authorization databaseApp={this.props.databaseApp} firebase={this.props.firebase} componentToRender={Success} functions={[this.setFail, this.setSuccess]} shouldSetItemsToDatabase={false} path="" isReg={false} isRes={false} />} />
                                    </Routes>
                                ) : null}
                                {this.state.shouldRenderRegistrationComplete ? (
                                    <Routes>
                                        <Route path="*" element={<Navigate to="/authorization/success" />} />
                                        <Route path="/authorization/success" element={<Authorization databaseApp={this.props.databaseApp} firebase={this.props.firebase} componentToRender={Success} functions={[this.setFail, this.setSuccess, this.setRegSuccess]} shouldSetItemsToDatabase={true} path="" isReg={true} isRes={false} />} />
                                    </Routes>
                                ) : null}
                                {this.state.shouldRenderResetComplete ? (
                                    <Routes>
                                        <Route path="*" element={<Navigate to="/authorization/success" />} />
                                        <Route path="/authorization/success" element={<Authorization databaseApp={this.props.databaseApp} firebase={this.props.firebase} componentToRender={Success} functions={[this.setFail, this.setResSuccess]} shouldSetItemsToDatabase={true} path="" isReg={false} isRes={true} />} />
                                    </Routes>
                                ) : null}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ) : (
                    <Routes>
                        <Route path="*" element={<Navigate to="/unavailable" />} />
                        <Route path="/unavailable" element={<Unavailable />} />
                    </Routes>
                )}
            </BrowserRouter>
        );
    }
}
