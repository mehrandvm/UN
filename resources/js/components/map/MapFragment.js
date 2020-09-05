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

class MapFragment extends React.Component {
    constructor(props) {
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this)
    }

    updateDimensions() {
        const h = window.innerHeight * this.props.height
        this.setState({height: h})
    }

    componentWillMount() {
        window.addEventListener('resize', this.updateDimensions)
        this.updateDimensions()
    }

    componentDidMount() {
        console.log(this.props)
        const map = new Map({
            target: 'map',
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
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    render() {
        const style = {
            width: '100%',
            height: this.state.height,
            backgroundColor: '#cccccc',
        }
        return (
            <Grid container>
                <Grid item xs={12}>
                    <div id='map' style={style}/>
                </Grid>
            </Grid>
        )
    }
}

export default MapFragment
