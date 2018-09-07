import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

function FirstPart(props) {
    const guest = props.guest;

    var errorHtml = '';
    if(props.error !== '') {
        errorHtml = <p class='error-guests'>{props.error}</p>
    }

    let inputButtonValue;
    if (guest.answer.isAvailable === false) {
        inputButtonValue = 'Envoyer';
    } else {
        inputButtonValue = 'Continuer';
    }

    return (
        <article id="firstPart">
            <div className="content">
                <div className="yesOrNo">
                    <p>Serez-vous disponible le jour J ?</p>
                    <p className="yesOrNo">
                        <label htmlFor="yesanswer">Oui</label> 
                        <input name="yesOrNo" id="yesanswer" type="radio" value="true" 
                            checked={guest.answer.isAvailable === true}  
                            onChange={props.onChangeYesOrNo}/>

                        <label htmlFor="noanswer">Non</label> 
                        <input name="yesOrNo" id="noanswer" type="radio" value="false"
                            checked={guest.answer.isAvailable === false}  
                            onChange={props.onChangeYesOrNo}/>
                    </p>
                </div>
                <div className="photo">
                    <p>Les photos seront mises à disposition sur le site après le mariage<br/>Si vous souhaitez être averti, merci d’indiquer votre adresse mail</p>
                    <p><input type="email" name="email" id="email" value={guest.answer.email} placeholder="E-mail" onChange={props.onChangeEmail} /></p>   
                </div>
                {errorHtml}
            </div>
            <div className="btn">
                <button type="button" name="continue" className="next" onClick={props.onClick}>{inputButtonValue}</button>    
            </div>
        </article>
    );
}

function SecondPart(props) {
    const guest = props.guest;
    const response = props.response;
    let hebergement;

    var errorHtml = '';
    if(response.error !== '') {
        errorHtml = <p class='error-guests'>{response.error}</p>
    }

    if (guest.category > 1) {
        hebergement = (
            <div className="hebergement">
                    <p>Selon les disponibilit&eacute;s, avez-vous une pr&eacute;f&eacute;rence pour l’h&eacute;bergement ?</p>
                    <p className="choixHebergement">
                        <label htmlFor="chalet">Chalet</label> <input name="hebergement" id="chalet" type="radio" value="chalet" 
                            checked={guest.answer.hebergement === "chalet"} onChange={props.onChangeHebergement}/>
                        <label htmlFor="tente">Tente</label> <input name="hebergement" id="tente" type="radio" value="tente" 
                            checked={guest.answer.hebergement === "tente"} onChange={props.onChangeHebergement}/>
                        <label htmlFor="gite">G&icirc;te</label> <input name="hebergement" id="gite" type="radio" value="gite"
                            checked={guest.answer.hebergement === "gite"} onChange={props.onChangeHebergement}/>
                        <label htmlFor="autre">Autre</label> <input name="hebergement" id="autre" type="radio" value="autre" 
                            checked={guest.answer.hebergement === "autre"} onChange={props.onChangeHebergement}/>
                    </p>
                </div>
        );
    } else {
        hebergement = '';
    }

    const guests = guest.answer.guests;
    const listGuests = guests.map((name, index) => 
        <p key={index}><span class='name'>{name}</span><span class='delete' onClick={() => props.onClickDeleteName(index)}></span></p>
    );

    return (
        <article id="secondPart">
            <div className="content">
                <div className="guests">    
                    <div className="inputName">
                        <p>Merci d’indiquer ci-dessous le nom et pr&eacute;nom des invit&eacute;s pr&eacute;sents :</p>
                        <p><input type="text" name="guestName" id="guestName" placeholder="Nom Pr&eacute;nom" value={response.newGuestName} onChange={props.onChangeGuestName}/> <button type="button"name="addName" onClick={props.onClickAddName}>Ajouter</button></p>
                    </div>
                    <div className="tableName">
                        {listGuests}
                    </div>
                </div>
                {hebergement}
                {errorHtml}
            </div>
            <div className="btn">
                <button type="button" name="previousSecond" className="previous" onClick={props.onClickPrevious}>Pr&eacute;c&eacute;dent</button>
                <button type="button" name="next" className="next" onClick={props.onClick}>Suivant</button>  
            </div>
        </article>
    );
}

function LastPart(props) {
    const guest = props.guest;
    var errorHtml = '';
    if(props.error !== '') {
        errorHtml = <p class='error-guests'>{props.error}</p>
    }
    return (
        <article id="lastPart">
            <div className="content">
                <p>Si vous suivez un r&eacute;gime alimentaire particulier ou si vous avez des intol&eacute;rances/allergies, merci de nous le pr&eacute;ciser ci-dessous :</p>
                <p><textarea id="allergies" name="allergies" placeholder="Texte..." value={guest.answer.allergies} onChange={props.onChangeAllergies} /></p>
                <p>Si vous souhaitez nous faire parvenir un message, c’est ici :</p>
                <p><textarea id="comments" name="comments" placeholder="Texte..." value={guest.answer.message} onChange={props.onChangeMessage} /></p>
                {errorHtml}
            </div>
            <div className="btn">
                <button type="button" name="previousLast" className="previous" onClick={props.onClickPrevious}>Pr&eacute;c&eacute;dent</button>
                <button type="button" name="send" className="next" onClick={props.onClick}>Envoyer</button>
            </div>
        </article>
    );
}

function AnswerNo(props) {
    return (
        <article id="answerNo" className="answer">
            <div className="content">
                <p>Merci d’avoir répondu à l’invitation.<br/>Nous sommes tristes de ne pas vous compter parmis nous</p>
            </div>
        </article>
    );
}

function AnswerYes(props) {
    return (
        <article id="answer" className="answer">
            <div className="content">
                <p>Merci d’avoir répondu à l’invitation.<br/>En cas de changements ou de problèmes, n’hésitez pas à nous contacter<br/>Rendez-vous le 31 Août...</p>
            </div>
        </article>
    ); 
}

class Reponse extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const guest = this.props.guest;
        const response = this.props.response;

        const formParts = [
            <FirstPart guest={guest} key="firstPart" error={response.error} onClick={this.props.onClickFirstPart} onChangeYesOrNo={this.props.onChangeYesOrNo} onChangeEmail={this.props.onChangeEmail} />,
            <SecondPart guest={guest} key="secondPart" response={response} onClickPrevious={this.props.onClickPrevious} onClick={this.props.onClickSecondPart} onChangeHebergement={this.props.onChangeHebergement} onClickAddName={this.props.onClickAddName} onChangeGuestName={this.props.onChangeGuestName} onClickDeleteName={this.props.onClickDeleteName} />,
            <LastPart guest={guest} key="lastPart" error={response.error} onClickPrevious={this.props.onClickPrevious} onClick={this.props.onClickLastPart} onChangeAllergies={this.props.onChangeAllergies} onChangeMessage={this.props.onChangeMessage} />,
            <AnswerNo key="answerNo" />,
            <AnswerYes key="answerYes" />
        ];

        let formStep;
        if(guest.answer.hasAnswered === true && guest.answer.isAvailable === false) {
            formStep = 3;
        } else if(guest.answer.hasAnswered === true && guest.answer.isAvailable === true) {
            formStep = 4;
        } else {
            formStep = response.formStep;
        }

        const transitionName = (response.isAnimatedFromLeft) ? 'slide-left': 'slide-right';

        return (
            <section id="reponse">
                <div className="wrapper-title">
                    <h1>R&eacute;pondre &agrave; l'invitation</h1>
                </div>
                <form id="reponse-form" method="POST" name="reponse">
                    <div className="slider-form">
                    <CSSTransitionGroup
                        transitionName={transitionName}
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}>
                        {formParts[formStep]}
                    </CSSTransitionGroup>
                    </div>
                </form>
            </section>
        );
    }
}

export default Reponse;