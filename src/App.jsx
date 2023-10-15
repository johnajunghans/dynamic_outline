import { useEffect, useState } from 'react'
import './App.css'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import NewBlock from './components/NewBlock'
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons'
import { insertObjectById, removeObjectById, reorderObjectById, updateObjectDescriptionById } from './recursiveFunctions'
import Logo from './assets/Logo.png'
import { Flex, Image, useDisclosure } from '@chakra-ui/react';
import User from './assets/user.svg';
import SideDrawer from './components/SideDrawer'

function App() {

  function idGen() {
    return Math.round(Math.random()*100000000)
  }

  // const data = JSON.parse(window.localStorage.getItem("outline"));

  const [outline, setOutline] = useState();

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("outline"));
    setOutline(data)
  }, [])

  const handleDropEnd = (results) => {
    const { source, destination, draggableId } = results;
    // check for valid drop destination
    if (!destination) return;
    
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const sourceId = draggableId;
    const destinationId = destination.droppableId;
    // check for different drop destination
    if (sourceId === destinationId && sourceIndex === destinationIndex) return;

    console.log(results);

    const outlineCopy = [...outline];
    const updatedOutline = reorderObjectById(outlineCopy, sourceId, sourceIndex, destinationId, destinationIndex);
    console.log(updatedOutline);
    if (updatedOutline) {
      window.localStorage.setItem("outline", JSON.stringify(updatedOutline));
      setOutline(updatedOutline);
    }
  }

  const handleAddBlockAtRootLevel = () => {
    const newOutline = [...outline];
    const newBlock = {
      id: idGen(),
      description: "",
      children: []
    }
    newOutline.push(newBlock);
    window.localStorage.setItem("outline", JSON.stringify(newOutline));
    setOutline(newOutline);
  }

  const handleAddChildBlock = (id) => {
    const newOutline = [...outline];
    const newBlock = {
      id: idGen(),
      description: "",
      children: []
    }
    const array = insertObjectById(newOutline, id, newBlock);
    if (array) {
      window.localStorage.setItem("outline", JSON.stringify(array));
      setOutline(array);
    }
  }

  const handleDeleteBlock = (id) => {
    const outlineCopy = [...outline];
    const newOutline = removeObjectById(outlineCopy, id);
    if (newOutline) {
      window.localStorage.setItem("outline", JSON.stringify(newOutline));
      setOutline(newOutline);
    }
  }

  const handleUpdateDescription = (id, newText) => {
    const outlineCopy = [...outline];
    const newOutline = updateObjectDescriptionById(outlineCopy, id, newText);
    if (newOutline) {
      window.localStorage.setItem("outline", JSON.stringify(newOutline));
      setOutline(newOutline);
    }
  }

  // const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();

  return (
    <main>
      <header>
        <SideDrawer></SideDrawer>
        <Image src={Logo}  />
        <Image src={User}
          boxSize="50px"
          p="11px"
          mr="1rem" 
          boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
          borderRadius="50%"
          bgColor="#F8F8FF"
          _hover={{bgColor: "rgba(0,0,0,0.10)"}}
          transition="0.2s"
          cursor="pointer"
        />
      </header>
      <section>
        <DragDropContext onDragEnd={handleDropEnd}>
          <Droppable droppableId='ROOT'>
            {(provided, snapshot) => (
              <div id='root-container'
                style={{backgroundColor: snapshot.isDraggingOver ? "rgba(0,0,0,0.2)" : "unset"}}
                {...provided.droppableProps} 
                ref={provided.innerRef}>
              {outline && outline.map((block, index) => (
                <NewBlock 
                  key={block.id}
                  index={index}
                  id={block.id}
                  bgColor={true}
                  childElements={block.children}
                  description={block.description}
                  addChild = {handleAddChildBlock}
                  deleteBlock = {handleDeleteBlock}
                  updateDescription={handleUpdateDescription}
                />
              ))}
              {provided.placeholder}
              <AddIcon as='button' onClick={handleAddBlockAtRootLevel}
                boxSize="40px"
                p="12px"
                bgColor="#F8F8FF"
                boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
                _hover={{bgColor: "rgba(0,0,0,0.10)"}}
                borderRadius="50%"
                cursor="pointer"
                transition="0.2s"
              />
              
            </div>
            )} 
          </Droppable>
        </DragDropContext>
      </section>
      

    </main>
  )
}

export default App
