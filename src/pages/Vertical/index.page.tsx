import { MeasuringStrategy } from "@dnd-kit/core";
import { 
    AnimateLayoutChanges, 
    defaultAnimateLayoutChanges, 
    verticalListSortingStrategy
 } from "@dnd-kit/sortable";
import { NextPage } from "next";
import { Sortable } from "./Sortable"
import { Props } from "./types";

const props: Partial<Props> = {
    strategy: verticalListSortingStrategy,
    itemCount: 50,
  };

const Home : NextPage = () => {
    const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    args.isSorting || args.wasDragging
      ? defaultAnimateLayoutChanges(args)
      : true;

    return (
        <div className="bg-gray-200">
            <Sortable 
                {...props}
                animateLayoutChanges={animateLayoutChanges}
                measuring={{droppable: {strategy: MeasuringStrategy.Always}}}
                handle
            />
        </div>
    )
}

export default Home