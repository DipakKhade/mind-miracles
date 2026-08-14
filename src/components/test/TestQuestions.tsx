'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { questions } from '@/lib/questions';
import { toast } from 'sonner';

interface Props {
  setShowForm: (show: boolean) => void;
  setScore: (score: number) => void;
}

export function TestQuestions({ setShowForm, setScore }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      toast.error('Please answer all questions');
      return;
    }

    let totalScore = 0;
    Object.entries(answers).forEach(([_, value]) => {
      if (value === 'yes') totalScore += 2;
      else if (value === 'sometimes') totalScore += 1;
    });

    setScore(totalScore);
    setShowForm(true);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-2xl font-bold text-green-800 md:text-3xl">
          Mental Health Assessment
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          Please answer honestly for the most accurate results
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-green-100 bg-green-50 p-5">
        <div className="mb-4">
          <p className="mb-2 font-semibold text-green-800">मराठी:</p>
          <p>होय – हो, मी हे वारंवार अनुभवत आहे</p>
          <p>कधीमधी – अधूनमधून वाटतं</p>
          <p>नाही – मला असं वाटलेलं नाही</p>
        </div>
        <div>
          <p className="mb-2 font-semibold text-green-800">English:</p>
          <p>Yes – I feel this often or daily</p>
          <p>Sometimes – I feel this occasionally</p>
          <p>No – I haven&apos;t felt this</p>
        </div>
      </div>

      {questions.map((q, index) => (
        <Card
          key={index}
          className="mb-6 overflow-hidden rounded-2xl border-green-100 transition-shadow duration-300 hover:shadow-md"
        >
          <CardHeader className="border-b border-green-50 bg-green-50/50">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#003C2F]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white shadow-md shadow-green-600/25">
                {index + 1}
              </span>
              Question {index + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="mb-2 text-base font-medium text-green-800">
                {q.marathi}
              </p>
              <p className="text-base text-gray-600">{q.english}</p>
            </div>
            <RadioGroup
              onValueChange={(value: any) =>
                setAnswers((prev) => ({ ...prev, [index]: value }))
              }
              value={answers[index]}
            >
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="flex items-center space-x-2 rounded-xl border border-green-100 bg-white px-4 py-3 transition-colors hover:border-green-300 hover:bg-green-50/50">
                  <RadioGroupItem value="yes" id={`yes-${index}`} />
                  <Label htmlFor={`yes-${index}`}>Yes / होय</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-xl border border-green-100 bg-white px-4 py-3 transition-colors hover:border-green-300 hover:bg-green-50/50">
                  <RadioGroupItem value="sometimes" id={`sometimes-${index}`} />
                  <Label htmlFor={`sometimes-${index}`}>
                    Sometimes / कधीमधी
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-xl border border-green-100 bg-white px-4 py-3 transition-colors hover:border-green-300 hover:bg-green-50/50">
                  <RadioGroupItem value="no" id={`no-${index}`} />
                  <Label htmlFor={`no-${index}`}>No / नाही</Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={handleSubmit}
        className="mb-8 w-full rounded-full bg-green-600 py-6 text-base shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl"
      >
        Submit
      </Button>
    </div>
  );
}
