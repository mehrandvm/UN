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
    styleCircle0,
    styleCircle1,
    styleCircle2,
    styleCircle3,
    styleCircle4,
    styleCircle5,
    stylePointDefault
} from "../map/MapStyles";
import FormTextField from "../form-textfield/FormTextField";
import Button from "@material-ui/core/Button";
import {
  validateCoordinateX,
  validateCoordinateY,
  validateIncidentName,
} from "../../utils/validations/Validation";
import BarChart from "../charts/BarChart";
import {withSnackbar} from "notistack";
import axiosInstance from "../../apis/AxiosConfig";
import CircularProgress from "@material-ui/core/CircularProgress";
import BingMaps from "ol/source/BingMaps";

const params = {
    'layers': [
        {
            'type': 'bing',
        },
        {
            'type': 'vector',
            'url': 'http://194.5.188.215:8080/geoserver/UN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=UN%3AK_Villages&outputFormat=application%2Fjson',
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

class PreliminaryMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incidentName: "",
            coordinateX: "",
            coordinateY: "",
            incidentNameError: "",
            coordinateXError: "",
            coordinateYError: "",
            chartData: [],
            chartBehdashtData: [],
            chartMudData: [],
            chartMasonaryData: [],
            chartSteelData: [],
            chartConcreteData: [],
            isSendingReq: false,

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
                incidentNameError: validateIncidentName(this.state.incidentName),
            },
        )
        if (validateCoordinateX(this.state.coordinateX)) {
            this.props.enqueueSnackbar(validateCoordinateX(this.state.coordinateX), {variant: "error"})
        }
        if (validateCoordinateY(this.state.coordinateY)) {
            this.props.enqueueSnackbar(validateCoordinateY(this.state.coordinateY), {variant: "error"})
        }
        if (validateIncidentName(this.state.incidentName)) {
            this.props.enqueueSnackbar(validateIncidentName(this.state.incidentName), {variant: "error"})
        }
        return !(validateCoordinateX(this.state.coordinateX) || validateCoordinateY(this.state.coordinateY)
            || validateIncidentName(this.state.incidentName));
    }

    submitIncident() {
        this.setState({isSendingReq: true})
        this.checkIncident()
        const {incidentName, coordinateX, coordinateY} = this.state
        const data = {
            name: incidentName,
            lat: coordinateY,
            long: coordinateX,
        }
        axiosInstance.post('/analysis/incident', data).then((res) => {
            this.props.enqueueSnackbar('Incident posted successfully', {variant: 'success'})
            this.setState({isSendingReq: false})
        }).catch((e)=> {
            console.error(e)
            this.props.enqueueSnackbar('Couldn\'t post incident', {variant: 'error'})
            this.setState({isSendingReq: false})
        })
    }

    checkIncident(coordinateX, coordinateY, mode) {
        if (mode !== 'click') {
            if (!this.validateInputs()) {
                return
            }
        } else {
            this.setState({coordinateX, coordinateY})
        }
        this.map.getLayers().getArray()[2].getSource().clear()
        const coordinate = [parseFloat(coordinateX), parseFloat(coordinateY)]
        const dist = 0.01
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
        if (mode !== 'click') {
            this.map.getView().fit(feature50Geometry)
        }
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
            chartSteelData: [
                this.getFamilyCountOfFeature(features2_5KM)[4],
                this.getFamilyCountOfFeature(features5KM)[4],
                this.getFamilyCountOfFeature(features7_5KM)[4],
                this.getFamilyCountOfFeature(features10KM)[4],
                this.getFamilyCountOfFeature(features20KM)[4],
                this.getFamilyCountOfFeature(features50KM)[4],
            ],
            chartConcreteData: [
                this.getFamilyCountOfFeature(features2_5KM)[4],
                this.getFamilyCountOfFeature(features5KM)[4],
                this.getFamilyCountOfFeature(features7_5KM)[4],
                this.getFamilyCountOfFeature(features10KM)[4],
                this.getFamilyCountOfFeature(features20KM)[4],
                this.getFamilyCountOfFeature(features50KM)[4],
            ],
        })
    }

    getFamilyCountOfFeature(features) {
        let sum = 0
        let sumBehdasht = 0
        let sumMud = 0
        let sumMasonary = 0
        let sumSteel = 0
        let sumConcrete = 0
        features.map((feature, i) => {
            if (feature.get('V_BEHDASHY') === "+") {
                sumBehdasht++
            }
            if (feature.get('OtherMason')) {
                sumMud+=feature.get('OtherMason')
            }
            if (feature.get('AdobeMason')) {
                sumMasonary+=feature.get('AdobeMason')
            }
            if (feature.get('Steel')) {
                sumSteel+=feature.get('Steel')
            }
            if (feature.get('Concrete')) {
                sumConcrete+=feature.get('Concrete')
            }
            sum += feature.get('V_NKHANEVA')
        })
        return [sum, sumBehdasht, sumMud, sumMasonary, sumSteel, sumConcrete]
    }

    componentDidMount() {
        const parent = this
        parent.map.setTarget(this.mapDivId);
        parent.map.addLayer(new VectorLayer({
            source: new VectorSource(),
        }))
        parent.map.on('singleclick',  (evt) => {
            const coordinate = evt.coordinate;
            parent.checkIncident(coordinate[0],coordinate[1],'click')
        })
    }

    render() {
        const vocabs = this.props.vocabs
        const returnChartDataset = () => {
            let dataset = {}
            dataset[vocabs('household-in-radius')] = this.state.chartData
            return dataset
        }
        const chartData = {
            'type': 'bar',
            'labels': [
                '2.5', '5', '7.5', '10', '20', '50',
            ],
            'datasets': returnChartDataset(),
            'theme': 0,
        }
        const returnChartBehdashtDataset = () => {
            let dataset = {}
            dataset[vocabs('household-per-medical-center')] = this.state.chartBehdashtData
            return dataset
        }
        const chartBehdashtData = {
            'type': 'bar',
            'labels': [
                '2.5', '5', '7.5', '10', '20', '50',
            ],
            'datasets': returnChartBehdashtDataset(),
            'theme': 1,
        }
        const returnChartMudMasonaryDataset = () => {
            let dataset = {}
            dataset[vocabs('adobe-masonry')] = this.state.chartMudData
            dataset[vocabs('other-masonry')] = this.state.chartMasonaryData
            dataset[vocabs('steel')] = this.state.chartSteelData
            dataset[vocabs('concrete')] = this.state.chartConcreteData
            return dataset
        }
        const chartMudMasonaryData = {
            'type': 'bar',
            'labels': [
                '2.5', '5', '7.5', '10', '20', '50',
            ],
            'datasets': returnChartMudMasonaryDataset(),
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
                    <Grid item xs={4} style={{padding: 5}}>
                        <FormTextField
                            value={this.state.incidentName}
                            onChange={this.handleChangeIncidentName}
                            error={!!this.state.incidentNameError}
                            errorMessage={""}
                            variant="outlined"
                            margin="normal"
                            label={vocabs('incident-name')}
                            name="incidentName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={4} style={{padding: 5}}>
                        <FormTextField
                            value={this.state.coordinateX}
                            onChange={this.handleChangeX}
                            error={!!this.state.coordinateXError}
                            errorMessage={""}
                            variant="outlined"
                            margin="normal"
                            label={vocabs('coordinate-x')}
                            name="coordinateX"
                        />
                    </Grid>
                    <Grid item xs={4} style={{padding: 5}}>
                        <FormTextField
                            value={this.state.coordinateY}
                            onChange={this.handleChangeY}
                            error={!!this.state.coordinateYError}
                            errorMessage={""}
                            variant="outlined"
                            margin="normal"
                            label={vocabs('coordinate-y')}
                        />
                    </Grid>
                    <Grid item xs={6} style={{padding: 5}}>
                        <Button onClick={() => this.checkIncident(this.state.coordinateX, this.state.coordinateY, 'form')} variant={"outlined"} color={"primary"}
                                style={{width: '100%', height: 56}}>
                            {vocabs('show-coordinates')}
                        </Button>
                    </Grid>
                    <Grid item xs={6} style={{padding: 5}}>
                        <Button onClick={this.submitIncident} variant={"contained"} color={"primary"}
                                style={{width: '100%', height: 56}}>
                            {this.state.isSendingReq ? <CircularProgress color="inherit" size={20}/> : vocabs('confirm-incident')}
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
