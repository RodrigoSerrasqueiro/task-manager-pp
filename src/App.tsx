import { Header } from './components/header';
import { PageContainer } from './components/page-container';
import { PageContent } from './components/page-content';
import { TaskCard } from './components/task-card';
import { useTasksContext } from './contexts/tasks-context';

export function App() {
  const { data } = useTasksContext();

  if (!data) {
    return;
  }

  console.log(data);

  return (
    <PageContainer>
      <PageContent>
        <Header />
        {data.tasks.length > 0 &&
          data.tasks.map(task => <TaskCard key={task.id} task={task} />)}
      </PageContent>
    </PageContainer>
  );
}
