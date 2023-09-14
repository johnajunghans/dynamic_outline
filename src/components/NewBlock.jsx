import { ChevronRightIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const NewBlock = ({ id, description, childElements, index }) => {

    const [expanded, setExpanded] = useState(false);

    console.log(index)

    return ( 
        <Draggable draggableId={`block-${id.toString()}`} index={index}>
            {(providedDrag) => (
                <Flex w="80%" justify="center" {...providedDrag.draggableProps} ref={providedDrag.innerRef}>
                    <Droppable droppableId={`container-${id.toString()}`}>
                    {(providedDrop) => (
                        <Flex {...providedDrop.droppableProps} ref={providedDrop.innerRef} 
                            flexDir="column"
                            align="flex-start"
                            justify="flex-start"
                            p="1rem"
                            pos="relative"
                            h={expanded ? "auto" : "50px"}
                            // minW="500px"
                            // maxW="800px"
                            w="80%"
                            bgColor="#F8F8FF"
                            borderRadius="5px"
                            boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
                            
                            
                        ><Text>{expanded ? description : `${description.slice(0,50)}...`}</Text>
                            <Flex {...providedDrag.dragHandleProps}
                                pos="absolute"
                                left="-25px"
                            >
                                <DragHandleIcon />
                            </Flex>
                            {/* <IconButton onClick={() => {setExpanded(!expanded)}} icon={<ChevronRightIcon si />} 
                                pos="absolute"
                                right="25px"
                                appearance="auto"
                            /> */}
                            <ChevronRightIcon onClick={() => {setExpanded(!expanded)}}
                                boxSize="20px"
                                pos="absolute"
                                right="25px"
                                _hover={{bgColor: "rgba(0,0,0,0.10)"}}
                                borderRadius="3px"
                                cursor="pointer"
                                transform={expanded ? "rotate(90deg)" : "rotate(0deg)"}
                                transition="0.3s"
                            />
                            

                            {expanded && <Flex>
                                {childElements.map((element, index) =>(
                                    <NewBlock 
                                        id={element.id}
                                        description={element.description}
                                        childElements={element.children}
                                        index={index}
                                    />
                                ))}
                            </Flex>}
                            {providedDrop.placeholder}
                        </Flex>
                    )}
            </Droppable>
                </Flex>
                
            )}
        </Draggable>
     );
}
 
export default NewBlock;