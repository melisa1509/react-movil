import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => (
    { title: state.title}
);

class TitleConected extends React.Component {
    render() {
        return(
        <h1>{this.props.title}</h1>
        )
    }

}

export default connect(mapStateToProps)(TitleConected);