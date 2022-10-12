import { useSurveyResultsStore } from '@features/survey/hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface SurveyGuardProps {
  children: JSX.Element;
}

export const SurveyGuard = ({ children }: SurveyGuardProps) => {
  const navigate = useNavigate();
  const { step } = useParams();

  const [currentStep, surveyState] = useSurveyResultsStore((state) => [
    state.currentStep,
    state.surveyState,
  ]);

  useEffect(() => {
    if (surveyState === 'not-active') {
      navigate(`/survey`, { replace: true });
      return;
    }

    if (surveyState === 'completed') {
      navigate(`/survey/finish`, { replace: true });
      return;
    }

    if (step && surveyState === 'in-progress' && parseInt(step) > currentStep) {
      navigate(`/survey/step/${currentStep}`, { replace: true });
      return;
    }

    if (!step && surveyState === 'in-progress') {
      navigate(`/survey/step/${currentStep}`, { replace: true });
    }
  }, [currentStep, navigate, step]);

  return children;
};