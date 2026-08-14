'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  score: number;
}

export function UserForm({ score }: Props) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getRemark = (score: number) => {
    if (score >= 15) {
      return "Your responses indicate significant stress levels. It's important to seek professional support for your mental well-being.";
    } else if (score >= 10) {
      return "You're experiencing moderate stress. Consider talking to someone you trust or a counselor.";
    } else {
      return 'Your stress levels appear to be manageable. Continue practicing self-care and maintaining your mental health.';
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-result', {
        method: 'POST',
        body: JSON.stringify({ ...data, score }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Thank you for completing the assessment');
        router.push('/');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to submit');
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="mb-8 overflow-hidden rounded-2xl border-green-100">
        <div className="h-1.5 bg-gradient-to-r from-green-600 to-teal-600" />
        <CardHeader>
          <CardTitle className="text-[#003C2F]">
            Your Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-600/10 px-4 py-1.5 text-sm font-bold text-green-700">
            Score: {score}/20
          </div>
          <p className="text-gray-700">{getRemark(score)}</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-2xl border-green-100">
        <div className="h-1.5 bg-gradient-to-r from-green-600 to-teal-600" />
        <CardHeader>
          <CardTitle className="text-xl text-[#003C2F]">
            If you want to manage your stress level, fill the form!!!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name')}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                {...register('age')}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                {...register('occupation')}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                {...register('mobile')}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                required
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-green-600 py-6 shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
