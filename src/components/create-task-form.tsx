import { useTasksContext } from '@/contexts/tasks-context';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form';
import { Input } from './ui/input';
import { images } from '@/utils/images';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import type { NewTask } from '@/interfaces/interfaces';
import { useMutation } from '@tanstack/react-query';
import { createNewTask } from '@/routes/create-new-task';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import type { AxiosError } from 'axios';

export function CreateTaskForm() {
  const { refetchTaskData } = useTasksContext();
  const minCharacteresOfTitle = 3;
  const maxCharactersOfTitle = 25;
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const formSchema = z.object({
    title: z
      .string()
      .min(minCharacteresOfTitle, {
        message: `O título da tarefa deve conter pelo menos ${minCharacteresOfTitle} caracteres.`
      })
      .max(maxCharactersOfTitle, {
        message: `O título está muito longo. Ele deve conter no máximo ${maxCharactersOfTitle} caracteres`
      }),
    description: z.string().min(10, {
      message: 'A descrição da tarefa deve conter pelo menos 10 caracteres.'
    }),
    images: z
      .array(z.string().url())
      .min(1, { message: 'Associe no mínimo uma imagem à essa tarefa.' })
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      images: []
    }
  });

  const {
    mutate: createTaskRequest,
    isPending,
    isError
  } = useMutation({
    mutationFn: createNewTask,
    onSuccess: () => {
      toast.success('Nova tarefa criada com sucesso!');
      resetForm();
      refetchTaskData?.();
    },
    onError: (error: AxiosError) => {
      console.error(error);
      setErrorMessage(error.response?.statusText);
    }
  });

  const handleSubmit = (formData: NewTask) => {
    createTaskRequest({ task: formData });
  };

  const resetForm = () => {
    form.reset();
  };

  return (
    <div className='w-full'>
      <Form {...form}>
        <form className='space-y-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='task-title'>Título</FormLabel>
                <FormControl>
                  <Input
                    id='task-title'
                    type='text'
                    placeholder='Título da tarefa...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='task-description'>Descrição</FormLabel>
                <FormControl>
                  <Input
                    id='task-description'
                    type='text'
                    placeholder='Descrição da tarefa...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagens Associadas</FormLabel>
                <FormControl>
                  <div className='grid grid-cols-3 gap-4'>
                    {images.map((image, index) => {
                      // biome-ignore lint/complexity/noBannedTypes: <explanation>
                      const isSelected = (field.value as String[])?.includes(
                        image
                      );
                      return (
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                        <div
                          key={image}
                          className={cn(
                            'relative cursor-pointer rounded-md overflow-hidden border-2 transition-colors',
                            isSelected
                              ? 'border-primary border-4'
                              : 'border-gray-300 hover:border-gray-400'
                          )}
                          onClick={() => {
                            if (isSelected) {
                              field.onChange(
                                field.value.filter(img => img !== image)
                              );
                            } else {
                              field.onChange([...(field.value || []), image]);
                            }
                          }}
                        >
                          <img
                            src={image}
                            alt={`Imagem ${index + 1}`}
                            className='w-full h-24 object-cover'
                          />
                        </div>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='w-full flex justify-end gap-3'>
            <Button
              type='button'
              className='uppercase'
              variant='secondary'
              onClick={resetForm}
            >
              Limpar
            </Button>

            <Button
              type='submit'
              className='uppercase font-semibold w-[170px]'
              disabled={isPending}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {isPending ? <Loader className='animate-spin' /> : 'Criar tarefa'}
            </Button>
          </div>
          {isError && errorMessage && (
            <p className='text-[0.8rem] font-medium text-red-500'>
              {`Erro ao criar nova mensagem. Erro: ${errorMessage}`}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}
