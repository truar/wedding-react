import React from 'react';
import ReactDOM from 'react-dom';
import ReactUploadFile from 'react-upload-file';

class Photo extends React.Component {
    render() {
        return (
            <section id="photo">
                <div class="wrapper-title">
                    <h1>Photos</h1>
                </div>

                <div class="content">
                    <form name="uploadPhotos" id="uploadPhoto" method="POST">
                        <p>Si vous souhaitez partager vos photos avec nous c’est ici ! <span class="little">Archive uniquement (ex : .zip)</span></p>
                        <div class="inputs">
                            <div class="upload-btn-wrapper">
                                <button class="btn">Choisissez un fichier</button>
                                <input type="file" name="inputPhoto" id="inputPhoto" />
                            </div> 
                            <button type="button" name="upload">Ajouter</button>
                        </div>
                    </form>
                    <div id="downloadPhoto">
                        <p>Photos officielles (bient&ocirc;t disponible)...</p>
                        <p><button type="button" name="download">T&eacute;l&eacute;charger</button></p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Photo;