import React, {FC, useContext} from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import IRANSans from '../../../fonts/ttf/IRANSansWeb(FaNum).ttf'
import {Document, Font, Page, Text, View, StyleSheet, Image} from "@react-pdf/renderer";
import bonyad from '../../../images/bonyad.jpg'

const useStyles = (theme) => StyleSheet.create({
    main: {
        margin: '5%',
        fontFamily: 'IRANSans',
        fontSize: 14,
        direction: 'rtl',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        width: '100%',
    },
    tableRow: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row-reverse',
        flexGrow: 1,
    },
    tableData: {
        textAlign: 'right',
        lineHeight: '1rem'
    },
    tableSubData: {
        textAlign: 'left',
        lineHeight: '1rem'
    },
    tableTH: {
        color: theme.palette.text.primary,
        padding: '7px 16px 7px 16px',
        textAlign: 'right',
    },
    tableHeader: {
        flex: 1,
        flexDirection: 'row-reverse',
        flexGrow: 1,
        // backgroundColor: '#e9e9e9',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #e0e0e0',
    },
    loading: {
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    indexTd: {
        padding: 0,
        width: 30,
    },
    userInfo: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    padding: {
        paddingTop: 70,
    },
    padding2: {
        paddingTop: 20,
    }
});

Font.register({family: 'IRANSans', src: IRANSans, format: 'truetype'});
Font.registerHyphenationCallback((word) => [word]);
const BankLetter = (props) => {
    const {melliNumber, caseNumber, loanNumber} = props.letterData
    const classes = useStyles(useTheme());
    const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const returnTextOne = () => {
        const melliCode = melliNumber.split('').reverse().join('')
        const caseCode = caseNumber.split('').reverse().join('')
        return `بدینوسیله آقای امیرحسین دانشور معین به کد ملی ${melliCode} به شماره پرونده ${caseCode}`
    }
    const returnTextTwo = () => {
        const loanAmount = numberWithCommas(loanNumber.split('').reverse().join(''))
        return `جهت دریافت وام مرحله یک به مبلغ ${loanAmount} ریال معرفی می شود.`
    }
    return (
        <Document>
            <Page>
                <View style={classes.main}>
                    <View style={classes.tableHeader}>
                        <View style={[classes.tableTH, {width: '15%'}]}>
                            <Image src={bonyad}/>
                        </View>
                        <View style={[classes.title, {width: '70%'}]}>
                            <Text>{('بسمه تعالی')}</Text>
                        </View>
                        <View style={[classes.tableTH, {width: '15%'}]}>
                            <Text>{('')}</Text>
                        </View>
                    </View>
                    <View style={classes.padding}>
                        <Text>{('')}</Text>
                    </View>
                    <View style={classes.tableData}>
                        <Text>{('بانک محترم مسکن')}</Text>
                    </View>
                    <View style={classes.tableData}>
                        <Text>{('با سلام')}</Text>
                    </View>
                    <View style={classes.padding2}>
                        <Text>{('')}</Text>
                    </View>
                    <View style={classes.tableData}>
                        <Text>{returnTextOne()}</Text>
                    </View>
                    <View style={classes.tableData}>
                        <Text>{returnTextTwo()}</Text>
                    </View>
                    <View style={classes.tableData}>
                        <Text>{(' خواهشمند است اقدام متقضی را مبذول فرمایید.')}</Text>
                    </View>
                    <View style={classes.padding2}>
                        <Text>{('')}</Text>
                    </View>
                    <View style={classes.tableSubData}>
                        <Text>{('رییس ستاد معین کرمانشاه')}</Text>
                    </View>
                    <View style={classes.tableSubData}>
                        <Text>{('محمد مهدی محمودیان')}</Text>
                    </View>
                    <View style={classes.tableData}>
                        <Text>{('اقدام کننده: حمید ناظمی پور')}</Text>
                    </View>
                    <View style={classes.tableData}>
                        <Text>{('شهرستان سر پل ذهاب')}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default BankLetter;
