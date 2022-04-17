import React from "react";
interface Props {
    databaseApp: any;
    firebase: any;
    componentToRender: any;
    functions: Array<any>;
    shouldSetItemsToDatabase: boolean;
    path: string;
    isReg: boolean;
    isRes: boolean;
}
export default class Authorization extends React.Component<Props> {
    state = {
        accounts: [],
        data: {},
    };
    getItemsFromDatabase = (path: string, changeState: (value: any) => void) => {
        const ref = this.props.firebase.database().ref(path);
        return ref.on("value", (snapshot: any) => {
            const value = snapshot.val();
            return changeState(value);
        });
    };
    setItemsToDatabase = (path: string, item: any) => this.props.firebase.database().ref(path).set(item);
    setAccountsInsideState = (accounts: any) => this.setState({accounts: accounts});
    setDataInsideState = (data: any) => this.setState({data});
    componentDidMount() {
        this.getItemsFromDatabase("/accounts", this.setAccountsInsideState);
        this.getItemsFromDatabase("/data", this.setDataInsideState);
    }
    render() {
        const Component = this.props.componentToRender;
        return this.state.accounts.length > 0 && this.state.data ? (
            <React.Fragment>
                {this.props.shouldSetItemsToDatabase ? <Component data={this.state.data} accounts={this.state.accounts} functions={this.props.functions} path={this.props.path} setItemsFunction={this.setItemsToDatabase} isReg={this.props.isReg} isRes={this.props.isRes} /> : <Component data={this.state.data} accounts={this.state.accounts} functions={this.props.functions} />}
            </React.Fragment>
        ) : null;
    }
}
