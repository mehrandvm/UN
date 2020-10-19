import React from 'react'
import Grid from '@material-ui/core/Grid'
import 'ol/ol.css';
import {
    Feature,
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
import Circle from "ol/geom/Circle";
import ScaleLine from "ol/control/ScaleLine";
import {defaults} from "ol/control";
import {
    style0,
    stylePointDefault
} from "../map/MapStyles";
import {withSnackbar} from "notistack";
import BingMaps from "ol/source/BingMaps";

const params = {
    'layers': [
        {
            'type': 'bing',
        },
        {
            'type': 'vector',
            'url': 'http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AK_Building&outputFormat=application%2Fjson',
        },
    ],
    'view': {
        'projection': 'EPSG:4326',
        'center': {
            'x': 46.8423,
            'y': 34.4390,
        },
        'zoom': '8',
    },
}
const scaleControl = () => {
    let control
    let scaleType = 'scaleline';
    let scaleBarSteps = 4;
    let scaleBarText = true;
    if (scaleType === 'scaleline') {
        control = new ScaleLine({
            units: 'metric',
        });
        return control;
    }
    control = new ScaleLine({
        units: 'metric',
        bar: true,
        steps: scaleBarSteps,
        text: scaleBarText,
        minWidth: 140,
    });
    return control;
}

class BuildingMap extends React.Component {
    constructor(props) {
        super(props);
        this.adjustView = this.adjustView.bind(this)

        this.mapDivId = `map-${Math.random()}`;
        this.map = new OlMap({
            controls: defaults().extend([scaleControl()]),
            layers: params.layers.map((layer, i) => {
                switch (layer.type) {
                    case 'bing':
                        return new TileLayer({
                            visible: true,
                            preload: Infinity,
                            source: new BingMaps({
                                key: 'AttITYV-ApYhO6ybaJqUl5_Ik6_gDupG_YurVNVctA27KN_aISvmqU6c1usHIoD2',
                                imagerySet: 'AerialWithLabelsOnDemand',
                                // use maxZoom 19 to see stretched tiles instead of the BingMaps
                                // "no photos at this zoom level" tiles
                                maxZoom: 19
                            }),
                        })
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
                projection: params.view.projection,
                center: [params.view.center.x, params.view.center.y],
                zoom: params.view.zoom
            })
        });
    }


    getStyleBasedOnStage(feature) {
        if (feature.getGeometry().getType() === "Point") {
            return stylePointDefault
        } else {
            return style0('')
        }
    }

    updateAllLayersStyle() {
        const updateStyle = (feature) => this.getStyleBasedOnStage(feature)
        this.map.getLayers().getArray()[1].setStyle(updateStyle)
    }

    adjustView() {
        if (this.props.subdivision === 'ازگله') {
            this.map.getView().animate({center: [45.8420, 34.8327]}, {zoom: 16})
        } else if (this.props.subdivision === 'دره ژاله سفلي') {
            this.map.getView().animate({center: [45.8358, 34.8059]}, {zoom: 16})
        }
    }

    componentDidMount() {
        this.map.setTarget(this.mapDivId);
        this.map.addLayer(new VectorLayer({
            source: new VectorSource(),
        }))
    }

    render() {
        this.updateAllLayersStyle()
        this.adjustView()
        return (
            <Grid container spacing={2}>
                <Grid item container xs={12}
                      style={{position: 'relative'}}
                      alignItems={'center'}
                      direction="row"
                      justify="center"
                >
                    <Grid item xs={12}>
                        <div
                            id={this.mapDivId}
                            style={{
                                height: '400px'
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withSnackbar(BuildingMap)
