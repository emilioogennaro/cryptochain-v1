import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';

class ConductTransaction extends Component {
    state = {
        recipient: '',
        amount: 0
    };

    updateRecipient = event => {
        this.setState({ recipient: event.target.value });
    }

    updateAmount = event => {
        this.setState({ amount: Number(event.target.value) });
    }

    postTransaction(url = '', data = {}) {
        // Default options are marked with *
        fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(json => {
            alert(json.message || json.type);
            history.push('/transaction-pool')
        })
      }

    conductTransaction = () => {
        const { recipient, amount } = this.state;
        this.postTransaction(`${document.location.origin}/api/transact`, {recipient, amount})
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <h3>Conduct a Transaction</h3>
                <div className="ConductTransaction">
                    <FormGroup>
                        <FormControl
                            input="text"
                            placeholder="recipient"
                            value={this.state.recipient}
                            onChange={this.updateRecipient}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            input="number"
                            placeholder="amount"
                            value={this.state.amount}
                            onChange={this.updateAmount}
                        />
                    </FormGroup>
                    <div>
                        <Button
                        bsStyle="danger"
                        onClick={this.conductTransaction}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConductTransaction;