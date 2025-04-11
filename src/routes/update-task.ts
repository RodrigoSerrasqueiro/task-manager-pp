import { api } from '@/api/api';
import type { UpdateTaskProps } from '@/interfaces/interfaces';

export async function updateTask({ updatedTask }: UpdateTaskProps) {
  const response = await api.put(`/tasks/${updatedTask.id}`, {
    ...updatedTask
  });

  return response.data;
}
