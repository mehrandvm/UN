import React from 'react'
import Grid from '@material-ui/core/Grid'
import 'ol/ol.css';
import {
    Map,
    View
} from 'ol'
import {
    Tile as TileLayer,
    Image as ImageLayer,
} from 'ol/layer'
import {
    XYZ as XYZSource,
    ImageWMS as ImageWMS
} from 'ol/source'
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import OlMap from 'ol/Map';

class MapFragment extends React.Component {
    constructor(props) {
        super(props);

        this.mapDivId = `map-${Math.random()}`;

        this.map = new OlMap({
            layers: this.props.params.layers.map((layer, i) => {
                switch (layer.type) {
                    case 'tile':
                        return new TileLayer({
                            source: new XYZSource({
                                url: layer.url,
                                projection: layer.projection,
                            })
                        })
                    case 'image':
                        return new ImageLayer({
                            source: new ImageWMS({
                                url: layer.url,
                                params: layer.params,
                                serverType: layer.serverType,
                            })
                        })
                    case 'vector':
                        return new VectorLayer({
                            source: new VectorSource({
                                url: layer.url,
                                format: new GeoJSON(),
                            }),
                        });
                    default:
                        break;
                }
            }),
            view: new View({
                projection: this.props.params.view.projection,
                center: [this.props.params.view.center.x, this.props.params.view.center.y],
                zoom: this.props.params.view.zoom
            })
        });
    }

    componentDidMount() {
        this.map.setTarget(this.mapDivId);
    }

    updateLayers(updateFunc){
        updateFunc()
    }

    render() {
        const turnNationalInvisible = () => this.map.getLayers().getArray()[1].setVisible(false)
        const turnNationalVisible = () => this.map.getLayers().getArray()[1].setVisible(true)
        const turnProvinceInvisible = () => this.map.getLayers().getArray()[2].setVisible(false)
        const turnProvinceVisible = () => this.map.getLayers().getArray()[2].setVisible(true)
        const turnCountyInvisible = () => this.map.getLayers().getArray()[3].setVisible(false)
        const turnCountyVisible = () => this.map.getLayers().getArray()[3].setVisible(true)

        const disableLayers = () => {turnNationalInvisible();turnProvinceInvisible();turnCountyInvisible();}
        const switchToNationalLayers = () => {turnProvinceInvisible();turnCountyInvisible();turnNationalVisible();}
        const switchToProvinceLayers = () => {turnNationalInvisible();turnCountyInvisible();turnProvinceVisible();}
        const switchToCountyLayers = () => {turnNationalInvisible();turnProvinceVisible();turnCountyVisible();}
        const switchToVillageLayers = () => {turnNationalInvisible();turnProvinceInvisible();turnCountyVisible();}

        switch (this.props.divisionLevel) {
            case("none"):
                this.updateLayers(disableLayers)
                break;
            case("national"):
                this.updateLayers(switchToNationalLayers)
                break;
            case("province"):
                this.updateLayers(switchToProvinceLayers)
                break;
            case("county"):
                this.updateLayers(switchToCountyLayers)
                break;
            case("village"):
                this.updateLayers(switchToVillageLayers)
                break;
            default:
                break;
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    <div
                        id={this.mapDivId}
                        style={{
                            height: '400px'
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default MapFragment
