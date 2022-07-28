
// import './FolderTrack.css';


function FolderTrack(props){

    const folderName = props.folderName
    const currentPath = props.currentPath
    
    const changePath =()=>{
        props.setCurrentPath(currentPath + folderName + "/")
    }
    return(
        <div className="folderTrack" onDoubleClick={changePath}> 
            
            <div className="folderName">{props.folderName}</div> 
        </div>
    )
}

export default FolderTrack