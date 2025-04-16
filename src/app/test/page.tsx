'use client';
import { useState } from 'react';
import { TestQuestions } from '@/components/test/TestQuestions';
import { UserForm } from '@/components/test/UserForm';

export default function TestPage() {
  const [showForm, setShowForm] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      {!showForm ? (
        <TestQuestions setShowForm={setShowForm} setScore={setScore} />
      ) : (
        <UserForm score={score} />
      )}
    </div>
  );
}
