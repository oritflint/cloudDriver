
// import './FileTrack.css';
import axios from 'axios';
import { useState } from "react"
import pdf from '../img/PDFicon.PNG'
import png from '../img/IMGicon.PNG'
import doc from '../img/WORDicon.PNG'

function FileTrack(props){

    const [isDisplayConfirmDownload, setIsDisplayConfirmDownload] = useState(false)
    const [isDisplayConfirmDelete, setIsDisplayConfirmDelete] = useState(false)
    const fileName = props.fileName
    const extantion = fileName.split(".")[1]
    const currentPath = props.currentPath

    let fileType = png
    const fileToDownload="./root"
    //ON DELETE_FILE
    //
    const deleteFile=()=> {
        const filePath = fileName
        //e.preventDefault()
        axios.post("http://localhost:4000/api/delFile/",{
            currentFile: currentPath + filePath, 
        }).then(res => {
            console.log(res)
        })
        
        props.setRefreshPage(!props.refreshPage)
        setIsDisplayConfirmDelete(false)
    }

    //ON DOUNLOAD_FILE
    //
    const downloadFile=()=> {
        const filePath = fileName

        //e.preventDefault()
        axios.post("http://localhost:4000/api/download/",{
            fileName: filePath, 
        }).then(res => {
            console.log(res)
        })
        setIsDisplayConfirmDownload(false)
    }

    switch(extantion){
        case 'pdf': 
            fileType = pdf;
            break;
        case 'img': 
            fileType = png;
            break;
        case 'doc': 
        case 'docx': 
            fileType = doc;
            break;
        default:
            fileType = png;
    }
    
    return(
        <div className="folderTrack"> 
            <div className="folderIcon"> <img width={30} height={30} src={fileType} alt="" /> </div>
            <div className="folderName"><p>{fileName}</p> </div>       
            <div className="folderMenu">
                <i className="zmdi zmdi-delete " onClick={()=>setIsDisplayConfirmDelete(true)}></i>
                <a className="zmdi zmdi-cloud-download" href={fileToDownload} download></a>
            </div>  

            {isDisplayConfirmDelete && <div className="popup-bg">
                <div className="popup-content">
                    <i className="zmdi zmdi-close-circle-o" onClick={()=>setIsDisplayConfirmDelete(false)}></i>
                    <p>Are you sure you want to delete {fileName}?</p>
                    <button onClick={deleteFile}>Confirm</button>&nbsp;<button onClick={()=>setIsDisplayConfirmDelete(false)}>cancel</button>
                </div>
            </div>}         

            {isDisplayConfirmDownload && <div className="popup-bg">
                <div className="popup-content">
                    <i className="zmdi zmdi-close-circle-o" onClick={()=>setIsDisplayConfirmDownload(false)}></i>
                    <p></p>
                    <button onClick={downloadFile}>Confirm</button>
                </div>
            </div>}         
        </div>
    )
}

export default FileTrack