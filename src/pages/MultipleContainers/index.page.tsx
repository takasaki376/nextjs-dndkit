import { closestCenter, CollisionDetection,  DndContext,  getFirstCollision, KeyboardSensor, MeasuringStrategy, MouseSensor, pointerWithin, rectIntersection, TouchSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCallback, useEffect, useRef, useState } from "react";
import { DroppableContainer } from "./DroppableContainer";
import { createRange,  PLACEHOLDER_ID, TRASH_ID } from "../../components/functions";
import { Items } from "./types";
import { unstable_batchedUpdates} from 'react-dom';
import { SortableItem } from "./SortableItem";
import { NextPage } from "next";



 const MultipleContainers:NextPage = () => {

    const [items, setItems] = useState<Items>(
       {
          A: createRange(5, (index) => `A${index + 1}`),
          B: createRange(5, (index) => `B${index + 1}`),
          C: createRange(5, (index) => `C${index + 1}`),
        }
    );
    const [containers, setContainers] = useState(Object.keys(items));
    const [activeId, setActiveId] = useState<string | null>(null);
    // const lastOverId = useRef<UniqueIdentifier | null>(null);
    const recentlyMovedToNewContainer = useRef(false);
    const isSortingContainer = activeId ? containers.includes(activeId) : false;
  
    // /**
    //  * Custom collision detection strategy optimized for multiple containers
    //  *
    //  * - First, find any droppable containers intersecting with the pointer.
    //  * - If there are none, find intersecting containers with the active draggable.
    //  * - If there are no intersecting containers, return the last matched intersection
    //  *
    //  */
    // const collisionDetectionStrategy: CollisionDetection = useCallback(
    //   (args) => {
    //     if (activeId && activeId in items) {
    //       return closestCenter({
    //         ...args,
    //         droppableContainers: args.droppableContainers.filter(
    //           (container) => container.id in items
    //         ),
    //       });
    //     }
  
    //     // Start by finding any intersecting droppable
    //     const pointerIntersections = pointerWithin(args);
    //     const intersections =
    //       pointerIntersections.length > 0
    //         ? // If there are droppables intersecting with the pointer, return those
    //           pointerIntersections
    //         : rectIntersection(args);
    //     let overId = getFirstCollision(intersections, 'id');
  
    //     if (overId != null) {
    //       if (overId === TRASH_ID) {
    //         // If the intersecting droppable is the trash, return early
    //         // Remove this if you're not using trashable functionality in your app
    //         return intersections;
    //       }
  
    //       if (overId in items) {
    //         const containerItems = items[overId];
  
    //         // If a container is matched and it contains items (columns 'A', 'B', 'C')
    //         if (containerItems.length > 0) {
    //           // Return the closest droppable within that container
    //           overId = closestCenter({
    //             ...args,
    //             droppableContainers: args.droppableContainers.filter(
    //               (container) =>
    //                 container.id !== overId &&
    //                 containerItems.includes(container.id)
    //             ),
    //           })[0]?.id;
    //         }
    //       }
  
    //       lastOverId.current = overId;
  
    //       return [{id: overId}];
    //     }
  
    //     // When a draggable item moves to a new container, the layout may shift
    //     // and the `overId` may become `null`. We manually set the cached `lastOverId`
    //     // to the id of the draggable item that was moved to the new container, otherwise
    //     // the previous `overId` will be returned which can cause items to incorrectly shift positions
    //     if (recentlyMovedToNewContainer.current) {
    //       lastOverId.current = activeId;
    //     }
  
    //     // If no droppable is matched, return the last match
    //     return lastOverId.current ? [{id: lastOverId.current}] : [];
    //   },
    //   [activeId, items]
    // );
    // const [clonedItems, setClonedItems] = useState<Items | null>(null);
    const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter :sortableKeyboardCoordinates,
      })
    );
    const findContainer = (id: string) => {
      if (id in items) {
        return id;
      }
  
      return Object.keys(items).find((key) => items[key].includes(id));
    };
  
  
    // const onDragCancel = () => {
    //   if (clonedItems) {
    //     // Reset items to their original state in case items have been
    //     // Dragged across containers
    //     setItems(clonedItems);
    //   }
  
    //   setActiveId(null);
    //   setClonedItems(null);
    // };
  
    const getNextContainerId = () => {
        const containerIds = Object.keys(items);
        const lastContainerId = containerIds[containerIds.length - 1];
    
        return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
    }

    useEffect(() => {
      requestAnimationFrame(() => {
        recentlyMovedToNewContainer.current = false;
      });
    }, [items]);
  
    return (
      <DndContext
        sensors={sensors}
        // collisionDetection={collisionDetectionStrategy}
        // measuring={{
        //   droppable: {
        //     strategy: MeasuringStrategy.Always,
        //   },
        // }}
        onDragStart={({active}) => {
          setActiveId(active.id);
          // setClonedItems(items);
        }}
        onDragOver={({active, over}) => {
          const overId = over?.id;
  
          if (!overId || overId === TRASH_ID || active.id in items) {
            return;
          }
  
          const overContainer = findContainer(overId);
          const activeContainer = findContainer(active.id);
  
          if (!overContainer || !activeContainer) {
            return;
          }
  
          if (activeContainer !== overContainer) {
            setItems((items) => {
              const activeItems = items[activeContainer];
              const overItems = items[overContainer];
              const overIndex = overItems.indexOf(overId);
              const activeIndex = activeItems.indexOf(active.id);
  
              let newIndex: number;
  
              if (overId in items) {
                newIndex = overItems.length + 1;
              } else {
                const isBelowOverItem =
                  over &&
                  active.rect.current.translated &&
                  active.rect.current.translated.top >
                    over.rect.top + over.rect.height;
  
                const modifier = isBelowOverItem ? 1 : 0;
  
                newIndex =
                  overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
              }
  
              recentlyMovedToNewContainer.current = true;
  
              return {
                ...items,
                [activeContainer]: items[activeContainer].filter(
                  (item) => item !== active.id
                ),
                [overContainer]: [
                  ...items[overContainer].slice(0, newIndex),
                  items[activeContainer][activeIndex],
                  ...items[overContainer].slice(
                    newIndex,
                    items[overContainer].length
                  ),
                ],
              };
            });
          }
        }}
        onDragEnd={({active, over}) => {
          if (active.id in items && over?.id) {
            setContainers((containers) => {
              const activeIndex = containers.indexOf(active.id);
              const overIndex = containers.indexOf(over.id);
  
              return arrayMove(containers, activeIndex, overIndex);
            });
          }
  
          const activeContainer = findContainer(active.id);
  
          if (!activeContainer) {
            setActiveId(null);
            return;
          }
  
          const overId = over?.id;
  
          if (!overId) {
            setActiveId(null);
            return;
          }
  
          if (overId === TRASH_ID) {
            setItems((items) => ({
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (id) => id !== activeId
              ),
            }));
            setActiveId(null);
            return;
          }
  
          if (overId === PLACEHOLDER_ID) {
            const newContainerId = getNextContainerId();
  
            unstable_batchedUpdates(() => {
              setContainers((containers) => [...containers, newContainerId]);
              setItems((items) => ({
                ...items,
                [activeContainer]: items[activeContainer].filter(
                  (id) => id !== activeId
                ),
                [newContainerId]: [active.id],
              }));
              setActiveId(null);
            });
            return;
          }
          const overContainer = findContainer(overId);
          if (overContainer) {
            const activeIndex = items[activeContainer].indexOf(active.id);
            const overIndex = items[overContainer].indexOf(overId);
  
            if (activeIndex !== overIndex) {
              setItems((items) => ({
                ...items,
                [overContainer]: arrayMove(
                  items[overContainer],
                  activeIndex,
                  overIndex
                ),
              }));
            }
          }
  
          setActiveId(null);
        }}
        // onDragCancel={onDragCancel}
      >
        <div
          style={{
            display: 'inline-grid',
            boxSizing: 'border-box',
            padding: 20,
            gridAutoFlow: 'column',
          }}
        >
            {containers.map((containerId) => (
                <DroppableContainer
                    key={containerId}
                    id={containerId}
                    label={`Column ${containerId}`}
                    items={items[containerId]}
                    // onRemove={() => handleRemove(containerId)}
                    >
                    <SortableContext items={items[containerId]} strategy={verticalListSortingStrategy}>
                      {items[containerId].map((value, index) => {
                        return (
                            <SortableItem
                                disabled={isSortingContainer}
                                key={value}
                                id={value}
                                index={index}                 
                                containerId={containerId}
                            />
                        );
                      })}
                    </SortableContext>
                </DroppableContainer>
            ))}            
        </div>
      </DndContext>
    );  
  }

  export default MultipleContainers;