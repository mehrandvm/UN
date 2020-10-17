import React, {useContext, useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import axiosInstance from "../../apis/AxiosConfig";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import {BlobProvider} from "@react-pdf/renderer";
import BankLetter from "../bank-letter/BankLetter";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import {getTranslator} from "../../vocabs";
import {LanguageContext} from "../../contexts/language-context/LanguageContext";

const useStyles = makeStyles((theme) => ({
    tableCell: {
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'end',
    },
    tableTitle: {
        padding: 8,
    },
    loadingContainer: {
        zIndex: 2,
        position: 'absolute',
        margin: 'auto',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
    link: {
        textDecoration: 'none',
    },
    button: {
        margin: '0 8px',
        width: 150,
        fontSize: '0.7rem',
    },
}));

const StageUtilButtons = (props) => {
    const [getFactor, setGetFactor] = useState(false);
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const {enqueueSnackbar} = useSnackbar()

    useEffect(()=>{
        axiosInstance.get(`management/persons/${props.row.id}`).then((res) => {
            setUserId(`${res.data.data.id}`)
            setUserName(res.data.data.name)
        })
    },[])
    const vocabs = getTranslator(useContext(LanguageContext).language);
    const classes = useStyles()
    return (
        <TableCell className={classes.tableCell}>
            <Button variant={'outlined'}
                    disabled={props.row.objection === null}
                    onClick={() => history.push(`/objections/${props.row.id}`)}
                    className={classes.button}>
                {vocabs('view-objection')}
            </Button>
            {props.row.issued ? <a download href={props.row.issued}>
                    <Button variant={'outlined'} className={classes.button}>
                        {vocabs('download-letter')}
                    </Button></a>
                :
                userName && userId ?
                    <Button variant={'outlined'} onClick={() => setGetFactor(true)} className={classes.button}>
                        {getFactor
                            ? (
                                <BlobProvider
                                    document={<BankLetter userName={userName}
                                                          userId={userId}
                                                          loanNumber={'12000000'}
                                                          stageNumber={props.row.stage_number}
                                                          caseNumber={props.row.referrence_code}
                                                          subdivision={props.row.subdivision}
                                    />}>
                                    {({blob, url, loading, error}) => {
                                        if (loading) {
                                            return (<CircularProgress size={20} className={classes.progress}/>);
                                        }
                                        if (!loading && url && blob) {

                                            let pdf = new FormData();
                                            pdf.append('file', blob);
                                            pdf.append('visit_id', props.row.id);

                                            axiosInstance.post('/management/files/bank-issue', pdf,
                                                {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data',
                                                    },
                                                }).then((res) => {
                                                console.log(res)
                                                enqueueSnackbar('File has been saved successfully', {variant: 'success'})
                                            }).catch((e) => {
                                                console.log(e)
                                                enqueueSnackbar('An error occurred', {variant: 'error'})
                                            })
                                            return (
                                                <a href={url} download className={classes.link}>
                                                    {vocabs('download-letter')}
                                                </a>
                                            );
                                        }
                                        if (error) {
                                            console.error(error);
                                            return <p>An error occurred</p>;
                                        }
                                        setGetFactor(false);
                                        return null
                                    }}
                                </BlobProvider>
                            )
                            : <>{vocabs('export-letter')}</>}
                    </Button>
                    : <Button variant={'outlined'} className={classes.button}>
                        <CircularProgress size={20} className={classes.progress}/>
                    </Button>
            }
        </TableCell>
    );
};

export default StageUtilButtons
