import React, {useContext, useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from "@material-ui/core/IconButton";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";

const useStyles = (language) => makeStyles(theme => ({
    container: {
        backgroundColor: 'rgb(255,255,255,0.6)',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        maxWidth: 200,
        flexWrap: 'wrap',
        textAlign: language === 'en' ? 'right' : 'left',
    },
    text: {
        padding: 2
    },
}));

const SelectPropsViewer = (props) => {
    const {selectProps, divisionLevel} = props
    const [data, setData] = useState({})
    const language = useContext(LanguageContext).language
    const classes = useStyles(language)()
    useEffect(() => {
        let preData = {}
        if (Object.keys(selectProps).length !== 0 ) {
            if (divisionLevel === 'national') {
                preData = {
                    province: selectProps.province,
                    SUM_Stage1: selectProps.SUM_Stage1,
                    SUM_Stage2: selectProps.SUM_Stage2,
                    SUM_Stage3: selectProps.SUM_Stage3,
                    SUM_Stage4: selectProps.SUM_Stage4,
                }
            } else if (divisionLevel === 'province') {
                preData = {
                    SHAHRESTAN: selectProps.SHAHRESTAN,
                    Sum_stage1: selectProps.Sum_stage1,
                    Sum_stage2: selectProps.Sum_stage2,
                    Sum_stage3: selectProps.Sum_stage3,
                    Sum_stage4: selectProps.Sum_stage4,
                }
            } else if (divisionLevel === 'county') {
                if (selectProps.stage1) {
                    preData = {
                        V_ABADI: selectProps.V_ABADI,
                        stage1: selectProps.stage1,
                        stage2: selectProps.stage2,
                        stage3: selectProps.stage3,
                        stage4: selectProps.stage4,
                    }
                } else {
                    preData = {
                        SHAHRESTAN: selectProps.SHAHRESTAN,
                        Sum_stage1: selectProps.Sum_stage1,
                        Sum_stage2: selectProps.Sum_stage2,
                        Sum_stage3: selectProps.Sum_stage3,
                        Sum_stage4: selectProps.Sum_stage4,
                    }
                }
            } else if (divisionLevel === 'village') {
                preData = {
                    V_ABADI: selectProps.V_ABADI,
                    stage1: selectProps.stage1,
                    stage2: selectProps.stage2,
                    stage3: selectProps.stage3,
                    stage4: selectProps.stage4,
                }
            }
        }
        setData(preData)
    }, [props.selectProps])
    return (Object.keys(data).length !== 0 ?
            <div className={classes.container}>
                <IconButton onClick={() => setData({})} size={'small'}><HighlightOffIcon/></IconButton>
                {Object.keys(data).map((selectProp, i) => {
                    return <div key={i} className={classes.text}>{`${selectProp}:${Object.values(data)[i]}`}</div>
                })
                }</div> : null
    )
}

export default SelectPropsViewer
