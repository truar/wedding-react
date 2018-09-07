import React from 'react';
import ReactDOM from 'react-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import ArrowRight from '../css/images/icons/right-arrow.png';


/**
 * To be inserted inside <div id=map>
 * <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCwCq5yb7k6dnC9wC5O1v5ePAaHPds2D8"
                            loadingElement={<div style={{ height: '100%' }} />}
                            containerElement={<div style={{ height: '100%' }} />}
                            mapElement={<div style={{ height: '100%' }} />}
                            />
 */

class Sjc extends React.Component {
    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 45.304472, lng: 5.510262 }}
            >
                {props.isMarkerShown && <Marker position={{ lat: 45.304472, lng: 5.510262 }} />}
            </GoogleMap>
            ));

        return (
            <section id="sjc">
                <article>
                    <div class="wrapper-title">
                        <h1>Saint-Jean de Ch&eacute;py</h1>
                    </div>
                    <div class="wrapper-content">
                        <div class="content left">
                            <p>Adresse :</p>
                                <ul>
                                    <li class="address">Château de St-Jean de Chépy</li>
                                    <li class="address">11 Chemin du Domaine</li>
                                    <li class="address">38210 Tullins</li>
                                </ul>
                            
                            <p>A proximit&eacute; :</p>
                                <ul>
                                    <li class="address"><span className="forAlignment">Gare TGV </span><img className="arrowRight" src={ArrowRight} /> Grenoble</li>
                                    <li class="address"><span className="forAlignment">A&eacute;roport</span><img className="arrowRight" src={ArrowRight} /> Lyon-Saint-Ex</li>
                                    <li class="address"><span className="forAlignment">Autoroutes </span><img className="arrowRight" src={ArrowRight} /> A48 et A49</li>
                                </ul>
                            
                        </div>
                        <div id="map" class="content right">
                    
                        </div>
                    </div>
                </article>

                
            </section>
        );
    }
}

export default Sjc;