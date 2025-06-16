import { useParams, useLocation } from 'react-router-dom';
import StudyPromptsViewer from '../Prompts/StudyPromptsViewer';

function InputDesign() {
  const { id } = useParams();
  const location = useLocation();
  
  return <StudyPromptsViewer />;
}

export default InputDesign;