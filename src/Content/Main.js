
import axios from 'axios';
import FolderTrack from './FolderTrack'
import FileTrack from './FileTrack'
import { useState, useRef, useEffect } from "react"
// import {BsCloudUpload} from 'react-icons/bs'


function Main({setIsDisplayPopup}){

    const folderName = useRef() //for new folder to create
    const message = useRef()
    const [currentPath,setCurrentPath]=useState('root/')   //where we are now
    const [state,setState] = useState({fileName: ''})   //for new file to upload
    const [isDisplayUpload,setIsDisplayUpload] =useState(false) //popup to show when click the uploade file button
    const [isDisplayAddFolder,setIsDisplayAddFolder] =useState(false)   //popup to show when click the create folder button
    const [arrFiles,setArrFiles]=useState([])   //current folder files
    const [arrFolder,setArrFolder]=useState([])   //current folder files
    const [refreshPage,setRefreshPage]=useState(false)   //current folder files

    //ON PAGE_LOAD:
    //fetch all './root' files
    useEffect(()=>{
        console.log("currentPath:", currentPath)
         axios.get(`http://localhost:4000/api/?path=${currentPath}`)
        .then(res => {
            const fullArr = res.data
            setArrFiles(fullArr.filter(e => e.includes(".")))
            setArrFolder(fullArr.filter(e => !e.includes(".")))
        })   
    },[currentPath, refreshPage])


    //ON UPLOAD_FILE
    //save file in current folder
    const onSubmit=(e)=> {
        e.preventDefault()
        const formData = new FormData()
        formData.append('userFile', state.fileName)
        formData.append('filePath', currentPath)
        const result = axios.post(`http://localhost:4000/api/upload/?path=${currentPath}`, formData, {
        }).then(res => {
            message.current.value = res.data
        })
        setIsDisplayUpload(false)
        setCurrentPath(currentPath)

    }

    //ON CREATE_FOLDER
    //add new named sub-folder in currenr place
    const createFolder=(e)=> {
        const newDir = folderName.current.value

        //e.preventDefault()
        axios.post("http://localhost:4000/api/newDir/",{
            currentPath: './'+currentPath, 
            newDir: newDir
        }).then(res => {
            console.log(res)
        })
        console.log(newDir)
        setIsDisplayAddFolder(false)
        setCurrentPath(currentPath + newDir + '/')
    }

    const onFileChange=(e) =>{
        setState({ fileName: e.target.files[0] })
    }

    const addFolderComponent=()=>{
        setIsDisplayAddFolder(true)
    }

    const displayUploadComponent=()=>{
        setIsDisplayUpload(true)
    }
    //למנוע 
    //e.stopPropagation()
    //

    const arrPath = currentPath.split('/')
    arrPath.length=arrPath.length-1
    const goToFolder = ()=>{
        if(currentPath!= 'root/'){
            const lasSleshtIndex = currentPath.substring(0, currentPath.length-1).lastIndexOf('/')
            const parentFolder = currentPath.substring(0, lasSleshtIndex)
            setCurrentPath(parentFolder+'/')
            }
        }
    return(
        <div className="main"> 
            <div className='breadcrumb'>
                <p> <i className="zmdi zmdi-folder-outline"></i> ./{arrPath.map((folder,i)=>{
                    return <label key={i} className='folderLink' onClick={goToFolder}>{folder}/</label>
                })}</p>
                <p><i onClick={goToFolder} alt="back to folder" className="zmdi zmdi-chevron-up zmdi-hc-2x"></i></p>
            </div>
            <div className="buttons">
                <button onClick={addFolderComponent}>add new Folder</button> 
                <button onClick={displayUploadComponent}>upload new file</button> 
            </div>  

            {isDisplayAddFolder && <div className="popup-bg">       
            <div className="popup-content">
                <div><i className="zmdi zmdi-close-circle-o" onClick={()=>setIsDisplayAddFolder(false)}></i></div>    
                <div><p>folder name:</p> <input type="text" ref={folderName}></input></div>  <br /> 
                <div><button onClick={createFolder}>Create</button>&nbsp;<button onClick={()=>setIsDisplayAddFolder(false)}>Cancel</button></div> 
            </div>
        </div>}
{/* <BsCloudUpload /> */}
            {isDisplayUpload && <div className="popup-bg">
                <div className="popup-content">
                    <i className="zmdi zmdi-close-circle-o" onClick={()=>setIsDisplayUpload(false)}></i>
                    <form className='form-frame' onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload file</button>
                        </div>
                        <input className="message" type="text" ref={message}></input>
                    </form>
                </div>
            </div>}

            <div className="userContent">
                {arrFolder.length > 0?
                    arrFolder.map((element, i)=>{
                    return <FolderTrack key={i} currentPath={currentPath} setCurrentPath={setCurrentPath} folderName={element} />
                }): arrFiles.length === 0? <div className="folderTrack">
                    <div className="folderName">{"Folder is empty"}</div>
                    </div> :""}
                {arrFiles.length > 0?
                    arrFiles.map((element,i)=>{
                    return <FileTrack key={i} currentPath={currentPath} setRefreshPage={setRefreshPage} refreshPage={refreshPage} fileName={element} />
                }): ''}

            </div> 
     
        </div>
    )
}

export default Main