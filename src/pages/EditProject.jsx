import React from 'react'
import { useParams } from "react-router-dom";

import ProjectForm from "../Components/ProjectForm";

const EditProject = () => {
    const projectId = useParams().id; 
  return (
    <ProjectForm type={false} id={projectId}/>
  )
}

export default EditProject