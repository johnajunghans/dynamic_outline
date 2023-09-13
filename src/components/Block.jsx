import { drag } from "../dndFunctions";

const Block = ({ subBlock, preview, id }) => {

    return ( 
        <div className="block-container">
            <div className="block"
                id={id}
                draggable="true" 
                onDrag={drag}
            > {preview}

            </div>
            <div className="block-children">
                {subBlock.map( block => (
                    <Block
                        key={block.id}
                        id={block.id} 
                        subBlock={block.children}
                        preview={`${block.description.slice(0,50)}...`}
                    ></Block>
                ))}
            </div>
        </div>
     );
}
 
export default Block;