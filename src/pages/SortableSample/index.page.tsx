
import { NextPage } from "next";
import { SortableList } from "./SortableList";


export type TaskType = "today" | "tomorrow" | "other";



const SortableSample:NextPage = (() => {
  <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-flow-row auto-rows-min gap-2 lg:gap-4 lg:mt-6">
  <SortableList title="今日する" target="today" />
  <SortableList title="明日する" target="tomorrow" />
  <SortableList title="今度する" target="other" />
</div>

     
 return (
  <div></div> 
  
 )})

 export default SortableSample