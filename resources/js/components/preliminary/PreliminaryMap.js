import React, {useState} from 'react'
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
import MultiPolygon from "ol/geom/MultiPolygon";
import Circle from "ol/geom/Circle";
import {getPointResolution} from "ol/proj";
import ScaleLine from "ol/control/ScaleLine";
import {defaults} from "ol/control";
import {
    style0,
    style2,
    style3,
    style4,
    styleCircle0,
    styleCircle1,
    styleCircle2,
    styleCircle3,
    styleCircle4,
    styleCircle5, styleCircle_Selected,
    stylePoint0,
    stylePoint1, stylePoint2, stylePoint3, stylePoint4, stylePoint_selected, stylePointDefault
} from "../map/MapStyles";
import FormTextField from "../form-textfield/FormTextField";
import Button from "@material-ui/core/Button";
import {getIntersection} from "ol/extent";
import {
    validateConfirmPassword, validateCoordinateX, validateCoordinateY,
    validateEmail,
    validateFirstName,
    validateLastName, validatePassword,
    validatePhoneNumber, validateRole,
    validateUserName
} from "../../utils/validations/Validation";
import BarChart from "../charts/BarChart";
import {withSnackbar} from "notistack";

const params = {
    'layers': [
        {
            'type': 'tile',
            'url': 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'projection': 'EPSG:3857',
        },
        {
            'type': 'vector',
            'url': 'http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AK_Villages&outputFormat=application%2Fjson',
        },
    ],
    'view': {
        'projection': 'EPSG:4326',
        'center': {
            'x': 53.6880,
            'y': 32.4279,
        },
        'zoom': '5',
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

class PreliminaryMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incidentName: "",
            coordinateX: 46.5,
            coordinateY: 34.5,
            incidentNameError: "",
            coordinateXError: "",
            coordinateYError: "",
            chartData: [],
            chartBehdashtData: [],
            chartMudData: [],
            chartMasonaryData: [],

        }
        this.submitIncident = this.submitIncident.bind(this);
        this.handleChangeX = this.handleChangeX.bind(this);
        this.handleChangeY = this.handleChangeY.bind(this);
        this.handleChangeIncidentName = this.handleChangeIncidentName.bind(this);
        this.checkIncident = this.checkIncident.bind(this);

        this.mapDivId = `map-${Math.random()}`;

        this.map = new OlMap({
            controls: defaults().extend([scaleControl()]),
            layers: params.layers.map((layer, i) => {
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

    handleChangeIncidentName(e) {
        const target = e.target
        this.setState({incidentName: target.value})
    }

    handleChangeX(e) {
        const target = e.target
        this.setState({coordinateX: target.value})
    }

    handleChangeY(e) {
        const target = e.target
        this.setState({coordinateY: target.value})
    }

    validateInputs() {
        this.setState(
            {
                coordinateXError: validateCoordinateX(this.state.coordinateX),
                coordinateYError: validateCoordinateY(this.state.coordinateY),
                incidentNameError: validateFirstName(this.state.incidentName),
            },
        )
        if (validateCoordinateX(this.state.coordinateX)) {
            this.props.enqueueSnackbar(validateCoordinateX(this.state.coordinateX), {variant: "error"})
        }
        if (validateCoordinateY(this.state.coordinateY)) {
            this.props.enqueueSnackbar(validateCoordinateY(this.state.coordinateY), {variant: "error"})
        }
        if (validateFirstName(this.state.incidentName)) {
            this.props.enqueueSnackbar(validateFirstName(this.state.incidentName), {variant: "error"})
        }
        return !(validateCoordinateX(this.state.coordinateX) || validateCoordinateY(this.state.coordinateY)
            || validateFirstName(this.state.incidentName));
    }

    submitIncident() {
        this.checkIncident()
    }

    checkIncident() {
        if (!this.validateInputs()) {
            return
        }
        this.map.getLayers().getArray()[2].getSource().clear()
        const coordinate = [parseFloat(this.state.coordinateX), parseFloat(this.state.coordinateY)]
        const dist = 0.01 // getPointResolution('EPSG:3857', 1, coordinate)
        // console.log(getPointResolution('EPSG:3857', 1, coordinate))
        const feature50 = new Feature(new Circle(coordinate, dist * 50))
        const feature20 = new Feature(new Circle(coordinate, dist * 20))
        const feature10 = new Feature(new Circle(coordinate, dist * 10))
        const feature7_5 = new Feature(new Circle(coordinate, dist * 7.5))
        const feature5 = new Feature(new Circle(coordinate, dist * 5))
        const feature2_5 = new Feature(new Circle(coordinate, dist * 2.5))
        feature50.setStyle(styleCircle5())
        feature20.setStyle(styleCircle4())
        feature10.setStyle(styleCircle3())
        feature7_5.setStyle(styleCircle2())
        feature5.setStyle(styleCircle1())
        feature2_5.setStyle(styleCircle0())
        this.map.getLayers().getArray()[2].getSource().addFeature(feature50);
        this.map.getLayers().getArray()[2].getSource().addFeature(feature20);
        this.map.getLayers().getArray()[2].getSource().addFeature(feature10);
        this.map.getLayers().getArray()[2].getSource().addFeature(feature7_5);
        this.map.getLayers().getArray()[2].getSource().addFeature(feature5);
        this.map.getLayers().getArray()[2].getSource().addFeature(feature2_5);
        const feature50Geometry = feature50.getGeometry()
        const feature20Geometry = feature20.getGeometry()
        const feature10Geometry = feature10.getGeometry()
        const feature7_5Geometry = feature7_5.getGeometry()
        const feature5Geometry = feature5.getGeometry()
        const feature2_5Geometry = feature2_5.getGeometry()
        this.map.getView().fit(feature50Geometry)
        const features50KM = this.map.getLayers().getArray()[1].getSource().getFeatures().filter((feature, i) => {
            return feature50Geometry.intersectsExtent(feature.getGeometry().getExtent())
        })
        const features20KM = features50KM.filter((feature, i) => {
            return feature20Geometry.intersectsExtent(feature.getGeometry().getExtent())
        })
        const features10KM = features20KM.filter((feature, i) => {
            return feature10Geometry.intersectsExtent(feature.getGeometry().getExtent())
        })
        const features7_5KM = features10KM.filter((feature, i) => {
            return feature7_5Geometry.intersectsExtent(feature.getGeometry().getExtent())
        })
        const features5KM = features7_5KM.filter((feature, i) => {
            return feature5Geometry.intersectsExtent(feature.getGeometry().getExtent())
        })
        const features2_5KM = features5KM.filter((feature, i) => {
            return feature2_5Geometry.intersectsExtent(feature.getGeometry().getExtent())
        })
        this.setState({
            chartData: [
                this.getFamilyCountOfFeature(features2_5KM)[0],
                this.getFamilyCountOfFeature(features5KM)[0],
                this.getFamilyCountOfFeature(features7_5KM)[0],
                this.getFamilyCountOfFeature(features10KM)[0],
                this.getFamilyCountOfFeature(features20KM)[0],
                this.getFamilyCountOfFeature(features50KM)[0],
            ],
            chartBehdashtData: [
                this.getFamilyCountOfFeature(features2_5KM)[1],
                this.getFamilyCountOfFeature(features5KM)[1],
                this.getFamilyCountOfFeature(features7_5KM)[1],
                this.getFamilyCountOfFeature(features10KM)[1],
                this.getFamilyCountOfFeature(features20KM)[1],
                this.getFamilyCountOfFeature(features50KM)[1],
            ],
            chartMudData: [
                this.getFamilyCountOfFeature(features2_5KM)[2],
                this.getFamilyCountOfFeature(features5KM)[2],
                this.getFamilyCountOfFeature(features7_5KM)[2],
                this.getFamilyCountOfFeature(features10KM)[2],
                this.getFamilyCountOfFeature(features20KM)[2],
                this.getFamilyCountOfFeature(features50KM)[2],
            ],
            chartMasonaryData: [
                this.getFamilyCountOfFeature(features2_5KM)[3],
                this.getFamilyCountOfFeature(features5KM)[3],
                this.getFamilyCountOfFeature(features7_5KM)[3],
                this.getFamilyCountOfFeature(features10KM)[3],
                this.getFamilyCountOfFeature(features20KM)[3],
                this.getFamilyCountOfFeature(features50KM)[3],
            ],
        })
    }

    getFamilyCountOfFeature(features) {
        let sum = 0
        let sumBehdasht = 0
        let sumMud = 0
        let sumMasonary = 0
        features.map((feature, i) => {
            if (feature.get('V_BEHDASHY') === "+") {
                sumBehdasht++
            }
            sum += feature.get('V_NKHANEVA')
        })
        return [sum, sumBehdasht, sumMud, sumMasonary]
    }

    componentDidMount() {
        this.map.setTarget(this.mapDivId);
        this.map.addLayer(new VectorLayer({
            source: new VectorSource(),
        }))
    }

    render() {
        const chartData = {
            'type': 'bar',
            'labels': [
                '2.5', '5', '7.5', '10', '20', '50',
            ],
            'datasets': {
                'Family count in incident radius': this.state.chartData
            },
            'theme': 0,
        }
        const chartBehdashtData = {
            'type': 'bar',
            'labels': [
                '2.5', '5', '7.5', '10', '20', '50',
            ],
            'datasets': {
                'Family count per medical center in incident radius': this.state.chartBehdashtData
            },
            'theme': 1,
        }
        const chartMudMasonaryData = {
            'type': 'bar',
            'labels': [
                '2.5', '5', '7.5', '10', '20', '50',
            ],
            'datasets': {
                'Mud': this.state.chartMudData,
                'Masonary': this.state.chartMasonaryData,
            },
            'theme': 2,
        }
        this.updateAllLayersStyle()
        return (
            <Grid container spacing={2}>
                <Grid item container xs={12} sm={8}
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
                    <Grid item xs={4}>
                        <FormTextField
                            value={this.state.incidentName}
                            onChange={this.handleChangeIncidentName}
                            error={!!this.state.incidentNameError}
                            errorMessage={""}
                            variant="outlined"
                            margin="normal"
                            label={'incidentName'}
                            name="incidentName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormTextField
                            value={this.state.coordinateX}
                            onChange={this.handleChangeX}
                            error={!!this.state.coordinateXError}
                            errorMessage={""}
                            variant="outlined"
                            margin="normal"
                            label={'coordinateX'}
                            name="coordinateX"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormTextField
                            value={this.state.coordinateY}
                            onChange={this.handleChangeY}
                            error={!!this.state.coordinateYError}
                            errorMessage={""}
                            variant="outlined"
                            margin="normal"
                            label={'coordinateY'}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={this.checkIncident} variant={"outlined"} color={"primary"}
                                style={{width: '100%', height: 56}}>
                            Show Coordinates
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={this.submitIncident} variant={"contained"} color={"primary"}
                                style={{width: '100%', height: 56}}>
                            Confirm Incident
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4} style={{position: 'relative'}}>
                    <BarChart data={chartData} isLog={true}/>
                    <BarChart data={chartBehdashtData} isLog={true}/>
                    <BarChart data={chartMudMasonaryData} isLog={true}/>
                </Grid>
            </Grid>
        )
    }
}

export default withSnackbar(PreliminaryMap)
