import { ChangeEvent, useState } from "react"

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

export default function LearnTier() {
  const handleOpenModal = () => {
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('learn_tier').showModal()
  }

  const [questions, setQuestions] = useState<Question[]>([
    {
      question: '',
      answers: [{ id: 1, text: '', isCorrect: false }],
    },
  ]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    field: keyof Answer,
    value: string | boolean
  ) => {
    const newQuestions = [...questions] as any;
    newQuestions[questionIndex].answers[answerIndex][field] = value;
    setQuestions(newQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        answers: [{ id: Date.now(), text: '', isCorrect: false }],
      },
    ]);
  };

  const addNewAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({
      id: Date.now(),
      text: '',
      isCorrect: false,
    });
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const deleteAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  return (
    <div>
      <button className="btn w-60 btn-secondary" onClick={()=>handleOpenModal()}>Edit question</button>
      <dialog id="learn_tier" className="modal">
        <div className="modal-box w-11/12 max-w-5xl flex flex-col gap-4">
          <h3 className="font-bold text-lg">Questions</h3>
          <label className="form-control w-full max-w">
            <div className="label">
              <span className="label-text">Document link</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w" />
          </label>

          {questions.map((q, questionIndex) => (
            <div key={questionIndex} className="border-primary/40 p-4 rounded-md border">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter question"
                  className="input input-bordered w-full max-w"
                  value={q.question}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleQuestionChange(questionIndex, e.target.value)
                  }
                />
                <button onClick={() => deleteQuestion(questionIndex)} className="btn btn-outline btn-error w-12">x</button>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {q.answers.map((a, answerIndex) => (
                  <div key={a.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="input input-bordered w-full max-w"
                      placeholder="Enter answer text"
                      value={a.text}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleAnswerChange(questionIndex, answerIndex, 'text', e.target.value)
                      }
                    />
                    <input type="checkbox" checked={a.isCorrect}
                      className="checkbox checkbox-success"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleAnswerChange(questionIndex, answerIndex, 'isCorrect', e.target.checked)
                      }
                    />
                    <label>Correct</label>
                    <button onClick={() => deleteAnswer(questionIndex, answerIndex)}className="btn btn-outline btn-error w-12">x</button>
                  </div>
                ))}
              </div>
                <button className="btn btn-secondary btn-sm" onClick={() => addNewAnswer(questionIndex)}>Add Answer</button>
              </div>
            ))}

          <button className="btn btn-primary"  onClick={addNewQuestion}>Add Question</button>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}