import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
                        <Link to="/payments">Add Credits</Link>
                    </li>,
                    <li style={{ margin: "0 10px" }} key={3}>
                        Credits: {this.props.auth.credits}
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
