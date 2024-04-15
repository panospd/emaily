import { Component } from "react";
import { connect } from "react-redux";

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
                return (
                    <li>
                        <a>Logout</a>
                    </li>
                );
        }
    }
    render() {
        return (
            <div className="row">
                <nav>
                    <div className="nav-wrapper">
                        <div className="col s12">
                            <a href="#" className="brand-logo">
                                Emaily
                            </a>
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
