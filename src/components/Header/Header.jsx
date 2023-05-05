import {Header, Image, Icon, Segment} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function HeaderPage(){
    return (
        <Header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/signup">Sign-Up</Link>
                <Link to="/login">Login</Link>
            </nav>
        </Header>
    )
}
