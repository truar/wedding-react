import React from 'react';
import ReactDOM from 'react-dom';
import SmoothScroll from 'smoothscroll';
import KeyHandler, {KEYPRESS} from 'react-key-handler';

import AjaxJsonApi from './utils/AjaxJsonApi.js';

import Nav from './components/nav.js';
import Profile from './components/profile.js';
import JourJ from './components/jourj.js';
import Reponse from './components/reponse.js';
import Hebergement from './components/hebergement.js';
import Photo from './components/photo.js';
import Sjc from './components/sjc.js';
import Contact from './components/contact.js';

import './css/reset.css';
import './css/style.css';
import './css/1440x900/style-1440x900.css';
import './css/mobile/mobile.css';

class WeddingWebsite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSection: 0,
            nav: {
                clickedIcon: false,
            },
            profile: {
                isWaiting: false,
                isLoggedIn: false,
                error: null,
            },
            response: {
                formStep: 0,
                isAnimatedFromLeft: true,
                newGuestName: '',
                error: '',
            },
            guest: {
                id: '',
                password: '',
                answer: {
                    hasAnswered: false,
                    isAvailable: true,
                    email: '',
                    guests: [],
                    allergies: '',
                    message: '',
                    hebergement: '',
                }
            }
        };
        this.sectionSize = 0;

        this.ajaxServer = new AjaxJsonApi();

        this.handleScroll = this.handleScroll.bind(this);
        this.handleKeyHandle = this.handleKeyHandle.bind(this);
        this.handleClickNav = this.handleClickNav.bind(this);
        this.handleClickNavIcon = this.handleClickNavIcon.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleClickFirstPart = this.handleClickFirstPart.bind(this);
        this.handleClickSecondPart = this.handleClickSecondPart.bind(this);
        this.handleClickLastPart = this.handleClickLastPart.bind(this);
        this.handleClickPrevious = this.handleClickPrevious.bind(this);
        this.handleChangeYesOrNo = this.handleChangeYesOrNo.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeHebergement = this.handleChangeHebergement.bind(this);
        this.handleChangeAllergies = this.handleChangeAllergies.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleChangeGuestName = this.handleChangeGuestName.bind(this);
        this.handleClickAddName = this.handleClickAddName.bind(this);
        this.handleClickDeleteName = this.handleClickDeleteName.bind(this);
    }

    componentDidMount() {
        // Calculate the section size
        this.sectionSize = document.getElementsByTagName("section")[0].offsetHeight;
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let scrollTop = document.documentElement.scrollTop;
        let currentSection = findCurrentSection(scrollTop, this.sectionSize);
        this.setState({
            currentSection : currentSection,
        });
    }

    handleKeyHandle(way) {
        var currentSection = this.state.currentSection;
        if(way === 'up') {
            if(currentSection > 0) {
                currentSection -= 1;
            }
        } else {
            if(currentSection < 6) {
                currentSection += 1;
            }
        }

        this.moveScroll(currentSection);
    }

    
    handleClickNav(event, i) {
        this.moveScroll(i);
        event.preventDefault();
    }

    handleClickNavIcon(event) {
        this.setState((prevState, props) => {
            return {
                nav: {
                    clickedIcon: !prevState.nav.clickedIcon
                }
            };
        });
    }

    moveScroll(newSection) {
        var destination = document.querySelectorAll('section')[newSection];
        SmoothScroll(destination, 500, () => this.setState({
            currentSection : newSection,
        }));
    }

    /** BEGINNING OF PROFILE SECTION */

    handleSubmit(event) {
        // That way if we don't change all the properties of the nested property 'profile'
        var profile = this.state.profile;
        profile.isWaiting = true;
        this.setState({profile: profile});

        var guest = this.state.guest;

        this.logUser(guest);

        event.preventDefault();
    }

    logUser(guest) {
        this.ajaxServer.login(guest)
            .then((result) => {
                if(result.error) {
                    this.handleLoginError(result.error);
                } else {
                    var guest = result.data;
                    if(guest.answer.hasAnswered === undefined) {
                        guest.answer = {
                            hasAnswered: false,
                            isAvailable: true,
                            email: '',
                            guests: [],
                            allergies: '',
                            message: '',
                            hebergement: '',
                        }
                    }
                    this.setState({
                        profile: {
                            isWaiting: false, isLoggedIn : true
                        },
                        guest: guest,
                    });
                }
            })
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            .catch((error) => {
                this.handleLoginError(error.message);
            });
    }

    handleLoginError(message) {
        this.setState({
            profile: {
                isWaiting: false, isLoggedIn : false,
                error: "Une erreur est apparue. Réessayez plus tard.",
            }
        });
    }

    handleClickLogout() {
        // That way if we change all the properties of the nested property 'profile'
        this.setState({
            profile: {
                isWaiting: false, isLoggedIn : false
            },
            guest: {
                id: '',
                password: '',
            }
        });
    }

    handleChangeLogin(event) {
        var guest = this.state.guest;
        guest.id = event.target.value;
        this.setState({
            guest: guest
        });
    }

    handleChangePassword(event) {
        var guest = this.state.guest;
        guest.password = event.target.value;
        this.setState({
            guest: guest
        });
    }

    /** END OF PROFILE SECTION */

    /** BEGINNING OF REPONSE SECTION */

    handleClickFirstPart() {
        const guest = this.state.guest;
        if(guest.answer.isAvailable === true) {
            this.setState({
                response: {
                    formStep: 1,
                    isAnimatedFromLeft: true,
                    error: ''
                }
            });
        } else {
            guest.answer.hasAnswered = true;
            this.ajaxServer.putGuest(guest)
            .then((result) => {
                this.setState({
                    response: {
                        formStep: 3,
                        isAnimatedFromLeft: true,
                        error: ''
                    }
                });
            }).catch((error) => {
                const response = this.state.response;
                response.error = "Une erreur est apparue. Réessayez plus tard."
                this.setState({
                    response : response,
                });
            });
        }
    }

    handleClickSecondPart() {
        const guest = this.state.guest;
        if(guest.answer.guests.length === 0) {
            const response = this.state.response;
            response.error = "Veuillez renseigner au moins un invité";
            this.setState({
                response : response,
            });
        } else if(guest.answer.hebergement === '') {
            const response = this.state.response;
            response.error = "Veuillez choisir un mode d'hébergement";
            this.setState({
                response : response,
            });
        } else {
            this.setState({
                response: {
                    formStep: 2,
                    isAnimatedFromLeft: true,
                    error: ''
                }
            });
        }
    }

    handleClickLastPart() {
        const guest = this.state.guest;
        guest.answer.date = Date.now();
        guest.answer.hasAnswered = true;
        this.ajaxServer.putGuest(guest)
            .then((result) => {
                this.setState({
                    response: {
                        formStep: 4,
                        isAnimatedFromLeft: true,
                        error: ''
                    }
                });
            }).catch((error) => {
                const response = this.state.response;
                response.error = "Une erreur est apparue. Réessayez plus tard."
                this.setState({
                    response : response,
                });
            });
    }

    handleClickPrevious() {
        const formStep = this.state.response.formStep - 1;
        this.setState({
            response: {
                formStep: formStep,
                isAnimatedFromLeft: false,
                error: '',
            }
        });
    }

    handleChangeYesOrNo(event) {
        var guest = this.state.guest;
        guest.answer.isAvailable = (event.target.value === "true") ? true : false;
        this.setState({
            guest: guest,
        });
    }

    handleChangeEmail(event) {
        var guest = this.state.guest;
        guest.answer.email = event.target.value;
        this.setState({
            guest: guest
        });
    }

    handleChangeHebergement(event) {
        var guest = this.state.guest;
        guest.answer.hebergement = event.target.value;
        this.setState({
            guest: guest,
        });
    }

    handleChangeAllergies(event) {
        var guest = this.state.guest;
        guest.answer.allergies = event.target.value;
        this.setState({
            guest: guest,
        });
    }

    handleChangeMessage(event) {
        var guest = this.state.guest;
        guest.answer.message = event.target.value;
        this.setState({
            guest: guest,
        });
    }

    handleClickAddName() {
        const guest = this.state.guest;
        const response = this.state.response;
        const newGuestName = response.newGuestName.trim();

        if(newGuestName !== '') {
            response.newGuestName = '';
            response.error= '';
            guest.answer.guests.push(newGuestName);
            this.setState({
                guest: guest,
                response: response,
            });
        }
    }

    handleChangeGuestName(event) {
        var response = this.state.response;
        response.newGuestName = event.target.value;
        this.setState({
            response: response,
        });
    }

    handleClickDeleteName(index) {
        console.log(index);
        const guest = this.state.guest;
        guest.answer.guests.splice(index);
        this.setState({
            guest: guest,
        });
    }

    /** END OF RESPONSE SECTION */

    render() {
        const currentSection = this.state.currentSection;
        const profile = this.state.profile;
        const response = this.state.response;
        const guest = this.state.guest;
        const nav = this.state.nav;

        if(guest._id) {
            return (
                <div>
                    <KeyHandler keyEventName={KEYPRESS} keyValue="ArrowUp" onKeyHandle={() => this.handleKeyHandle('up')} />
                    <KeyHandler keyEventName={KEYPRESS} keyValue="ArrowDown" onKeyHandle={() => this.handleKeyHandle('down')} />

                    <Nav nav={nav} onClick={this.handleClickNav} currentSection={currentSection} onClickIcon={this.handleClickNavIcon}/>
                    <Profile guest={guest} 
                            profile={profile} 
                            onSubmit={this.handleSubmit} 
                            onClickLogout={this.handleClickLogout}
                            onChangeLogin={this.handleChangeLogin}
                            onChangePassword={this.handleChangePassword} />
                    <JourJ guest={guest} />
                    <Reponse guest={guest} 
                            response={response}
                            onClickFirstPart={this.handleClickFirstPart}
                            onClickSecondPart={this.handleClickSecondPart}
                            onClickLastPart={this.handleClickLastPart} 
                            onClickPrevious={this.handleClickPrevious} 
                            onChangeYesOrNo={this.handleChangeYesOrNo}
                            onChangeEmail={this.handleChangeEmail} 
                            onChangeHebergement={this.handleChangeHebergement} 
                            onChangeAllergies={this.handleChangeAllergies}
                            onChangeMessage={this.handleChangeMessage} 
                            onChangeGuestName={this.handleChangeGuestName}
                            onClickAddName={this.handleClickAddName} 
                            onClickDeleteName={this.handleClickDeleteName} />
                    <Hebergement />
                    <Photo />
                    <Sjc />
                    <Contact />
                </div>
            );
        } else {
            return (
                <Profile guest={guest} 
                        profile={profile} 
                        onSubmit={this.handleSubmit} 
                        onClickLogout={this.handleClickLogout}
                        onChangeLogin={this.handleChangeLogin}
                        onChangePassword={this.handleChangePassword} />
            );
        }

    }
}
  
  // ========================================
  
ReactDOM.render(
    <WeddingWebsite />,
    document.getElementById('root')
);

function findCurrentSection(scrollTop, sectionSize) {
    let currentSection = Math.round(scrollTop / sectionSize);
    return currentSection;
}