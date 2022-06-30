// even before starting to write the reducer function, let's think
// about HOW we want our store to look like...

const initialState = {
  // a typical thing for a redux store object is getting split into multiple "chunks" (sub-objects)
  cart: {
    // let's put our array into here!
    content: [],
  },
  // cart is a SLICE of the redux store
}

// we're going to use our initialState to write our reducer function!

// we're passing initialState as the default value of the state argument,
// since on the first run it might be undefined
const mainReducer = (state = initialState, action) => {
  // this function should at every usage compute the new version of the state
  switch (action.type) {
    // put all our cases here!
    case 'ADD_TO_CART':
      return {
        ...state, // you always want to start your new application state
        // from the one you're currently on, in this way you're making sure
        // you're not losing any bit of it during the way
        cart: {
          ...state.cart,
          //   content: state.cart.content.push() // <-- NOT VALID!! push is FORBIDDEN in a reducer function :(
          // in a reducer function you're not allowed to use any method that ALTERS your arguments
          // your arguments are the current state of the app, which is IMMUTABLE and shouldn't be mutated!
          //   content: [...state.cart.content, action.payload], // <-- VALID WAY
          content: state.cart.content.concat(action.payload), // ANOTHER VALID WAY
        },
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          //   content: state.cart.content.filter((book, i) => i !== action.payload), // <-- VALID WAY
          content: [
            ...state.cart.content.slice(0, action.payload), // <-- FIRST SLICE
            ...state.cart.content.slice(action.payload + 1), // <-- SECOND SLICE
          ],
        },
      }
    default:
      return state // in the case of falling into the default statement,
    // that means we encountered an 'unrecognized' action.type!
    // returning the state as it was from it, will not HARM our app!
    // we're just going to bring no modification to it...
  }
}
// the reducer is a function that will return the new state of the app every time,
// thanks to its two arguments: the current state of the app, and the action
// that just got dispatched (which describes the modification you want to bring in)

export default mainReducer
