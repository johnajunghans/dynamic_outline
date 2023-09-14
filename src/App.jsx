import { useState } from 'react'
import './App.css'
import Block from './components/Block'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import NewBlock from './components/NewBlock'

function App() {

  function idGen() {
    return Math.round(Math.random()*100000000)
  }

  const data = [
    {
      id: idGen(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis in, delectus quidem labore quas ut obcaecati eos recusandae magni impedit similique est nesciunt laborum voluptatem animi natus! Quam, dolorem quod?",
      children: [
        {
          id: idGen(),
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis in, delectus quidem labore quas ut obcaecati eos recusandae magni impedit similique est nesciunt laborum voluptatem animi natus! Quam, dolorem quod?",
          children: [
            {
              id: idGen(),
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis in, delectus quidem labore quas ut obcaecati eos recusandae magni impedit similique est nesciunt laborum voluptatem animi natus! Quam, dolorem quod?",
              children: []
            }
          ]
        }
      ]
    },
    {
      id: idGen(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis in, delectus quidem labore quas ut obcaecati eos recusandae magni impedit similique est nesciunt laborum voluptatem animi natus! Quam, dolorem quod?",
      children: []
    }
  ]

  const [outline, setOutline] = useState(data);

  const handleDropEnd = (results) => {
    const { source, destination } = results;
    // check for valid drop destination
    if (!destination) return;
    // check for different drop destination
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

  }

  return (
    <main>
      <header>
        
      </header>
      <section>
        <DragDropContext onDragEnd={(result) => {console.log(result)}}>
          <Droppable droppableId='ROOT'>
            {(provided) => (
              <div id='root-container'
                {...provided.droppableProps} 
                ref={provided.innerRef}>
              {outline.map( (block, index) => (
                <NewBlock 
                  key={block.id}
                  index={index}
                  id={block.id}
                  childElements={block.children}
                  description={block.description}
                />
              ))}
              {provided.placeholder}
            </div>
            )} 
          </Droppable>
        </DragDropContext>
      </section>
    </main>
  )
}

export default App
