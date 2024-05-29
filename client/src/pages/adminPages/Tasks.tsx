// import { useGetTasksQuery, useCreateTasksMutation, useUpdateTasksMutation } from "../../store/slices/api/apiEndpoints"

// const Tasks = () => {
//   const { data: tasks, isLoading, isError } = useGetTasksQuery({});
//   return isLoading ? (<div>Loading...</div>) :
//     (
//     <div>`${JSON.stringify(tasks)}`</div>
//   )
// }

// export default Tasks
import React, { useState } from "react"

const Tasks = () => {
  const [widgets, setWidgets] = useState<string[]>([]);

  const handleOnDrag = (e: React.DragEvent, widgetType: string) => {
    console.log(widgetType)
    e.dataTransfer.setData("widgetType", widgetType);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }
  const handleOnDrop = (e: React.DragEvent) => {
    const widgetType = e.dataTransfer.getData("widgetType") as string;
    setWidgets([...widgets, widgetType]);
  }

  return (
    <div className="flex flex-row gap-8">
      <div>
        <div draggable onDragStart={(e)=>handleOnDrag(e, "Widget A")}>
          Widget A
        </div><div draggable onDragStart={(e) => handleOnDrag(e, "Widget B")}>
          Widget B
        </div>
        <div draggable onDragStart={(e) => handleOnDrag(e, "Widget C")}>
          Widget C
        </div>
      </div>
      <div className="w-[400px] bg-slate-600 h-[400px]" onDrop={handleOnDrop} onDragOver={handleDragOver}>
        {widgets.map((widget, index) => (
          <div key={index}>
            {widget}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Tasks