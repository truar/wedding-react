import React from 'react';
import ReactDOM from 'react-dom';

class Hebergement extends React.Component {
    render() {
        return (
            <section id="hebergement">
                <div class="wrapper-title">
                    <h1>H&eacute;b&eacute;rgement</h1>
                </div>
                <article id="chalet">
                    <h2>Chalets</h2>
                    <div class="content">
                        <p class="left">Sur place</p>
                        <p class="right">Prix pour la nuit : 35&euro;/pers.</p>
                    </div>
                    <div class="content">
                        <p class="left">Places limitées</p>
                        <p class="right">Capacité : 7 personnes</p>
                    </div>
                </article>
                <article id="tentes">
                    <h2>Tentes*</h2>
                    <div class="content">
                        <p class="left">Sur place</p>
                        <p class="right">Prix pour la nuit : gratuit</p>
                    </div>
                    <div class="content">
                        <p class="left">Places limitées</p>
                        <p class="right">*mat&eacute;riel non fourni pas les mari&eacute;s</p>
                    </div>
                </article>
                <article id="gites">
                    <h2>Gites</h2>
                    <div class="content">
                        <p class="left">Aux alentours</p>
                        <p class="right">Prix pour la nuit : 35&euro;/pers.*</p>
                    </div>
                    <div class="content">
                        <p class="left">&Agrave; r&eacute;server</p>
                        <p class="right">*prix moyen</p>
                    </div>
                </article>
            </section>
        );
    }
}

export default Hebergement;