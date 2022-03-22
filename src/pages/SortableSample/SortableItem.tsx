import {useSortable} from '@dnd-kit/sortable';
import { VFC } from 'react';
import {CSS} from '@dnd-kit/utilities';

type Props = {
    id:string

}


const SortableItem:VFC<Props> = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: props.id});
      
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
    
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* ... */}
    </div>
    )
}

export default SortableItem