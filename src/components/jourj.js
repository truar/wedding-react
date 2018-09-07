import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import KeyHandler, {KEYPRESS} from 'react-key-handler';
import Swipe from 'react-swipe-component';

import UnionPhoto from '../css/images/union-profile.png';
import ArrowLeft from '../css/images/icons/slider_left-arrow.png';
import ArrowRight from '../css/images/icons/slider_right-arrow.png';

function Union(props) {
    return (
        <article id="union">
            <div className="wrapper-content">
                <div className="content">
                    <h2><img src={UnionPhoto} />Anouk & Thibault</h2>
                    <p>S’unissent pour le meilleur et pour le pire<br/>le 31 Août 2019<br/>au domaine de Saint-Jean de Chépy</p>
                </div>
            </div>
        </article>
    );
}

function Ceremonie(props) {
    return (
        <article id="ceremonie">
            <div className="wrapper-content">
                <div className="content">
                    <h2>C&eacute;r&eacute;monie</h2>
                    <p>Nous vous donnons rendez-vous à 10h45<br/>au domaine de Saint-Jean de Chépy<br/>La cérémonie débutera à 11h00 sous le chapiteau</p>
                </div>
            </div>
        </article>
    );
}

function VinHonneur(props) {
    return (
        <article id="vin-honneur">
            <div className="wrapper-content">
                <div className="content">
                    <h2>Le vin d'honneur</h2>
                    <p>Se déroulera de 13h00 à 15h00<br/>Une activité « guest book » aura lieu dans l’après-midi<br/>Nous aimerions que chaque invité, couple, famille<br/>apporte une photo qui lui est chère</p>
                </div>
            </div>
        </article>
    );
}

function Sport(props) {
    return (
        <article id="sport">
            <div className="wrapper-content">
                <div className="content">
                    <h2>Activit&eacute;s sportives</h2>
                    <p>De 15h00 à 18h00<br/>N’oubliez pas de prévoir une tenue adéquate<br/>(Vestiaire et douches sur place)</p>
                </div>
            </div>
        </article>
    );
}

function Diner(props) {
    return (
        <article id="diner">
            <div className="wrapper-content">
                <div className="content">
                    <h2>Diner</h2>
                    <p>Vous pourrez vous installer dans la salle<br/>principale à partir de 19h00<br/>Nous vous proposons de déguster un <br/>repas 100% végétarien</p>
                </div>
            </div>
        </article>
    );
}

function Danse(props) {
    return (
        <article id="danse">
            <div className="wrapper-content">
                <div className="content">
                    <h2>Soir&eacute;e</h2>
                    <p>C’est le moment d’enflammer la piste de danse !<br/>Les festivités s’arrêteront vers 4h00<br/>(N'oubliez pas de consulter la page h&eacute;bergements pour savoir ou dormir)</p>
                </div>
            </div>
        </article>
    );
}

function Brunch(props) {
    return (
        <article id="brunch">
            <div className="wrapper-content">
                <div className="content">
                    <h2>Brunch</h2>
                    <p>Dimanche 1 Septembre à partir de 11h00<br/>La journée sera placée sous le thème de la détente<br/>N’oubliez pas vos maillots de bain</p>
                </div>
            </div>
        </article>
    );
}

class SliderNav extends React.Component {
    render() {
        const className = (this.props.isSelected) ? "bubble bubble-selected" : "bubble";
        return (
            <span className={className} onClick={this.props.onClick}></span>
        );
    }
}

class Slider extends React.Component {
    render() {
        const slider = [
            <Union key="union"/>,
            <Ceremonie key="ceremonie"/>,
            <VinHonneur key="vinhonneur"/>,
            <Sport key="sport"/>,
            <Diner key="diner"/>,
            <Danse key="danse"/>,
            <Brunch key="brunch"/>
        ];

        const transitionName = (this.props.isAnimatedFromLeft) ? 'slide-left': 'slide-right';
        
        return (
            <div className="slider">
                <CSSTransitionGroup
                    transitionName={transitionName}
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={400}>
                    {slider[this.props.selected]}
                </CSSTransitionGroup> 
            </div>
        );
    }
}

class JourJ extends React.Component {

    constructor(props) {
        super(props);
        
        const category = props.guest.category;
        var nbBubbles;
        if(category === 3) {
            nbBubbles = 7;
        } else if(category === 2) {
            nbBubbles = 6;
        } else {
            nbBubbles = 4;
        }

        this.state = {
            bubbleSelected: 0,
            prevBubbleSelected: 0,
            nbNubbles: nbBubbles,
        };
        
        this.handleClickBubble = this.handleClickBubble.bind(this);
    }

    renderBubbles() {
        const nbBubbles = this.state.nbNubbles;
        const bubbleSelected = this.state.bubbleSelected;
        var bubbles = [];

        for(var i = 0; i < nbBubbles; i++) {
            var isSelected = (i === bubbleSelected) ? true : false;
            bubbles.push(this.renderBubble(i, isSelected));
        }
        return bubbles;
    }

    renderBubble(i, isSelected) {
        return <SliderNav key={i} isSelected={isSelected} onClick={() => this.handleClickBubble(i)}/>;
    }

    handleClickBubble(i) {
        const prevBubbleSelected = this.state.bubbleSelected;
        this.setState({
            bubbleSelected: i,
            prevBubbleSelected: prevBubbleSelected,
        });
    }

    handleKeyHandle(way) {
        const bubbleSelected = this.state.bubbleSelected;
        const nbBubbles = this.state.nbNubbles;
        if (way === 'right') {
            const newBubble = (bubbleSelected + 1) % nbBubbles;
            this.setState({
                bubbleSelected: newBubble,
                prevBubbleSelected: bubbleSelected,
            });
        } else {
            var newBubble = bubbleSelected - 1;
            newBubble = (newBubble < 0) ? nbBubbles - 1 : newBubble;
            this.setState({
                bubbleSelected: newBubble,
                prevBubbleSelected: bubbleSelected,
            });
        }
    }

    render() {
        const selected = this.state.bubbleSelected;
        const prev = this.state.prevBubbleSelected;
        const isAnimatedFromLeft = (prev <= selected) ? true : false;

        return (
            <section id='le-jour-j'>
                <div className="wrapper-title">
                    <h1>Le jour J</h1>
                </div>
                
                <KeyHandler keyEventName={KEYPRESS} keyValue="ArrowRight" onKeyHandle={() => this.handleKeyHandle('right')} />
                <KeyHandler keyEventName={KEYPRESS} keyValue="ArrowLeft" onKeyHandle={() => this.handleKeyHandle('left')} />
                <Swipe 
                    nodeName="div"
                    className="slider"
                    mouseSwipe={true}
                    onSwipedLeft={() => this.handleKeyHandle('right')} 
                    onSwipedRight={() => this.handleKeyHandle('left')} >
                        <Slider selected={selected} isAnimatedFromLeft={isAnimatedFromLeft}/>
                </Swipe>
                <div id="arrow">
                    <img src={ArrowLeft} id="arrowLeft" onClick={() => this.handleKeyHandle('left')} />
                    <img src={ArrowRight} id="arrowRight" onClick={() => this.handleKeyHandle('right')} />
                </div>
                <div className="slider-nav">
                    {this.renderBubbles()}
                </div>
            </section>
        );
    }
}

export default JourJ;