import { api } from '@/api/api';
import type { ChangeTaskCompletionProps } from '@/interfaces/interfaces';

export async function changeTaskCompletion({
  taskId
}: ChangeTaskCompletionProps) {
  const response = await api.put(`/tasks/change-task-completion/${taskId}`);

  return response.data;
}
