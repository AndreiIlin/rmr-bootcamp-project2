import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Survey } from '../survey.entity';

export interface SurveyResultsState {
  surveyId: Survey['surveyId'] | null;
  error: string | null;
  surveyState: 'not-active' | 'in-progress' | 'completed';
  isSurveyRepeatConfirmed: boolean;
  answers: {
    // Ключи - это questionId, а значения answerId
    [key: number]: number;
  };

  currentStep: number; // Current question number
}

const initialState: SurveyResultsState = {
  surveyId: null,
  error: null,
  surveyState: 'not-active',
  answers: [],
  isSurveyRepeatConfirmed: false,
  currentStep: 0,
};

interface Actions {
  setSurveyState: (surveyState: SurveyResultsState['surveyState']) => void;
  setCurrentStep: (step: SurveyResultsState['currentStep']) => void;
  setStepAnswer: (questionId: number, answerId: number) => void;
  setSurveyRepeatConfirmed: (isConfirmed: boolean) => void;
  reset: () => void;
}

export const useSurveyResultsStore = create<SurveyResultsState & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setSurveyState: (surveyState) => set({ surveyState }),
        setCurrentStep: (step) => set({ currentStep: step }),
        setStepAnswer: (step, answer) => {
          set((state) => ({
            answers: {
              ...state.answers,
              [step]: answer,
            },
          }));
        },
        setSurveyRepeatConfirmed: (isConfirmed) =>
          set({ isSurveyRepeatConfirmed: isConfirmed }),
        reset: () => set(initialState),
      }),
      {
        name: 'survey-results-storage',
      },
    ),
  ),
);
