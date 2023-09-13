import './App.css'
import Block from './components/Block'

function App() {

  function idGen() {
    return Math.round(Math.random()*100000000)
  }

  console.log(idGen())

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

  return (
    <main>
      <header>
        
      </header>
      <section>
        <div>
          {data.map( block => (
            <Block
              key={block.id}
              id={block.id} 
              preview={`${block.description.slice(0,50)}...`} 
              subBlock={block.children}
            ></Block>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
