import React from 'react';
import ReactDOM from 'react-dom';

import avion from '../css/images/icons/avion.png';
import world from '../css/images/icons/world.png';

class Contact extends React.Component {
    render() {
        return (
            <section id="contact">
                <article id="todoList" className="">
                    <h2>To Do List</h2>
                    <ul>
                        <li className="striked">Bagues</li>
                        <li className="striked">Robe</li>
                        <li>Fleurs</li>
                        <li>D&eacute;co</li>
                        <li>Quizz</li>
                    </ul>   
                </article>
                <article id="images" className="">
                    <p><img src={avion} /></p>
                    <p><img src={world} /></p>
                </article>
                <article id="coordonnees" class="content">
                    <h1>Coordonn&eacute;es</h1>
                    <p><span>Anouk POITEVIN :</span></p>
                    <ul>
                        <li class="mail">anouk.poitevin@gmail.com</li>
                        <li class="phone">06.85.28.45.72</li>
                    </ul>
                    
                    <p><span>Thibault RUARO :</span></p>
                    <ul>
                        <li class="mail">thibault.ruaro@gmail.com</li>
                        <li class="phone">06.25.56.27.53</li>
                    </ul>
                    <p><span>Adresse :</span></p>
                    <ul>
                        <li class="address">10 route du Bouchet<br/>74150 Rumilly</li>
                    </ul>
                </article>
            </section>
        );
    }
}

export default Contact;