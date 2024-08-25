import { Question } from "@/interfaces/project";

export default function AnswerQuestions({questions} : {questions:Question[]}) {
  // const handleSubmit = async (project: Project) => {
  //   const createNewProject = await fetch(`/api/projects?id=${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(project as Project),
  //   });

  //   const result = await createNewProject.json();
  //   console.log(result)
  // };

  return(
    <div className="flex flex-col gap-4">
      {questions && questions.map((q, questionIndex) => (
        <div key={questionIndex} className="border-primary/40 p-4 rounded-md border">
          <div className="flex gap-2">
            <p
              className="input input-bordered w-full max-w"
            >
              {q.question}
            </p>
          </div>
          <div className="p-4 flex flex-col gap-2">
            {q.answers.map((a, answerIndex) => (
              <div key={a.id} className="flex gap-2 items-center">
                <input type="checkbox"
                  className="checkbox checkbox-success"
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   handleAnswerChange(questionIndex, answerIndex, 'isCorrect', e.target.checked)
                  // }
                />
                <p>
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        ))}
      <div className="flex justify-center">
        <button className="btn btn-primary btn-wide">Submit</button>
      </div>
    </div>
  )
}