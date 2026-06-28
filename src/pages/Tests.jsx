import React, { useState } from 'react';
import { HelpCircle, Clock, Award, Check, X } from 'lucide-react';

export default function Tests({ tests, setTests, onProgressChange }) {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submittedScore, setSubmittedScore] = useState(null);

  const handleBeginTest = (test) => {
    setActiveQuiz(test);
    setAnswers({});
    setSubmittedScore(null);
  };

  const handleOptionSelect = (qIdx, optIdx) => {
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length < activeQuiz.questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }
    
    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correctCount++;
      }
    });

    const scorePctNum = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const scorePct = scorePctNum + '%';
    
    setTests(prev => prev.map(t => t.id === activeQuiz.id ? { ...t, score: scorePct } : t));
    setSubmittedScore(scorePct);

    if (onProgressChange) {
      const subjectMap = {
        'Mathematics': 'math',
        'Biology': 'biology',
        'Physics': 'physics',
        'Science': 'science',
        'English': 'english'
      };
      const courseId = subjectMap[activeQuiz.subject];
      if (courseId) {
        onProgressChange(courseId, scorePctNum);
      }
    }
  };

  const handleClose = () => {
    setActiveQuiz(null);
    setAnswers({});
    setSubmittedScore(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Examination Platform</h1>
        <p className="text-sm text-slate-500">Take test assessments and look over your certified scorecards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => (
          <div key={test.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">{test.subject}</span>
              <h3 className="font-bold text-slate-800 text-base">{test.title}</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-center text-xs text-slate-600 font-medium">
              <div className="flex flex-col items-center gap-1"><Clock size={14} className="text-slate-400" /> {test.duration}</div>
              <div className="flex flex-col items-center gap-1"><HelpCircle size={14} className="text-slate-400" /> {test.totalQuestions} Qs</div>
              <div className="flex flex-col items-center gap-1"><Award size={14} className="text-slate-400" /> {test.score}</div>
            </div>

            <button 
              onClick={() => handleBeginTest(test)}
              className="w-full text-xs font-semibold py-2.5 rounded-xl transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer"
            >
              {test.score === 'Open' ? 'Begin Examination Now' : 'Retake Assessment (Review Breakdown)'}
            </button>
          </div>
        ))}
      </div>

      {/* Quiz Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-xl w-full p-6 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            {submittedScore ? (
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                  <Check size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">Examination Submitted!</h3>
                  <p className="text-sm text-slate-500">Your scorecard has been updated successfully on the dashboard.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 inline-block min-w-32 border border-slate-100">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Final Score</span>
                  <p className="text-3xl font-black text-blue-600 mt-1">{submittedScore}</p>
                </div>
                <div>
                  <button 
                    onClick={handleClose}
                    className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Return to Exam Desk
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">{activeQuiz.subject} Exam</span>
                  <h3 className="text-lg font-bold text-slate-800 leading-tight">{activeQuiz.title}</h3>
                </div>

                <div className="space-y-5">
                  {activeQuiz.questions.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-2.5">
                      <p className="text-sm font-semibold text-slate-800 flex gap-2">
                        <span>{qIdx + 1}.</span>
                        <span>{q.q}</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = answers[qIdx] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleOptionSelect(qIdx, optIdx)}
                              className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                                isSelected 
                                  ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-sm'
                                  : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'
                              } cursor-pointer`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
                  <button 
                    onClick={handleClose}
                    className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-md shadow-blue-500/10"
                  >
                    Submit Examination
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}