'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';
import { registrationFormStateAtom } from '@/store';
import { PayAndRegisterButton } from '../PayAndRegisterButton';
import { courses } from '@/types';
import { useState } from 'react';
import { z } from 'zod';
import {
  User,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { registrationSchema } from '@/types/zod';

type ValidationErrors = {
  [key: string]: string;
};

export function ProgramRegistrationForm({
  course_id,
  amount_to_pay,
}: {
  course_id: string;
  amount_to_pay: number;
}) {
  const [formState, setFormState] = useRecoilState(registrationFormStateAtom);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValidated, setIsValidated] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const validateField = (name: string, value: string) => {
    try {
      registrationSchema.pick({ [name]: true } as any).parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: '' }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
      return false;
    }
  };

  const validateForm = () => {
    try {
      registrationSchema.parse(formState);
      setErrors({});
      setIsValidated(true);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        console.log(errors);
      }
      setIsValidated(false);
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touchedFields.has(name)) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => new Set(prev).add(name));
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedFields(new Set(['name', 'email', 'whatsapp', 'age']));
    validateForm();
  };

  const isFormValid =
    formState.name && formState.whatsapp && formState.age ? true : false;

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="container max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Join Our Program
          </h1>
          <p className="text-lg text-gray-600">
            Take the first step towards your transformation
          </p>
        </div>

        <Card className="border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-8 text-center">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Registration Form
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill in your details to secure your spot in the program
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className={`h-12 border-2 pl-10 transition-all duration-200 ${
                      errors.name && touchedFields.has('name')
                        ? 'border-red-300 focus:border-red-500'
                        : formState.name && !errors.name
                          ? 'border-green-300 focus:border-green-500'
                          : 'border-gray-200 focus:border-blue-500'
                    }`}
                    value={formState.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {formState.name && !errors.name && (
                    <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.name && touchedFields.has('name') && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              {/* <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className={`h-12 border-2 pl-10 transition-all duration-200 ${
                      errors.email && touchedFields.has('email')
                        ? 'border-red-300 focus:border-red-500'
                        : formState.email && !errors.email
                          ? 'border-green-300 focus:border-green-500'
                          : 'border-gray-200 focus:border-blue-500'
                    }`}
                    value={formState.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {formState.email && !errors.email && (
                    <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.email && touchedFields.has('email') && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </div>
                )}
              </div> */}

              {/* WhatsApp Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="whatsapp"
                  className="text-sm font-medium text-gray-700"
                >
                  WhatsApp Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="whatsapp"
                    type="tel"
                    name="whatsapp"
                    placeholder="+1234567890"
                    className={`h-12 border-2 pl-10 transition-all duration-200 ${
                      errors.whatsapp && touchedFields.has('whatsapp')
                        ? 'border-red-300 focus:border-red-500'
                        : formState.whatsapp && !errors.whatsapp
                          ? 'border-green-300 focus:border-green-500'
                          : 'border-gray-200 focus:border-blue-500'
                    }`}
                    value={formState.whatsapp}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {formState.whatsapp && !errors.whatsapp && (
                    <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.whatsapp && touchedFields.has('whatsapp') && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.whatsapp}
                  </div>
                )}
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="age"
                  className="text-sm font-medium text-gray-700"
                >
                  Age *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="age"
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    min="16"
                    max="100"
                    className={`h-12 border-2 pl-10 transition-all duration-200 ${
                      errors.age && touchedFields.has('age')
                        ? 'border-red-300 focus:border-red-500'
                        : formState.age && !errors.age
                          ? 'border-green-300 focus:border-green-500'
                          : 'border-gray-200 focus:border-blue-500'
                    }`}
                    value={formState.age}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {formState.age && !errors.age && (
                    <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.age && touchedFields.has('age') && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.age}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <PayAndRegisterButton
                  course_id={course_id}
                  amount_to_pay={amount_to_pay}
                  disabled={!isFormValid}
                  isFormValid={
                    (isFormValid as boolean) &&
                    !errors.name &&
                    !errors.email &&
                    !errors.whatsapp &&
                    !errors.age
                  }
                />
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your information is secure and will only
                be used for program communication. We respect your privacy and
                will never share your details with third parties.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
