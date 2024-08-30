import { Question } from "@/interfaces/project";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export type SelectedAnswers = {
  [questionId: number]: number[]; // The question ID maps to an array of selected answer IDs
};

export default function AnswerQuestions({questions} : {questions:Question[]}) {
  const {id} = useParams<{ id: string}>()
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});

  const { authState } = useOCAuth();
  const handleSubmit = async () => {
    try {
      const request = await fetch(`/api/quests?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.idToken}`, // Attach JWT token in the header
        },
        body: JSON.stringify(selectedAnswers),
      });
      const result = await request.json();
      toast.success(result.message)
    } catch (error) {
      console.log(error)
    }
  };

  const onAnswerSelect = (questionId: number, answerId: number, isChecked: boolean) => {
    setSelectedAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];

      if (isChecked) {
        // Add the answer ID to the array if it's checked
        return {
          ...prev,
          [questionId]: [...currentAnswers, answerId],
        };
      } else {
        // Remove the answer ID from the array if it's unchecked
        return {
          ...prev,
          [questionId]: currentAnswers.filter((id) => id !== answerId),
        };
      }
    });
  }

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
                  onChange={(e) => onAnswerSelect(questionIndex, answerIndex, e.target.checked)}
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
        <button onClick={() => handleSubmit()} className="btn btn-primary btn-wide">Submit</button>
      </div>
    </div>
  )
}