import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const WALLET_INTERVAL_MS = 1000;

class App extends Component {
    state = {
        walletInfo: {}
    }

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
        .then(response => response.json())
        .then(json => this.setState({ walletInfo: json }));

        this.walletInfoFetchInterval = setInterval(
            () => {
                fetch(`${document.location.origin}/api/wallet-info`)
                .then(response => response.json())
                .then(json => this.setState({ walletInfo: json }));
            },
            WALLET_INTERVAL_MS
        )
    }

    componentWillUnmount() {
        clearInterval(this.walletInfoFetchInterval);
    }

    render() {
        const { address, balance } = this.state.walletInfo;

        return (
            <div className="App">
                <img className="logo" src={logo}></img>
                <br/>
                <div>
                    <h2>Welcome to the blockchain.</h2>
                </div>
                <br/>
                <div><Link to="/blocks">Blocks</Link></div>
                <div><Link to="/conduct-transaction">Conduct a Transaction</Link></div>
                <div><Link to="/transaction-pool">Transaction Pool</Link></div>
                <br/>
                <div className="WalletInfo">
                    <div><h3>Address:</h3>{address}</div>
                    <div><h3>Balance:</h3>{balance}</div>
                </div>
            </div>
        );
    }
}

export default App;