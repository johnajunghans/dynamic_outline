export const findObjectById = (array, id) => { 
  let object;
  const arrayLoop = (array, id) => {
    if (array) {
      for (let i=0; i < array.length; i++) {
        if (object) return
        if (array[i].id === id) {
          object = array[i];
          return
        }
        arrayLoop(array[i].children, id)
      }
    }
  }
  arrayLoop(array, id)
  if(object) {
    return object
  }
  return null;
}

export const removeObjectById = (arr, id) => {
  const array = [...arr]
  console.log("array starts as", array)
  //create empty variable
  let newArray;
  //array loop recursive function
  const arrayLoop = (array, id) => {
    //check for valid array
    if (array) {
      for (let i=0; i < array.length; i++) {
        //check for newArray value
        if (newArray) return
        //check for matching id
        if (array[i].id === id) {
          newArray = array.filter(obj => obj.id !== id)
          console.log("newarray is", newArray)
          return
        }
        arrayLoop(array[i].children, id)
        //process X runs
        if (newArray) {
          array[i].children = newArray;
          newArray = array;
        }
      }
    }
  }
  arrayLoop(array, id)
  if (newArray) {
    console.log("final array is", newArray)
    return newArray
  }
  return null
}

export const updateObjectDescriptionById = (arr, id, newText) => {
  const array = [...arr];
  let newArray;
  console.log("function run", array)
  const arrayLoop = (array, id, newText) => {
    if (array) {
      for (let i=0; i < array.length; i++) {
        if (newArray) {
          return
        }
        if (array[i].id === id) {
          array[i].description = newText;
          newArray = true;
        }
        console.log(array[i].id, id)
        arrayLoop(array[i].children, id, newText);
      }
    }
  }
  arrayLoop(array, id, newText)
  if (newArray) {
    console.log(array)
    return array;
  }
  return null;
}

export const insertObjectById = (arr, id, object) => {
  const array = [...arr];
  let newArray;
  console.log("array starts as", array)
  const arrayLoop = (array, id, object) => {
    if (array) {
      for (let i=0; i < array.length; i++) {
        if (newArray){
          return;
        } 
        if (array[i].id === id) {
          console.log(array[i].id, id, "success")
          array[i].children.push(object);
          newArray = true;
          console.log(newArray)
          return
        }
        console.log(array[i].id, id, "failure")
        arrayLoop(array[i].children, id, object);
        console.log(array)
      }
    }
  }
  arrayLoop(array, id, object);
  console.log(array, newArray)
  if (newArray) {
    console.log("final array is", newArray)
    return array;
  }
  return null;
}

export const reorderObjectById = (arr, sourceId, sourceIndex, destinationId, destinationIndex) => {
  const array = [...arr];
  let sourceObj;
  let newArray = false;
  const findSourceObj = (array, id, index) => {
    console.log("finding ID")
    if (array) {
      if (sourceId === 'ROOT') {
        sourceObj = array.splice(index, 1)[0];
        console.log("source: root. source object is", sourceObj)
        return;
      }
      for (let i=0; i < array.length; i++) {
        if (sourceObj) {
          return
        }
        if (`block-${array[i].id}` === id) {
          console.log(array[i].id, id, "sourceObject Found!")
          sourceObj = array.splice(i, 1)[0];
          return
        }
        console.log(array[i].id, id, "sourceObject Mismatch")
        findSourceObj(array[i].children, id);
      } 
    }
  }
  const insertSourceObj = (array, id, index) => {
    if (array) {
      if (destinationId === 'ROOT') {
        console.log("destination: root. array is", array)
        array.splice(index, 0, sourceObj);
        newArray = true;
        return
      }
      for (let i=0; i < array.length; i++) {
        if (newArray) {
          return
        }
        if (`container-${array[i].id}` === id) {
          console.log(array[i].id, id, "container Found!")
          array[i].children.splice(index, 0, sourceObj)
          newArray = true;
          return
        }
        console.log(array[i].id, id, "container mismatch")
        insertSourceObj(array[i].children, id, index);
      }
    }
  }
  findSourceObj(array, sourceId, sourceIndex);
  if (sourceObj) {
    insertSourceObj(array, destinationId, destinationIndex);
  }
  if (newArray) {
    return array
  }
  return null
}