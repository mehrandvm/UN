import React from 'react'
import Grid from '@material-ui/core/Grid'
import 'ol/ol.css';
import {
    geom,
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
import MultiPolygon from "ol/geom/MultiPolygon";
import StageRadioGroup from "./StageRadioGroup";
import Select from "ol/interaction/Select";
import SelectPropsViewer from "./SelectPropsViewer";
import {
    style0,
    style0_alt,
    style1,
    style2,
    style3,
    style4, style_selected,
    styleDefault,
    stylePoint0,
    stylePoint1,
    stylePoint2,
    stylePoint3,
    stylePoint4,
    stylePointDefault
} from "./MapStyles";
import BingMaps from "ol/source/BingMaps";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import axiosInstance from "../../apis/AxiosConfig";

class MapFragment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectProps: {},
            bing: false
        }

        this.handleBing = this.handleBing.bind(this)

        this.mapDivId = `map-${Math.random()}`;

        this.map = new OlMap({
            layers: this.props.params.layers.map((layer, i) => {
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
                            // style: (feature) => this.getStyleBasedOnStage(feature)
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
        this.select = new Select({
            style: style_selected(),
        });
    }
//TODO: fix
    returnKhaneva(feature) {
         // let SUM_NKHANEVA = 0
         // const response = await axiosInstance.get(`/management/subdivisions/${this.props.selectedProvince.id}/child`)
         // console.log('response',response)
         // const selectedVillages = response.data.data.filter((village) => {
         //     return village.properties.F_SHAHREST === feature.get('F_SHAHREST')
         // })
         // selectedVillages.map((filteredVillage) => {
         //     SUM_NKHANEVA += filteredVillage.properties.V_NKHANEVA
         // })
         return 10000
     }

    getStyleBasedOnStage(feature) {
        if (this.props.divisionLevel === "national") {
            const SUM_Stage = feature.get(`SUM_Stage${this.props.stageNumber}`);
            if (SUM_Stage <= 2500 && SUM_Stage >= 0) {
                return style0(feature.get('province') + "\n" + SUM_Stage)
            } else if (SUM_Stage <= 10000 && SUM_Stage > 2500) {
                return style1(feature.get('province') + "\n" + SUM_Stage)
            } else if (SUM_Stage <= 20000 && SUM_Stage > 10000) {
                return style2(feature.get('province') + "\n" + SUM_Stage)
            } else if (SUM_Stage <= 30000 && SUM_Stage > 20000) {
                return style3(feature.get('province') + "\n" + SUM_Stage)
            } else if (SUM_Stage > 30000) {
                return style4(feature.get('province') + "\n" + SUM_Stage)
            } else {
                return styleDefault
            }
        } else if (this.props.divisionLevel === "province") {
            const Sum_Stage = feature.get(`Sum_stage${this.props.stageNumber}`);

            const SUM_NKHANEVA = this.returnKhaneva(feature)

            const SUM_Stage = Sum_Stage / SUM_NKHANEVA
            const percentage = parseInt(SUM_Stage * 1000, 10) / 10

            if (SUM_Stage <= 0.10 && SUM_Stage >= 0) {
                return style0_alt(feature.get('F_SHAHREST') + '\n' + percentage + "%")
            } else if (SUM_Stage <= 0.20 && SUM_Stage > 0.10) {
                return style1(feature.get('F_SHAHREST') + '\n' + percentage + "%")
            } else if (SUM_Stage <= 0.30 && SUM_Stage > 0.20) {
                return style2(feature.get('F_SHAHREST') + '\n' + percentage + "%")
            } else if (SUM_Stage <= 0.40 && SUM_Stage > 0.30) {
                return style3(feature.get('F_SHAHREST') + '\n' + percentage + "%")
            } else if (SUM_Stage > 0.40) {
                return style4(feature.get('F_SHAHREST') + '\n' + percentage + "%")
            } else {
                return styleDefault
            }
        } else if (this.props.divisionLevel === "county") {
            if (feature.getGeometry().getType() === "MultiPolygon") {
                // const SUM_Stage = feature.get(`Sum_stage${this.props.stageNumber}`);
                // if (SUM_Stage <= 625 && SUM_Stage > 0) {
                //     return style0_alt
                // } else if (SUM_Stage <= 4496 && SUM_Stage > 625) {
                //     return style1
                // } else if (SUM_Stage <= 7012 && SUM_Stage > 4496) {
                //     return style2
                // } else if (SUM_Stage <= 11361 && SUM_Stage > 7012) {
                //     return style3
                // } else if (SUM_Stage > 11361) {
                //     return style4
                return style0('')
            } else if (feature.getGeometry().getType() === "Point") {
                const stage = feature.get(`stage${this.props.stageNumber}`);
                const V_NKHANEVA = feature.get(`V_NKHANEVA`);
                const SUM_Stage = stage / V_NKHANEVA
                if (SUM_Stage <= 0.20 && SUM_Stage >= 0) {
                    return stylePoint0
                } else if (SUM_Stage <= 0.40 && SUM_Stage > 0.20) {
                    return stylePoint1
                } else if (SUM_Stage <= 0.60 && SUM_Stage > 0.40) {
                    return stylePoint2
                } else if (SUM_Stage <= 0.80 && SUM_Stage > 0.60) {
                    return stylePoint3
                } else if (SUM_Stage > 0.80) {
                    return stylePoint4
                } else {
                    return stylePointDefault
                }
            } else {
                return style0('')
            }
        } else if (this.props.divisionLevel === "village") {
            if (feature.getGeometry().getType() === "MultiPolygon") {
                // const SUM_Stage = feature.get(`Sum_stage${this.props.stageNumber}`);
                // if (SUM_Stage <= 625 && SUM_Stage > 0) {
                //     return style0_alt
                // } else if (SUM_Stage <= 4496 && SUM_Stage > 625) {
                //     return style1
                // } else if (SUM_Stage <= 7012 && SUM_Stage > 4496) {
                //     return style2
                // } else if (SUM_Stage <= 11361 && SUM_Stage > 7012) {
                //     return style3
                // } else if (SUM_Stage > 11361) {
                //     return style4
                return style0('')
            } else if (feature.getGeometry().getType() === "Point") {
                const stage = feature.get(`stage${this.props.stageNumber}`);
                const V_NKHANEVA = feature.get(`V_NKHANEVA`);
                const SUM_Stage = stage / V_NKHANEVA
                if (SUM_Stage <= 0.20 && SUM_Stage >= 0) {
                    return stylePoint0
                } else if (SUM_Stage <= 0.40 && SUM_Stage > 0.20) {
                    return stylePoint1
                } else if (SUM_Stage <= 0.60 && SUM_Stage > 0.40) {
                    return stylePoint2
                } else if (SUM_Stage <= 0.80 && SUM_Stage > 0.60) {
                    return stylePoint3
                } else if (SUM_Stage > 0.80) {
                    return stylePoint4
                } else {
                    return stylePointDefault
                }
            } else {
                return style0('')
            }
        }
    }

    componentDidMount() {
        this.map.setTarget(this.mapDivId);
        this.map.addInteraction(this.select);
        this.select.on('select', (e) => {
            if (e.target.getFeatures().getArray()[0].getProperties()) {
                const selectProps = e.target.getFeatures().getArray()[0].getProperties()
                this.setState({selectProps: selectProps})
            }
        })
        this.turnBingInvisible()
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.divisionLevel !== newProps.divisionLevel) {
            this.updateView()
        }
    }

    updateView() {
        switch (this.props.divisionLevel) {
            case("national"):
                this.map.getView().animate({center: [53.6880, 32.4279]}, {zoom: 5})
                break;
            case("province"):
                const poly = new MultiPolygon(this.props.selectedProvinceLayer.geometry.coordinates)
                this.map.getView().fit(poly.getExtent(),
                    {padding: [10, 10, 10, 10]})
                break;
            case("county"):
                const poly2 = new MultiPolygon(this.props.selectedCountyLayer.geometry.coordinates)
                this.map.getView().fit(poly2.getExtent(),
                    {padding: [10, 10, 10, 10]})
                break;
            case("village"):
                const center = this.props.selectedVillageLayer.geometry.coordinates
                this.map.getView().animate({center: center}, {zoom: 13})
                break;
            default:
                break;
        }
    }

    updateAllLayersStyle() {
        const updateStyle = (feature) => this.getStyleBasedOnStage(feature)
        if (this.props.divisionLevel === "national") {
            this.map.getLayers().getArray()[2].setStyle(updateStyle)
        } else if (this.props.divisionLevel === "province") {
            this.map.getLayers().getArray()[3].setStyle(updateStyle)
        } else if (this.props.divisionLevel === "county") {
            this.map.getLayers().getArray()[3].setStyle(updateStyle)
            this.map.getLayers().getArray()[4].setStyle(updateStyle)
        } else if (this.props.divisionLevel === "village") {
            this.map.getLayers().getArray()[3].setStyle(updateStyle)
            this.map.getLayers().getArray()[4].setStyle(updateStyle)
        }
    }

    turnBingInvisible() {
        this.map.getLayers().getArray()[1].setVisible(false)
    }

    turnBingVisible() {
        this.map.getLayers().getArray()[1].setVisible(true)
    }

    turnNationalInvisible() {
        this.map.getLayers().getArray()[2].setVisible(false)
    }

    turnNationalVisible() {
        this.map.getLayers().getArray()[2].setVisible(true)
    }

    turnProvinceInvisible() {
        this.map.getLayers().getArray()[3].setVisible(false)
    }

    turnProvinceVisible() {
        this.map.getLayers().getArray()[3].setVisible(true)
    }

    turnCountyInvisible() {
        this.map.getLayers().getArray()[4].setVisible(false)
    }

    turnCountyVisible() {
        this.map.getLayers().getArray()[4].setVisible(true)
    }

    turnFloodVisible() {
        this.map.getLayers().getArray()[5].setOpacity(0.6)
    }

    turnFloodInVisible() {
        this.map.getLayers().getArray()[5].setOpacity(0)
    }

    turnSeismicVisible() {
        this.map.getLayers().getArray()[6].setOpacity(0.6)
    }

    turnSeismicInVisible() {
        this.map.getLayers().getArray()[6].setOpacity(0)
    }

    handleHazards() {
        if (this.props.mapHazards === "floodHazard") {
            this.turnFloodVisible()
        } else {
            this.turnFloodInVisible()
        }
        if (this.props.mapHazards === "seismicHazard") {
            this.turnSeismicVisible()
        } else {
            this.turnSeismicInVisible()
        }
    }

    switchToNationalLayers() {
        this.turnProvinceInvisible();
        this.turnCountyInvisible();
        if (this.props.dashboardAccessLevel === 'national') {
            this.turnNationalVisible();
        } else {
            this.turnNationalInvisible();
        }
    }

    switchToProvinceLayers() {
        this.turnNationalInvisible();
        this.turnCountyInvisible();
        this.turnProvinceVisible();
    }

    switchToCountyLayers() {
        this.turnNationalInvisible();
        this.turnProvinceVisible();
        this.turnCountyVisible();
    }

    switchToVillageLayers() {
        this.turnNationalInvisible();
        this.turnProvinceInvisible();
        this.turnCountyVisible();
    }

    handleBing() {
        if (this.state.bing) {
            this.setState({bing: false})
            this.turnBingInvisible()
        } else {
            this.setState({bing: true})
            this.turnBingVisible()
        }
    }

    render() {
        switch (this.props.divisionLevel) {
            case("national"):
                this.switchToNationalLayers()
                break;
            case("province"):
                this.switchToProvinceLayers()
                break;
            case("county"):
                this.switchToCountyLayers()
                break;
            case("village"):
                this.switchToVillageLayers()
                break;
            default:
                break;
        }
        this.handleHazards()
        this.updateAllLayersStyle()

        return (
            <Grid container>
                <Grid item xs={12} style={{position: 'relative'}}>
                    <div
                        id={this.mapDivId}
                        style={{
                            height: '400px'
                        }}
                    />
                    <div style={{position: 'absolute', bottom: 0, right: 0}}>
                        <SelectPropsViewer selectProps={this.state.selectProps}
                                           divisionLevel={this.props.divisionLevel}/>
                    </div>
                    <div style={{position: 'absolute', bottom: 0, left: 0}}>
                        <StageRadioGroup stageNumber={this.props.stageNumber}
                                         setStageNumber={this.props.setStageNumber}/>
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgb(255,255,255,0.6)',
                        borderRadius: 10,
                        margin: 5,
                    }}>
                        <Switch checked={this.state.bing} onChange={this.handleBing}/>
                        <Typography style={{fontSize: '0.775rem'}}>{this.state.bing ? 'BING' : 'OSM'}</Typography>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default MapFragment
