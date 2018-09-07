import React from 'react';
import ReactDOM from 'react-dom';

class Nav extends React.Component {
    
    constructor(props) {
        super(props);
    }

    renderNavLine(i, href, label, spanId, spanClass) {
        const menuSelected = this.props.currentSection;
        const classSelected = (i === menuSelected) ? "selected" : "";

        return <li><a href={href} className={classSelected} onClick={(event) => this.props.onClick(event, i)}>{label}<span id={spanId} className={spanClass} /></a></li>
    }
    
    render() {
        const nav = this.props.nav;
        let className;
        if(nav.clickedIcon === true) {
            className = "responsive"; 
        } else {
            className = "";
        }
        return (
            <nav id="menu" className={className}>
                <span className="menu-selected-mobile">Profil</span>
                <ul id="main-menu">
                    {this.renderNavLine(0, "#profile", "Profil", "user_img", "img_nav")}
                    {this.renderNavLine(1, "#le-jour-j", "Le jour J", "jourj_img", "img_nav")}
                    {this.renderNavLine(2, "#reponse", "Répondre à l'invitation", "invitation_img", "img_nav")}
                    {this.renderNavLine(3, "#hebergement", "Hébergement", "hebergement_img", "img_nav")}
                    {this.renderNavLine(4, "#photo", "Photos", "photo_img", "img_nav")}
                    {this.renderNavLine(5, "#sjc", "Saint-Jean de Chépy", "SJC_img", "img_nav")}
                    {this.renderNavLine(6, "#contact", "Coordonnées", "phone_img", "img_nav")}
                </ul>
                <a href="javascript:void(0);" className="icon" onClick={this.props.onClickIcon}>&#9776;</a>
            </nav>
        );
    };
}

export default Nav;