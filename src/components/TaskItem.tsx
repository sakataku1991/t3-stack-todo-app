import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { FC } from "react";
import { useMutateTask } from "../hooks/useMutateTask";
import type { updateTaskInput } from "../schema/todo";
import useStore from "../store";

export const TaskItem: FC<updateTaskInput> = ({ taskId, title, body }) => {
  const update = useStore((state) => state.updateEditedTask);
  const { deleteTaskMutation } = useMutateTask();
  return (
    <li>
      <Link href={`/task/${taskId}`} className="cursor-pointer">
        {title}
      </Link>
      <div className="float-right ml-20 flex">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-600"
          onClick={() => {
            update({
              taskId,
              title,
              body,
            });
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-600"
          onClick={() => {
            deleteTaskMutation.mutate({ taskId });
          }}
        />
      </div>
      {deleteTaskMutation.isLoading && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
    </li>
  );
};
