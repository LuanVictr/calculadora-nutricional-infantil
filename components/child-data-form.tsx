
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Calendar, User, Weight, Ruler } from 'lucide-react';
import { useApp } from '@/contexts/app-context';
import { getTranslation } from '@/lib/translations';
import { ChildData } from '@/lib/types';

const createValidationSchema = (t: (key: string) => string) => yup.object({
  name: yup.string().required(t('required')),
  birthDate: yup.string().required(t('required')),
  gender: yup.string().oneOf(['male', 'female']).required(t('required')),
  weight: yup.number()
    .typeError(t('required'))
    .min(0.5, t('invalidWeight'))
    .max(200, t('invalidWeight'))
    .required(t('required')),
  height: yup.number()
    .typeError(t('required'))
    .min(30, t('invalidHeight'))
    .max(220, t('invalidHeight'))
    .required(t('required')),
  assessmentDate: yup.string().required(t('required')),
});

export const ChildDataForm: React.FC = () => {
  const { state, dispatch } = useApp();
  const { childData, settings } = state;
  const t = (key: string) => getTranslation(key, settings.language);

  const validationSchema = createValidationSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChildData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: childData.name || '',
      birthDate: childData.birthDate || '',
      gender: childData.gender || 'male',
      weight: childData.weight || undefined,
      height: childData.height || undefined,
      assessmentDate: childData.assessmentDate || new Date().toISOString().split('T')[0],
    },
  });

  // Observar mudanças nos campos e atualizar o estado
  const watchedFields = watch();
  
  React.useEffect(() => {
    const subscription = watch((value) => {
      if (value.name || value.birthDate || value.weight || value.height) {
        dispatch({
          type: 'UPDATE_CHILD_DATA',
          payload: value as Partial<ChildData>,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">{t('childData')}</h2>
          </div>

          <form className="space-y-6">
            {/* Nome da criança */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('childName')}
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={t('childName')}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Data de nascimento e sexo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="birthDate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('birthDate')}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    {...register('birthDate')}
                    id="birthDate"
                    type="date"
                    className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {errors.birthDate && (
                  <p className="text-sm text-destructive">{errors.birthDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('gender')}
                </label>
                <select
                  {...register('gender')}
                  id="gender"
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender.message}</p>
                )}
              </div>
            </div>

            {/* Peso e altura */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="weight" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('weight')}
                </label>
                <div className="relative">
                  <Weight className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    {...register('weight')}
                    id="weight"
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="200"
                    className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="0.0"
                  />
                </div>
                {errors.weight && (
                  <p className="text-sm text-destructive">{errors.weight.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="height" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('height')}
                </label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    {...register('height')}
                    id="height"
                    type="number"
                    step="0.1"
                    min="30"
                    max="220"
                    className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="0.0"
                  />
                </div>
                {errors.height && (
                  <p className="text-sm text-destructive">{errors.height.message}</p>
                )}
              </div>
            </div>

            {/* Data da avaliação */}
            <div className="space-y-2">
              <label htmlFor="assessmentDate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('assessmentDate')}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  {...register('assessmentDate')}
                  id="assessmentDate"
                  type="date"
                  className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {errors.assessmentDate && (
                <p className="text-sm text-destructive">{errors.assessmentDate.message}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
