import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payment";

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                return [
                    <li key={1}>
                        <Link to="/payments">Payments</Link>
                    </li>,
                    <li key={2}>
                        <a href="/api/logout">Logout</a>
                    </li>,
                ];
        }
    }
    render() {
        return (
            <div className="row">
                <nav>
                    <div className="nav-wrapper">
                        <div className="col s12">
                            <Link
                                to={this.props.auth ? "/surveys" : "/"}
                                className="brand-logo"
                            >
                                Emaily
                            </Link>
                            <ul className="right">{this.renderContent()}</ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
