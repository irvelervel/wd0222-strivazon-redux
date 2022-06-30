import Button from 'react-bootstrap/Button'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

// mapStateToProps is a FUNCTION returning an OBJECT
// mapStateToProps is going to decide which parts of the Redux Store you want to "read"
// and make accessible to CartIndicator
const mapStateToProps = (state) => {
  return {
    // every KEY you add to this object, is going to become an additional PROP for CartIndicator
    cartLength: state.cart.content.length,
  }
}

const CartIndicator = ({ cartLength }) => {
  const navigate = useNavigate()

  return (
    <div className="ml-auto mt-2">
      <Button color="primary" onClick={() => navigate('/cart')}>
        <FaShoppingCart />
        <span className="ml-2">{cartLength}</span>
      </Button>
    </div>
  )
}

export default connect(mapStateToProps)(CartIndicator)

// now we're going to connect CartIndicator to the Redux Store,
// for reading the length of the content array in every given moment
// for doing this, we'll need a function called 'connect'

// connect is going to be used for exporting the component
// ...but how can we tell connect what do we want to read from the Redux Store?

// mapStateToProps and mapDispatchToProps are the two arguments you can invoke 'connect' with!
// mapStateToProps decides which parts of the Redux Store you want to READ ("read" access)
// mapDispatchToProps decides how is this component going to INTERACT with the Redux Store ("write" access)
