// UserSurvey.jsx
import { useParams } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
// 필요에 따라 Step 추가
import DefaultStep from './DefaultStep'; // 존재하지 않는 step에 대한 기본 처리

function TravelSurvey() {
  const { step } = useParams();  // URL에서 step 값을 가져옴

  switch(step) {
    case '1':
      return <Step1 />;
    case '2':
      return <Step2 />;
    // 다른 step 추가
    default:
      return <DefaultStep />;  // 예외 처리
  }
}

export default TravelSurvey;