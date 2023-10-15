import { AddIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, DeleteIcon, DragHandleIcon, EditIcon, QuestionIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const NewBlock = ({ id, description, childElements, index, bgColor, isChild=false, addChild, deleteBlock, updateDescription }) => {

    const [expanded, setExpanded] = useState(false);
    const [showDragHandle, setShowDragHandle] = useState(false);
    const [editText, setEditText] = useState();
    const [descriptionText, setDescriptionText] = useState(description);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const iconStyles = {
        _hover: {bgColor: "rgba(0,0,0,0.10)"},
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.2s",
        boxSize: "28px"
    }

    const AddBtn = () => {
        return (
            <AddIcon 
                as="button"
                onClick={() => {addChild(id, bgColor)}}
                boxSize="28px"
                p="6px"
                {...iconStyles}
            />
        )
    }

    return ( 
        <Draggable draggableId={`block-${id.toString()}`} index={index}>
            {(providedDrag, snapshotDrag) => (
                <Flex w="100%" justify={isChild ? "flex-start" : "center"} pl={isChild ? "1.25rem" : "0px"} {...providedDrag.draggableProps} ref={providedDrag.innerRef}>
                    <Droppable droppableId={`container-${id.toString()}`} isDropDisabled={snapshotDrag.isDragging ? true : false}>
                    {(providedDrop, snapshotDrop) => (
                        <Flex {...providedDrop.droppableProps} {...providedDrag.dragHandleProps} ref={providedDrop.innerRef} 
                            // style={{backgroundColor: snapshot.isDraggingOver ? "rgba(0,0,0,0.2)" : "unset"}}
                            flexDir="column"
                            align="flex-start"
                            justify="flex-start"
                            gap="0.5rem"
                            p="1rem"
                            pos="relative"
                            minH="50px"
                            w="100%"
                            bgColor={bgColor ? "#F8F8FF" : "#F5F5F5"}
                            border={isChild ? "1px solid black" : "unset"}
                            borderRadius="5px"
                            outline={snapshotDrop.isDraggingOver ? "2px dotted black" : "unset"}
                            boxShadow={isChild ? "unset" : "0px 4px 4px rgba(0,0,0,0.25)"}
                            onMouseOver={() => {setShowDragHandle(true)}}
                            onMouseOut={() => {setShowDragHandle(false)}}
                            
                        >{!editText ? 
                            <Text 
                                mb={isChild || !expanded ? "unset" : "10px"} 
                                w="88%"
                                overflow="hidden"
                            >{!expanded && descriptionText.length >= 300 ? `${descriptionText.slice(0,200)}...` : descriptionText}
                            </Text>
                            : <Textarea name="text-block" type="text" value={descriptionText} onChange={e => {setDescriptionText(e.target.value)}} 
                                w="90%"
                                fontFamily="Inter"
                                fontSize="16px"
                                border="1px solid black"
                                bgColor="transparent"
                                borderRadius="5px"
                                p="5px"
                                focusBorderColor="rgba(0,0,0,0.25)"
                            />}
                            <Flex 
                                pos="absolute"
                                opacity={showDragHandle ? "1" : "0"}
                                left={showDragHandle ? "-25px" : "-20px"}
                                transition="0.2s"
                                p="5px"
                            >
                                <DragHandleIcon />
                            </Flex>
                            {!showDragHandle && 
                                <Text 
                                    pos="absolute" 
                                    left="-20px"
                                >{!bgColor ? `${String.fromCharCode(index + 65)}.` : `${(index+1).toString()}.`}
                                </Text>}

                            <Flex
                                align="center"
                                pos="absolute"
                                top="10px"
                                right="10px"
                            >
                                {!confirmDelete ? 
                                    <DeleteIcon onClick={() => {setConfirmDelete(true)}}
                                        
                                        p="6px"
                                        {...iconStyles}
                                    />
                                : <QuestionIcon onClick={() => {deleteBlock(id)}}
                                    
                                    p="6px"
                                    {...iconStyles}
                                />}
                                {editText ? 
                                    <CheckIcon onClick={() => {setEditText(false); updateDescription(id, descriptionText)}}
                                        
                                        p="6px"
                                        {...iconStyles}
                                    />
                                : <EditIcon onClick={() => {setEditText(true)}}
                                    
                                    p="5px"                                   
                                    {...iconStyles}
                                />}
                                <ChevronLeftIcon onClick={() => {setExpanded(!expanded)}}
                                                                      
                                    transform={expanded ? "rotate(-90deg)" : "rotate(0deg)"}                                  
                                    {...iconStyles}
                                />
                            </Flex>
                            

                            {expanded && childElements.map((element, index) =>(
                                <NewBlock
                                    key={element.id} 
                                    id={element.id}
                                    bgColor={!bgColor}
                                    description={element.description}
                                    childElements={element.children}
                                    index={index}
                                    isChild={true}
                                    addChild={addChild}
                                    deleteBlock={deleteBlock}
                                    updateDescription={updateDescription}
                                />
                            ))}
                            {providedDrop.placeholder}
                            {expanded && <AddBtn />}  
                        </Flex>
                    )}
            </Droppable>
                </Flex>
                
            )}
        </Draggable>
     );
}
 
export default NewBlock;