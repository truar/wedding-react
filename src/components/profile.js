import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import loading from '../css/images/icons/loading.gif'

class Login extends React.Component {

    render() {
        const renderError = (this.props.error != null) ? <p class='error-login'>{this.props.error}</p> : '';
        const renderWaiting = (this.props.isWaiting === true) ? (<div class="load-bar">
            <div class="bar"></div>
        </div>) : '';
        return (
            <div className="content" id="login-wrapper">
                {renderWaiting}
                <h2>Les poupous se marient !</h2>
                <form name="login" id="login-form" method="POST" onSubmit={this.props.onSubmit}>
                    {renderError}
                    <p><input type="text" name="username" id="username" placeholder="Login" 
                                value={this.props.guest.id} 
                                onChange={this.props.onChangeLogin}/></p>
                    <p><input type="password" name="password" id="password" placeholder="Mot de passe" 
                                value={this.props.guest.password} 
                                onChange={this.props.onChangePassword}/></p>
                    <p><input type="submit" name="log" id="log" value="Se connecter" /></p>
                </form>
            </div>
        );
    }
}

class Logged extends React.Component {
    calculateRemainingDays() {
        var dateWedding = new Date(2019, 7, 31);
        var today = Date.now();
        var numOfDays = Math.round((dateWedding-today)/(1000*60*60*24));
        var dateDisplay = "J-" + numOfDays;
        if(numOfDays == 0) {
            dateDisplay = "JOUR-J";
        } else if(numOfDays < 0) {
            dateDisplay = "Mariage terminé";
        }
        return dateDisplay;
    }
    
    render() {
        const dateDisplay = this.calculateRemainingDays();
        return (
            <div id="logged" className="content">
                <h2>Que l'aventure commence !</h2>
                <p>Bienvenue</p>
                <p className="displayName">{this.props.displayName}</p>
                <p id="date-calcul">{dateDisplay}</p>
                <p><button type="button" name="logout" id="logout" onClick={() => this.props.onClick()}>Se d&eacute;connecter</button></p>
            </div>
        );
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const profile = this.props.profile;
        const isLoggedIn = profile.isLoggedIn;
        const isWaiting = profile.isWaiting;
        const error = profile.error;

        const guest = this.props.guest;
        const displayName = guest.displayName;

        var toRender;
        if (isLoggedIn === false) {
            toRender = <Login guest={guest} 
                            error={error}
                            onSubmit={this.props.onSubmit} 
                            onChangeLogin={this.props.onChangeLogin} 
                            onChangePassword={this.props.onChangePassword} 
                            isWaiting={isWaiting}
                            key="1"/>;
        } else {
            toRender = <Logged displayName={displayName} onClick={this.props.onClickLogout} key="2"/>
        }
        return (
            <section id="profile">
                <article id="login">
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        {toRender}
                    </CSSTransitionGroup>
                </article>
            </section>
        );
    }
}

export default Profile;